import "./styles.css";
import UserContext from "./context/userContext";
import React, { useEffect } from "react";
import Landingpage from "./components/pages/Landingpage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import LogIn from "./components/pages/Login";
import axios from "axios";
import Addcar from "./components/Addcar";
import Modifycar from "./components/Modifycar";
import Register from "./components/pages/Signup";

function App() {
  var userContext = React.useContext(UserContext);
  React.useEffect(() => {
    const fetchUser = async function () {
      const ctoken = localStorage.getItem("x-auth-token");
      if (ctoken) {
        try {
          const { data } = await axios.post(
            "https://blooming-taiga-58489.herokuapp.com/validate",
            null,
            {
              headers: {
                "x-auth-token": ctoken
              }
            }
          );
          userContext.loadUser({
            token: ctoken,
            username: data.username,
            loggedIn: true
          });
        } catch (err) {
          console.log(err);
          userContext.loadUser({
            token: null,
            username: "",
            loggedIn: false
          });
        }
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={userContext.loggedIn ? Dashboard : Landingpage}
          />
          <Route
            path="/addcars"
            exact
            component={userContext.loggedIn ? Addcar : Landingpage}
          />
          <Route
            path="/modifycar"
            exact
            component={userContext.loggedIn ? Modifycar : Landingpage}
          />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
