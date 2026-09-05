export type RaceGrade = 'G1' | 'G2' | 'G3';
export interface GradedRace { readonly id: string; readonly name: string; readonly grade: RaceGrade; readonly date: string; readonly course: string; }

const entries: GradedRace[] = [
  { id: 'takamatsunomiya-kinen', name: '高松宮記念', grade: 'G1', date: '2026-03-29', course: '中京 芝1200m' },
  { id: 'osaka-hai', name: '大阪杯', grade: 'G1', date: '2026-04-05', course: '阪神 芝2000m' },
  { id: 'satsuki-sho', name: '皐月賞', grade: 'G1', date: '2026-04-19', course: '中山 芝2000m' },
  { id: 'tenno-sho-spring', name: '天皇賞（春）', grade: 'G1', date: '2026-05-03', course: '京都 芝3200m' },
  { id: 'nhk-mile-cup', name: 'NHKマイルカップ', grade: 'G1', date: '2026-05-10', course: '東京 芝1600m' },
  { id: 'victoria-mile', name: 'ヴィクトリアマイル', grade: 'G1', date: '2026-05-17', course: '東京 芝1600m' },
  { id: 'japan-derby', name: '日本ダービー', grade: 'G1', date: '2026-05-31', course: '東京 芝2400m' },
  { id: 'yasuda-kinen', name: '安田記念', grade: 'G1', date: '2026-06-07', course: '東京 芝1600m' },
  { id: 'takarazuka-kinen', name: '宝塚記念', grade: 'G1', date: '2026-06-14', course: '阪神 芝2200m' },
  { id: 'sprinters-stakes', name: 'スプリンターズステークス', grade: 'G1', date: '2026-10-04', course: '中山 芝1200m' },
  { id: 'kikuka-sho', name: '菊花賞', grade: 'G1', date: '2026-10-25', course: '京都 芝3000m' },
  { id: 'japan-cup', name: 'ジャパンカップ', grade: 'G1', date: '2026-11-29', course: '東京 芝2400m' },
  { id: 'arima-kinen', name: '有馬記念', grade: 'G1', date: '2026-12-27', course: '中山 芝2500m' },
];
const datePattern = /^2026-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/;
const isValidDate = (value: string): boolean => datePattern.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00+09:00`));
if (new Set(entries.map((race) => race.id)).size !== entries.length || entries.some((race) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(race.id) || !isValidDate(race.date))) throw new Error('Invalid race calendar entry');
export const RACE_CALENDAR: readonly GradedRace[] = Object.freeze(entries.map((race) => Object.freeze(race)));

const jstDate = (date: Date): string => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
export type RaceTiming = 'current' | 'upcoming';
export interface RaceWeek extends GradedRace { readonly timing: RaceTiming; }
export const getRaceWeek = (buildDate: Date = new Date()): RaceWeek | undefined => {
  if (!(buildDate instanceof Date) || Number.isNaN(buildDate.getTime())) throw new TypeError('buildDate must be a valid Date');
  const day = jstDate(buildDate);
  const dayIndex = new Date(`${day}T00:00:00Z`).getUTCDay();
  const monday = new Date(`${day}T00:00:00Z`); monday.setUTCDate(monday.getUTCDate() - (dayIndex === 0 ? 6 : dayIndex - 1));
  const sunday = new Date(monday); sunday.setUTCDate(sunday.getUTCDate() + 6);
  const mondayIso = monday.toISOString().slice(0, 10); const sundayIso = sunday.toISOString().slice(0, 10);
  const current = RACE_CALENDAR.find((race) => race.date >= mondayIso && race.date <= sundayIso);
  if (current) return { ...current, timing: 'current' };
  const next = RACE_CALENDAR.find((race) => race.date > day);
  return next ? { ...next, timing: 'upcoming' } : undefined;
};
