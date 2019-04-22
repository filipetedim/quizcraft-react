import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Containers
import FilterMenu from '../containers/FilterMenu';
import QuestionTable from '../containers/QuestionTable';
import AddQuestion from '../containers/AddQuestion';

// Components
import Header from '../components/Header';

// Stores
import FilterStore from '../stores/filterStore';

const styles = {
  root: {
    padding: 30,
  },
  innerPadding: {
    paddingRight: 15,
  },
};

class Questions extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Grid className={classes.root} container>
          <Grid item xs={12} md={4} lg={2} className={classes.innerPadding}>
            <FilterMenu />
          </Grid>
          <Grid item xs={12} md={8} lg={10}>
            {FilterStore.showAddQuestion && <AddQuestion />}
            <QuestionTable />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(observer(Questions));
