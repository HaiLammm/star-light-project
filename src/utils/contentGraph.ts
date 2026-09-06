interface Entry<Data> {
  readonly id: string;
  readonly filePath?: string;
  readonly data: Data;
}

interface TermReferences {
  readonly relatedTerms: readonly string[];
}

interface ArticleReferences extends TermReferences {
  readonly relatedRace?: string;
}

export interface ContentGraph {
  readonly guides: readonly Entry<ArticleReferences>[];
  readonly glossary: readonly Entry<TermReferences>[];
  readonly bridge: readonly Entry<ArticleReferences & { readonly keyRaces: readonly string[] }>[];
  readonly races: readonly Entry<{ readonly raceId: string }>[];
  readonly raceArticles: readonly Entry<ArticleReferences & { readonly race: string }>[];
}

export function assertContentGraph(graph: ContentGraph): void {
  const termIds = new Set(graph.glossary.map((entry) => entry.id));
  const raceIds = new Set(graph.races.map((entry) => entry.id));
  const violations: string[] = [];
  const check = (file: string, field: string, value: string, target: 'glossary' | 'races'): void => {
    const ids = target === 'glossary' ? termIds : raceIds;
    if (!ids.has(value)) violations.push(`${file}: ${field} "${value}" not found in collection "${target}"`);
  };

  for (const collection of ['guides', 'glossary', 'bridge', 'raceArticles'] as const) {
    const directory = collection === 'raceArticles' ? 'race-articles' : collection;
    for (const entry of graph[collection]) {
      const file = entry.filePath ?? `${directory}/${entry.id}.md`;
      for (const term of entry.data.relatedTerms) check(file, 'relatedTerms', term, 'glossary');
      if ('relatedRace' in entry.data && entry.data.relatedRace !== undefined) {
        check(file, 'relatedRace', entry.data.relatedRace, 'races');
      }
      if ('keyRaces' in entry.data) {
        for (const race of entry.data.keyRaces) check(file, 'keyRaces', race, 'races');
      }
      if ('race' in entry.data) check(file, 'race', entry.data.race, 'races');
    }
  }

  for (const entry of graph.races) {
    if (entry.data.raceId !== entry.id) {
      const file = entry.filePath ?? `races/${entry.id}.json`;
      violations.push(`${file}: raceId "${entry.data.raceId}" must match entry id "${entry.id}"`);
    }
  }

  if (violations.length > 0) throw new Error(violations.join('\n'));
}
