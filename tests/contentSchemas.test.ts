import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { articleBase, guideSchema, glossarySchema, bridgeSchema, raceSchema, raceArticleSchema } from '../src/utils/contentSchemas.ts';
import { assertContentGraph } from '../src/utils/contentGraph.ts';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { RACE_CALENDAR } from '../src/config/raceCalendar.ts';
import { COMPLIANCE } from '../src/config/compliance.ts';
import { formatDate, formatDateDot } from '../src/utils/formatters.ts';

const article = {
  title: '出馬表の読み方',
  description: 'あ'.repeat(50),
  publishedDate: '2026-09-06',
  image: '/images/articles/guides/shutsubahyo-guide/hero.webp',
  imageAlt: '出馬表の項目を確認するための見出し',
};
const term = { term: '複勝', reading: 'ふくしょう', category: 'baken', shortGloss: '選んだ馬の入着を対象とする馬券。' };
const race = { raceId: 'japan-cup', name: 'ジャパンカップ', grade: 'G1', course: '東京', distance: '芝2400m', month: 11, description: '東京競馬場で行われる国際競走。' };
const horse = { ...article, horseName: 'スペシャルウィーク', era: '1990年代後半' };
const preview = { ...article, race: 'japan-cup', edition: 2026, articleType: 'preview' };

const validGraph = () => ({
  guides: [{ id: 'shutsubahyo-guide', data: guideSchema.parse({ ...article, relatedTerms: ['fukusho'], relatedRace: 'japan-cup' }) }],
  glossary: [{ id: 'fukusho', data: glossarySchema.parse(term) }],
  bridge: [{ id: 'special-week', data: bridgeSchema.parse({ ...horse, keyRaces: ['japan-cup'] }) }],
  races: [{ id: 'japan-cup', data: raceSchema.parse(race) }],
  raceArticles: [{ id: 'japan-cup/2026-preview', data: raceArticleSchema.parse(preview) }],
});

test('repository seeds parse with the Astro frontmatter parser and form a valid graph', () => {
  const markdown = (path: string) => {
    const source = readFileSync(new URL(`../src/content/${path}.md`, import.meta.url), 'utf8');
    for (const word of COMPLIANCE.bannedWording) assert.ok(!source.includes(word), `${path}: banned wording ${word}`);
    const parsed = parseFrontmatter(source);
    assert.match(parsed.content, /[\u3040-\u30ff\u4e00-\u9fff]/u);
    assert.doesNotMatch(parsed.content, /^\s*\|/m);
    for (const match of parsed.content.matchAll(/\]\(([^)]+)\)/g)) assert.match(match[1], /^\/(?:[a-z0-9-]+\/)+$/);
    return parsed.frontmatter;
  };
  const graph = {
    guides: [{ id: 'shutsubahyo-guide', data: guideSchema.parse(markdown('guides/shutsubahyo-guide')) }],
    glossary: [{ id: 'fukusho', data: glossarySchema.parse(markdown('glossary/fukusho')) }],
    bridge: [{ id: 'special-week', data: bridgeSchema.parse(markdown('bridge/special-week')) }],
    races: [{ id: 'japan-cup', data: raceSchema.parse(JSON.parse(readFileSync(new URL('../src/content/races/japan-cup.json', import.meta.url), 'utf8'))) }],
    raceArticles: [{ id: 'japan-cup/2026-preview', data: raceArticleSchema.parse(markdown('race-articles/japan-cup/2026-preview')) }],
  };
  assert.doesNotThrow(() => assertContentGraph(graph));
  assert.deepEqual(graph.guides[0].data.relatedTerms, ['fukusho']);
  assert.equal(graph.guides[0].data.relatedRace, 'japan-cup');
  assert.deepEqual(graph.bridge[0].data.keyRaces, ['japan-cup']);
  assert.equal(graph.glossary[0].data.term, '複勝');
  assert.equal(graph.glossary[0].data.category, 'baken');
  assert.equal(graph.raceArticles[0].data.race, 'japan-cup');
  assert.equal(graph.raceArticles[0].data.articleType, 'preview');
  assert.ok(RACE_CALENDAR.some((entry) => entry.id === graph.races[0].data.raceId));
  for (const [directory, entries] of [['guides', graph.guides], ['bridge', graph.bridge], ['race-articles', graph.raceArticles]] as const) {
    for (const entry of entries) {
      assert.equal(entry.data.image, `/images/articles/${directory}/${entry.id}/hero.webp`);
      assert.match(entry.data.imageAlt, /[\u3040-\u30ff\u4e00-\u9fff]/u);
    }
  }
});

test('content graph accepts valid references and empty collections without changing input', () => {
  const graph = validGraph();
  const before = structuredClone(graph);
  assert.doesNotThrow(() => assertContentGraph(graph));
  assert.deepEqual(graph, before);
  assert.doesNotThrow(() => assertContentGraph({ guides: [], glossary: [], bridge: [], races: [], raceArticles: [] }));
});

test('content graph reports every broken reference with entry and field', () => {
  const graph = validGraph();
  graph.guides[0].data.relatedRace = 'missing-race';
  graph.guides[0].data.relatedTerms = ['missing-term'];
  graph.glossary[0].data.relatedTerms = ['missing-term'];
  graph.bridge[0].data.relatedTerms = ['missing-term'];
  graph.bridge[0].data.relatedRace = 'missing-race';
  graph.bridge[0].data.keyRaces = ['missing-key-race'];
  graph.raceArticles[0].data.race = 'missing-article-race';
  graph.raceArticles[0].data.relatedTerms = ['missing-term'];
  graph.raceArticles[0].data.relatedRace = 'missing-race';
  assert.throws(() => assertContentGraph(graph), (error: unknown) => {
    assert.ok(error instanceof Error);
    const lines = error.message.split('\n');
    const expected = [
      'guides/shutsubahyo-guide.md: relatedRace "missing-race" not found in collection "races"',
      'guides/shutsubahyo-guide.md: relatedTerms "missing-term" not found in collection "glossary"',
      'glossary/fukusho.md: relatedTerms "missing-term" not found in collection "glossary"',
      'bridge/special-week.md: relatedTerms "missing-term" not found in collection "glossary"',
      'bridge/special-week.md: relatedRace "missing-race" not found in collection "races"',
      'bridge/special-week.md: keyRaces "missing-key-race" not found in collection "races"',
      'race-articles/japan-cup/2026-preview.md: race "missing-article-race" not found in collection "races"',
      'race-articles/japan-cup/2026-preview.md: relatedTerms "missing-term" not found in collection "glossary"',
      'race-articles/japan-cup/2026-preview.md: relatedRace "missing-race" not found in collection "races"',
    ];
    assert.deepEqual(lines.sort(), expected.sort());
    return true;
  });
});

test('content graph checks each required reference independently, including empty strings', () => {
  for (const value of ['unknown', '']) {
    for (const [collection, field, target] of [
      ['guides', 'relatedRace', 'races'], ['guides', 'relatedTerms', 'glossary'],
      ['raceArticles', 'race', 'races'], ['bridge', 'keyRaces', 'races'],
    ] as const) {
      const graph = validGraph();
      const entry = graph[collection][0];
      Object.assign(entry.data, { [field]: field === 'relatedTerms' || field === 'keyRaces' ? [value] : value });
      assert.throws(() => assertContentGraph(graph), new RegExp(`${entry.id}.*: ${field} "${value}" not found in collection "${target}"`));
    }
  }
});

test('raceId must match the loaded filename slug', () => {
  const graph = validGraph();
  graph.races[0].data.raceId = 'other-race';
  assert.throws(() => assertContentGraph(graph), /races\/japan-cup.json: raceId "other-race" must match entry id "japan-cup"/);
});

test('date formatters pin publication dates to JST', () => {
  const instant = new Date('2026-11-28T15:30:00.000Z');
  assert.equal(formatDate(instant), '2026年11月29日');
  assert.equal(formatDateDot(instant), '2026.11.29');
  assert.throws(() => formatDate('invalid'), { name: 'TypeError' });
  assert.throws(() => formatDateDot('invalid'), { name: 'TypeError' });
});

test('all five schemas parse valid content and supply defaults', () => {
  assert.ok(articleBase.parse(article).publishedDate instanceof Date);
  const guide = guideSchema.parse(article);
  assert.deepEqual(guide.relatedTerms, []);
  assert.deepEqual(guide.faqEntries, []);
  assert.equal(guide.draft, false);
  assert.deepEqual(glossarySchema.parse(term).relatedTerms, []);
  assert.deepEqual(bridgeSchema.parse(horse).keyRaces, []);
  assert.equal(raceSchema.parse(race).distance, '芝2400m');
  assert.equal(raceArticleSchema.parse(preview).edition, 2026);
});

test('collection map wires exactly the five architecture loaders', () => {
  const config = readFileSync(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  for (const [name, directory, extension, schema] of [
    ['guides', 'guides', 'md', 'guideSchema'],
    ['glossary', 'glossary', 'md', 'glossarySchema'],
    ['bridge', 'bridge', 'md', 'bridgeSchema'],
    ['races', 'races', 'json', 'raceSchema'],
    ['raceArticles', 'race-articles', 'md', 'raceArticleSchema'],
  ]) {
    assert.ok(config.includes(`const ${name} = defineCollection({`));
    assert.ok(config.includes(`glob({ pattern: '**/*.${extension}', base: './src/content/${directory}' })`));
    assert.ok(config.includes(`schema: ${schema}`));
  }
  assert.match(config, /export const collections = \{ guides, glossary, bridge, races, raceArticles \};/);
});

test('article metadata constraints reject missing and out-of-bounds fields on every article type', () => {
  for (const [schema, valid] of [[guideSchema, article], [bridgeSchema, horse], [raceArticleSchema, preview]] as const) {
    for (const [field, value] of [
      ['imageAlt', undefined], ['description', 'あ'.repeat(161)], ['description', 'あ'.repeat(49)],
      ['title', 'あ'.repeat(41)], ['publishedDate', 'invalid'], ['draft', 'false'], ['image', undefined],
    ] as const) {
      assert.throws(() => schema.parse({ ...valid, [field]: value }), new RegExp(field));
    }
    assert.ok(schema.safeParse({ ...valid, title: 'あ'.repeat(40), description: 'あ'.repeat(160) }).success);
  }
});

test('collection-specific contracts reject invalid values and preserve optional fields', () => {
  assert.throws(() => glossarySchema.parse({ ...term, shortGloss: 'あ'.repeat(61) }), /shortGloss/);
  assert.throws(() => glossarySchema.parse({ ...term, category: 'unknown' }), /category/);
  for (const month of [0, 13, 1.5]) assert.throws(() => raceSchema.parse({ ...race, month }), /month/);
  assert.throws(() => raceSchema.parse({ ...race, distance: 2400 }), /distance/);
  assert.throws(() => raceSchema.parse({ ...race, grade: 'G4' }), /grade/);
  for (const seriesOrder of [0, -1, 1.5]) assert.throws(() => guideSchema.parse({ ...article, seriesOrder }), /seriesOrder/);
  assert.throws(() => guideSchema.parse({ ...article, faqEntries: [{ question: '質問' }] }), /answer/);
  assert.throws(() => raceArticleSchema.parse({ ...preview, edition: 2026.5 }), /edition/);
  assert.throws(() => raceArticleSchema.parse({ ...preview, articleType: 'unknown' }), /articleType/);
  assert.throws(() => guideSchema.parse({ ...article, seriesTotal: 5 }), /Unrecognized key/);
  assert.equal(guideSchema.parse({ ...article, series: '入門', seriesOrder: 1, updatedDate: '2026-09-07' }).seriesOrder, 1);
  assert.equal(bridgeSchema.parse({ ...horse, horseNameEn: 'Special Week', umaCharacter: 'スペシャルウィーク' }).horseNameEn, 'Special Week');
  assert.equal(raceSchema.parse({ ...race, heroImage: '/images/articles/races/japan-cup/hero.webp', heroImageAlt: '東京競馬場の芝コース' }).heroImageAlt, '東京競馬場の芝コース');
});

test('retired content and collection declarations are absent', () => {
  assert.equal(existsSync(new URL('../src/content/blog', import.meta.url)), false);
  assert.equal(existsSync(new URL('../public/images/SEO', import.meta.url)), false);
  const config = readFileSync(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(config, /\b(services|cases|testimonials|faq|blog|company)\b/);
});
