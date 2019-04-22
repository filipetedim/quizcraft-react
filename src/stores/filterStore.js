import { extendObservable } from 'mobx';

// Utils
import DataTypes from '../utils/dataTypes';

class FilterStore {
  constructor() {
    extendObservable(this, {
      showAddQuestion: false,
      search: '',
      expansions: DataTypes.parseToFilterObject(DataTypes.expansions),
      difficulties: DataTypes.parseToFilterObject(DataTypes.difficulties),
      types: DataTypes.parseToFilterObject(DataTypes.types),
      categories: DataTypes.parseToFilterObject(DataTypes.categories),
    });
  }

  /**
   * Resets all the filters
   */
  resetFilters = () => {
    this.search = '';
    this.expansions = DataTypes.parseToFilterObject(DataTypes.expansions);
    this.difficulties = DataTypes.parseToFilterObject(DataTypes.difficulties);
    this.types = DataTypes.parseToFilterObject(DataTypes.types);
    this.categories = DataTypes.parseToFilterObject(DataTypes.categories);
  };

  activeFilter = type => DataTypes[type].filter(item => this[type][item.id]).map(item => item.id);
}

export default new FilterStore();
