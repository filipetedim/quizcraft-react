import React, { Component } from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

// Components
import LoadingError from "../components/LoadingError";

// Stores
import FilterStore from "../stores/filterStore";

// Services
import QuestionService from "../services/questionService";

// Utils
import DataTypes from "../utils/dataTypes";
import Config from "../utils/config";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  tableRowLoading: {
    height: 0
  },
  tableCellLoading: {
    padding: "0 !important"
  }
});

class QuestionTable extends Component {
  state = {
    loading: true,
    error: false,
    page: 0,
    rowsPerPage: 10,
    questions: []
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getQuestions();

    setTimeout(() => {
      this.setState({ loading: false });
    }, Config.SPINNER_TIME);
  }

  async componentWillReceiveProps() {
    this.setState({ loading: true });
    await this.getQuestions();

    setTimeout(() => {
      this.setState({ loading: false });
    }, Config.SPINNER_TIME);
  }

  /**
   * Loads all the questions.
   */
  getQuestions = async () =>
    await QuestionService.getQuestions()
      .then(questions => this.setState({ questions }))
      .catch(() => this.setState({ error: true }));

  /**
   * Handles the page
   */
  handleChangePage = (event, page) => this.setState({ page });

  /**
   * Handles the rows per page
   */
  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: event.target.value });

  render() {
    const { classes } = this.props;
    const { loading, error, page, rowsPerPage, questions } = this.state;

    if (error) {
      return <LoadingError />;
    }

    let filtered = questions;
    const activeExpansions = FilterStore.activeFilter("expansions");
    const activeDifficulties = FilterStore.activeFilter("difficulties");
    const activeTypes = FilterStore.activeFilter("types");
    const activeCategories = FilterStore.activeFilter("categories");

    if (activeExpansions.length > 0) {
      filtered = filtered.filter(
        question => activeExpansions.indexOf(question.expansion) > -1
      );
    }

    if (activeDifficulties.length > 0) {
      filtered = filtered.filter(
        question => activeDifficulties.indexOf(question.difficulty) > -1
      );
    }

    if (activeTypes.length > 0) {
      filtered = filtered.filter(
        question => activeTypes.indexOf(question.type) > -1
      );
    }

    if (activeCategories.length > 0) {
      filtered = filtered.filter(
        question => activeCategories.indexOf(question.category) > -1
      );
    }

    if (FilterStore.search) {
      filtered = filtered.filter(
        question =>
          question.question
            .toLowerCase()
            .indexOf(FilterStore.search.toLowerCase()) > -1
      );
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Expansion</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Question Type</TableCell>
              <TableCell align="right">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow className={classes.tableRowLoading}>
                <TableCell className={classes.tableCellLoading} colSpan={5}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            {filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(question => (
                <TableRow key={question._id}>
                  <TableCell component="th" scope="row">
                    {question.question}
                  </TableCell>
                  <TableCell align="right">
                    {
                      DataTypes.parseToObject(DataTypes.expansions)[
                        question.expansion
                      ]
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      DataTypes.parseToObject(DataTypes.difficulties)[
                        question.difficulty
                      ]
                    }
                  </TableCell>
                  <TableCell align="right">
                    {DataTypes.parseToObject(DataTypes.types)[question.type]}
                  </TableCell>
                  <TableCell align="right">
                    {
                      DataTypes.parseToObject(DataTypes.categories)[
                        question.category
                      ]
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(observer(QuestionTable));
