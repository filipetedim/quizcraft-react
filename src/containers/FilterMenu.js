import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Cancel from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';

// Components
import FilterList from '../components/FilterList';

// Stores
import FilterStore from '../stores/filterStore';

// Utils
import DataTypes from '../utils/dataTypes';

const styles = () => ({
  root: {
    width: '100%',
  },
  search: {
    padding: '20px 5px',
  },
  chip: {
    height: 22,
    marginRight: 3,
    marginBottom: 3,
  },
  cancelIcon: {
    height: 22,
  },
  filters: {
    padding: 10,
  },
});

class FilterMenu extends Component {
  state = {};

  /**
   * Handles the checkbox toggle
   */
  handleToggle = (type, value) => () => (FilterStore[type][value] = !FilterStore[type][value]);

  /**
   * Handles the collapse of lists
   */
  handleCollapse = value => () => this.setState({ [value + 'Open']: !this.state[value + 'Open'] });

  /**
   * Handles the search
   */
  handleSearch = event => (FilterStore.search = event.target.value);

  /**
   * Handles the filter reset
   */
  handleResetFilters = () => {
    FilterStore.resetFilters();
    ['expansions', 'difficulties', 'types', 'categories'].forEach(type =>
      this.setState({ [type + 'Open']: false })
    );
  };

  render() {
    const { classes } = this.props;
    const { expansions, difficulties, types, categories } = FilterStore;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="primary"
              onClick={() => (FilterStore.showAddQuestion = true)}
            >
              Add Question
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth size="small" onClick={this.handleResetFilters}>
              Reset filters
            </Button>
          </Grid>
        </Grid>
        <div className={classes.search}>
          <TextField
            id="standard-search"
            label="Search"
            value={FilterStore.search}
            onChange={this.handleSearch}
            fullWidth
          />
        </div>
        <div className={classes.filters}>
          <Typography>Active filters</Typography>
          {['expansions', 'difficulties', 'types', 'categories'].map(type =>
            DataTypes[type]
              .filter(item => FilterStore[type][item.id])
              .map(item => (
                <Chip
                  key={type + item.id}
                  className={classes.chip}
                  label={item.value}
                  deleteIcon={<Cancel fontSize="small" />}
                  onDelete={this.handleToggle(type, item.id)}
                />
              ))
          )}
        </div>
        <div>
          <FilterList
            type="expansions"
            data={DataTypes.expansions}
            handleCollapse={this.handleCollapse}
            handleToggle={this.handleToggle}
            open={this.state.expansionsOpen}
            state={expansions}
          />
          <FilterList
            type="difficulties"
            data={DataTypes.difficulties}
            handleCollapse={this.handleCollapse}
            handleToggle={this.handleToggle}
            open={this.state.difficultiesOpen}
            state={difficulties}
          />
          <FilterList
            type="types"
            data={DataTypes.types}
            handleCollapse={this.handleCollapse}
            handleToggle={this.handleToggle}
            open={this.state.typesOpen}
            state={types}
          />
          <FilterList
            type="categories"
            data={DataTypes.categories}
            handleCollapse={this.handleCollapse}
            handleToggle={this.handleToggle}
            open={this.state.categoriesOpen}
            state={categories}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(observer(FilterMenu));
