import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Main from "./pages/Main";

import { GeneralContextProvider } from "./utils/GeneralContext";
import UnAuthRoute from "./utils/UnAuthRoute";
import AuthRoute from "./utils/AuthRoute";
import Register from "./pages/Register";

import themeFile from "./utils/theme";

//MUI
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NewsSources from "./pages/NewsSources";
const theme = createMuiTheme(themeFile);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GeneralContextProvider>
          <Router>
            <Navbar>
              <AuthRoute exact path="/" component={Main}></AuthRoute>
              <AuthRoute exact path="/news" component={NewsSources}></AuthRoute>

              <UnAuthRoute exact path="/login" component={Login} />
              <UnAuthRoute exact path="/register" component={Register} />
            </Navbar>
          </Router>
        </GeneralContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
