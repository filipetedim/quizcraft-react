import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Blue from "@material-ui/core/colors/blue";

// Routes
import Routes from "./Routes";

// Theme
import "typeface-roboto";
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: Blue,
    secondary: {
      main: "#2196f3"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
