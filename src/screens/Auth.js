import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Send from '@material-ui/icons/Send';

// Services
import QuestionService from '../services/questionService';

// Utils
import History from '../utils/history';
import Config from '../utils/config';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    marginTop: 50,
    marginRight: 25,
    width: 300,
  },
  button: {
    position: 'relative',
    marginTop: 52,
  },
  buttonProgress: {
    position: 'absolute',
    left: 0,
  },
};

class Auth extends Component {
  state = { token: '', error: false, loading: false };

  componentDidMount() {
    if (Cookie.get('qc-token')) {
      History.push('/');
    }
  }

  handleClick = () => {
    const { token } = this.state;
    this.setState({ loading: true });
    Cookie.set('qc-token', token);

    QuestionService.getQuestions()
      .then(() => History.push('/'))
      .catch(() => {
        Cookie.remove('qc-token');

        setTimeout(() => {
          this.setState({ error: true, loading: false });
        }, Config.SPINNER_TIME);
      });
  };

  render() {
    const { classes } = this.props;
    const { token, error, loading } = this.state;

    return (
      <div className={classes.root}>
        <TextField
          error={error}
          variant="outlined"
          className={classes.input}
          label="Password"
          value={token}
          onChange={event => this.setState({ token: event.target.value, error: false })}
        />

        <div className={classes.button}>
          <IconButton onClick={this.handleClick}>
            <Send />
          </IconButton>
          {loading && <CircularProgress size={48} className={classes.buttonProgress} />}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Auth);
