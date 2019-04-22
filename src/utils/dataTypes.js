/**
 * Question expansions
 */
const expansions = [
  { id: 0, value: 'Classic' },
  { id: 1, value: 'TBC' },
  { id: 2, value: 'WotLK' },
  { id: 3, value: 'Cataclysm' },
  { id: 4, value: 'MoP' },
  { id: 5, value: 'WoD' },
  { id: 6, value: 'Legion' },
  { id: 7, value: 'BfA' },
];

/**
 * Question difficulties
 */
const difficulties = [
  { id: 0, value: 'Easy' },
  { id: 1, value: 'Normal' },
  { id: 2, value: 'Hard' },
];

/**
 * Question Types
 */
const types = [{ id: 0, value: 'Ingame' }, { id: 1, value: 'Lore' }, { id: 2, value: 'Company' }];

/**
 * Question categories
 */
const categories = [
  { id: 0, value: 'Characters' },
  { id: 1, value: 'Weapons' },
  { id: 2, value: 'Zones' },
  { id: 3, value: 'Races' },
  { id: 4, value: 'Dungeons' },
  { id: 5, value: 'Raids' },
  { id: 6, value: 'Spells' },
  { id: 7, value: 'Professions' },
  { id: 8, value: 'Classes' },
  { id: 9, value: 'Pets' },
  { id: 10, value: 'Mounts' },
  { id: 11, value: 'Talents' },
  { id: 12, value: 'WeaponSkills' },
  { id: 13, value: 'SecondarySkills' },
  { id: 14, value: 'Features' },
  { id: 15, value: 'Reputations' },
  { id: 16, value: 'Quests' },
  { id: 17, value: 'Chests' },
  { id: 18, value: 'Keys' },
  { id: 19, value: 'Secrets' },
  { id: 20, value: 'Items' },
  { id: 21, value: 'Achievements' },
  { id: 22, value: 'Ui' },
  { id: 23, value: 'Heroes' },
  { id: 24, value: 'General' },
  { id: 25, value: 'OldGods' },
  { id: 26, value: 'Cities' },
  { id: 27, value: 'Battles' },
  { id: 28, value: 'Employees' },
  { id: 29, value: 'Releases' },
  { id: 30, value: 'Development' },
  { id: 31, value: 'Technical' },
];

/**
 * Parses a datatype array to an object
 */
const parseToFilterObject = array => {
  return array.reduce((object, item) => {
    object[item.id] = false;
    return object;
  }, {});
};

/**
 * Parses a datatype array to an object
 */
const parseToObject = array => {
  return array.reduce((object, item) => {
    object[item.id] = item.value;
    return object;
  }, {});
};

export default {
  expansions,
  difficulties,
  types,
  categories,
  parseToFilterObject,
  parseToObject,
};
