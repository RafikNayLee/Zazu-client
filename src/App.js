import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Error500 from "./pages/Error500";

import { GeneralContextProvider } from "./utils/GeneralContext";
import UnAuthRoute from "./utils/UnAuthRoute";
import AuthRoute from "./utils/AuthRoute";
import Register from "./pages/Register";

import themeFile from "./utils/theme";
//MUI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NewsSources from "./pages/NewsSources";
import Categories from "./pages/Categories";
const theme = createMuiTheme(themeFile);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GeneralContextProvider>
        <Router>
          <Navbar>
            <AuthRoute exact path="/" component={Main}></AuthRoute>
            <AuthRoute exact path="/news" component={NewsSources}></AuthRoute>
            <AuthRoute
              exact
              path="/categories"
              component={Categories}
            ></AuthRoute>

            <UnAuthRoute exact path="/login" component={Login} />
            <UnAuthRoute exact path="/register" component={Register} />
            <Route exact path="/500" component={Error500}></Route>
          </Navbar>
        </Router>
      </GeneralContextProvider>
    </ThemeProvider>
  );
}

export default App;
