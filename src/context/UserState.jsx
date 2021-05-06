import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";
export default (props) => {
  const intialState = {
    username: "",
    token: "Not set",
    loggedIn: false,
    car: null
  };

  const [state, dispatch] = useReducer(userReducer, intialState);

  const loadUser = (data) => {
    dispatch({
      type: "LOAD_USER",
      payload: {
        token: data.token,
        username: data.username,
        loggedIn: data.loggedIn
      }
    });
  };

  const getUser = () => {
    const user = {
      username: "abc@gmail.com",
      token: "KJGHSADGHDGW&*%^@*(S"
    };
    dispatch({
      type: "GET_USER",
      payload: user
    });
  };

  const removeUser = () => {
    dispatch({
      type: "REMOVE_USER"
    });
  };

  const setUser = (data) => {
    localStorage.setItem("x-auth-token", data.token);
    dispatch({
      type: "SET_USER",
      payload: {
        token: data.token,
        username: data.user.username
      }
    });
  };
  const addCar = (car) => {
    dispatch({
      type: "ADD_CAR",
      payload: {
        car: car
      }
    });
  };

  const { username, token, loggedIn, car } = state;
  return (
    <UserContext.Provider
      value={{
        username: username,
        token: token,
        getUser: getUser,
        loadUser: loadUser,
        car,
        removeUser,
        setUser,
        loggedIn,
        addCar
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
