import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

// Components
import LoadingError from '../components/LoadingError';

// Services
import QuestionService from '../services/questionService';

// Stores
import FilterStore from '../stores/filterStore';

// Utils
import History from '../utils/history';
import DataTypes from '../utils/dataTypes';
import Config from '../utils/config';

const styles = {
  root: {
    width: '100%',
    maxWidth: 800,
    marginBottom: 20,
  },
  header: {
    paddingBottom: 0,
  },
  input: {
    marginBottom: 15,
  },
  extraMargin: {
    marginBottom: 25,
  },
};

class EditQuestion extends Component {
  state = {
    id: 0,
    loading: false,
    error: [],
    question: '',
    answer: '',
    wrong: [],
    expansion: 0,
    difficulty: 0,
    type: 0,
    category: 24,
    wrong0: '',
    wrong1: '',
    wrong2: '',
    wrong3: '',
    wrong4: '',
    wrong5: '',
    wrong6: '',
  };

  async componentWillReceiveProps(props) {
    const { id } = props;
    if (id === null || id === undefined) {
      return;
    }

    this.setState({ loading: true, id });
    await this.getQuestion(id);

    setTimeout(() => {
      this.setState({ loading: false });
    }, Config.SPINNER_TIME);
  }

  /**
   * Loads a specific question.
   */
  getQuestion = async id =>
    await QuestionService.getQuestion(id)
      .then(question => {
        question.wrong.forEach((item, i) => this.setState({ ['wrong' + i]: item }));
        this.setState({ ...question });
      })
      .catch(() => this.setState({ error: true }));

  /**
   * Updates a question
   */
  updateQuestion = () => {
    this.setState({ loading: true });
    const { id, expansion, difficulty, type, category, question, answer } = this.state;

    const wrong = [];
    ['wrong0', 'wrong1', 'wrong2', 'wrong3', 'wrong4', 'wrong5', 'wrong6'].forEach(item => {
      if (this.state[item] && this.state[item].trim()) {
        wrong.push(this.state[item]);
      }
    });

    QuestionService.putQuestion({
      id,
      data: {
        expansion,
        difficulty,
        type,
        category,
        question,
        answer,
        wrong,
      },
    })
      .then(() => {
        setTimeout(() => {
          History.push('/questions');
        }, Config.SPINNER_TIME);
      })
      .catch(error => {
        setTimeout(() => {
          this.setState({
            loading: false,
            error: error.body.validationErrors,
            wrong: [],
          });
        }, Config.SPINNER_TIME);
      });
  };

  /**
   * Handles the input change
   */
  handleChange = name => event => this.setState({ [name]: event.target.value });

  render() {
    const { classes } = this.props;
    const {
      id,
      loading,
      error,
      question,
      answer,
      expansion,
      difficulty,
      type,
      category,
      wrong0,
      wrong1,
      wrong2,
      wrong3,
      wrong4,
      wrong5,
      wrong6,
    } = this.state;

    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          action={
            <IconButton onClick={() => History.push('/questions')}>
              <Close />
            </IconButton>
          }
          subheader={`EDIT QUESTION - ${id}`}
        />
        <CardContent>
          {/* Settings */}
          <Grid className={classes.extraMargin} container spacing={16}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                variant="filled"
                label="Expansion"
                className={classes.input}
                value={expansion}
                onChange={this.handleChange('expansion')}
                fullWidth
              >
                {DataTypes.expansions.map(expansion => (
                  <MenuItem key={expansion.id} value={expansion.id}>
                    {expansion.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                variant="filled"
                label="Difficulty"
                className={classes.input}
                value={difficulty}
                onChange={this.handleChange('difficulty')}
                fullWidth
              >
                {DataTypes.difficulties.map(difficulty => (
                  <MenuItem key={difficulty.id} value={difficulty.id}>
                    {difficulty.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                variant="filled"
                label="Question Type"
                className={classes.input}
                value={type}
                onChange={this.handleChange('type')}
                fullWidth
              >
                {DataTypes.types.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                variant="filled"
                label="Category"
                className={classes.input}
                value={category}
                onChange={this.handleChange('category')}
                fullWidth
              >
                {DataTypes.categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Question */}
          <TextField
            variant="filled"
            className={classes.input}
            label="Question?"
            value={question}
            onChange={this.handleChange('question')}
            fullWidth
          />

          {/* Answers */}
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="filled"
                className={classes.input}
                label="Correct answer"
                value={answer}
                onChange={this.handleChange('answer')}
                fullWidth
              />
              <TextField
                variant="filled"
                className={classes.input}
                label="Wrong answer 1"
                value={wrong0}
                onChange={this.handleChange('wrong0')}
                fullWidth
              />
              <TextField
                variant="filled"
                className={classes.input}
                label="Wrong answer 2"
                value={wrong1}
                onChange={this.handleChange('wrong1')}
                fullWidth
              />
              <TextField
                variant="filled"
                className={classes.input}
                label="Wrong answer 3"
                value={wrong2}
                onChange={this.handleChange('wrong2')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                className={classes.input}
                label="Wrong answer 4 (optional)"
                value={wrong3}
                onChange={this.handleChange('wrong3')}
                fullWidth
              />
              <TextField
                variant="outlined"
                className={classes.input}
                label="Wrong answer 5 (optional)"
                value={wrong4}
                onChange={this.handleChange('wrong4')}
                fullWidth
              />
              <TextField
                variant="outlined"
                className={classes.input}
                label="Wrong answer 6 (optional)"
                value={wrong5}
                onChange={this.handleChange('wrong5')}
                fullWidth
              />
              <TextField
                variant="outlined"
                className={classes.input}
                label="Wrong answer 7 (optional)"
                value={wrong6}
                onChange={this.handleChange('wrong6')}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" onClick={this.updateQuestion}>
            Update question
          </Button>
          {error && error.map((item, i) => <LoadingError key={i} message={item.msg} />)}
        </CardContent>
        {loading && <LinearProgress />}
      </Card>
    );
  }
}

export default withStyles(styles)(EditQuestion);
