import test from 'node:test';
import assert from 'node:assert/strict';
import { getRaceWeek, RACE_CALENDAR } from '../src/config/raceCalendar.ts';

test('current week selects a race in JST Monday-Sunday', () => assert.equal(getRaceWeek(new Date('2026-03-25T23:30:00Z'))?.timing, 'current'));
test('off week selects the next upcoming race', () => assert.equal(getRaceWeek(new Date('2026-04-07T00:00:00Z'))?.timing, 'upcoming'));
test('exhausted calendar returns undefined', () => assert.equal(getRaceWeek(new Date('2027-01-01T00:00:00Z')), undefined));
test('invalid dates throw an actionable TypeError', () => assert.throws(() => getRaceWeek(new Date('invalid')), { name: 'TypeError' }));
test('calendar is chronological and frozen', () => {
  assert.ok(Object.isFrozen(RACE_CALENDAR));
  assert.deepEqual([...RACE_CALENDAR].map((race) => race.date), [...RACE_CALENDAR].map((race) => race.date).sort());
});
