import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserContext from "../../context/userContext";
import LogIn from "./Login";
import Dashboard from "./Dashboard";
import axios from "axios";

export default () => {
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
    <BrowserRouter>
      <Route path="/" component={userContext.loggedIn ? Dashboard : LogIn} />
    </BrowserRouter>
  );
};
