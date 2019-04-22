import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Containers
import FilterMenu from '../containers/FilterMenu';
import EditQuestion from '../containers/EditQuestion';

// Components
import Header from '../components/Header';

const styles = {
  root: {
    padding: 30,
  },
  innerPadding: {
    paddingRight: 15,
  },
};

class Question extends Component {
  state = { id: null };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
  }

  render() {
    const { classes } = this.props;
    const { id } = this.state;

    return (
      <>
        <Header />
        <Grid className={classes.root} container>
          <Grid item xs={12} md={4} lg={2} className={classes.innerPadding}>
            <FilterMenu />
          </Grid>
          <Grid item xs={12} md={8} lg={10}>
            <EditQuestion id={id} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(observer(Question));
