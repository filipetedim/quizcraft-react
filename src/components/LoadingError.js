import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Warning from '@material-ui/icons/Warning';

const styles = theme => ({
  root: {
    marginTop: 15,
    backgroundColor: '#ef5350',
  },
  icon: {
    marginRight: 15,
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function LoadingError(props) {
  const { classes, message } = props;

  return (
    <SnackbarContent
      className={classes.root}
      message={
        <span className={classes.message}>
          <Warning className={classes.icon} />
          {message || `Error: couldn't load data. Please refresh or try again later.`}
        </span>
      }
    />
  );
}

export default withStyles(styles)(LoadingError);
