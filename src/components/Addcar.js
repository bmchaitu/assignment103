import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import axios from "axios";
import UserContext from "../context/userContext";

export default (props) => {
  const [state, setState] = React.useState({ model: "", year: "", color: "" });
  var userContext = React.useContext(UserContext);
  const handleClick = () => {
    localStorage.removeItem("x-auth-token");
    userContext.removeUser();
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let schema = {
      model: Joi.string().required().label("Model name"),
      year: Joi.number().required().label("Released Year"),
      color: Joi.string().required().label("Color")
    };
    const obj = {
      color: state.color,
      year: state.year,
      model: state.model
    };
    const res = Joi.validate(obj, schema);
    if (res.error) {
      alert(res.error.message);
      setState({ year: "", model: "", color: "" });
    } else {
      axios
        .post("https://blooming-taiga-58489.herokuapp.com/api/cars", state)
        .then(() => props.history.push("/"))
        .catch((err) => alert("Something is wrong"));
    }
  };
  return (
    <div>
      <div className="row m-3">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <button className="btn btn-warning" onClick={handleClick}>
              LogOut
            </button>
          </div>
        </nav>
      </div>
      <div className="addcontainer p-5 mx-5">
        <form className="form-signin" onSubmit={handleSubmit}>
          <h2 className="mx-3">Enter New Car Details</h2>
          <input
            type="text"
            name="model"
            onChange={handleChange}
            value={state.model}
            className="form-control m-3"
            placeholder="Enter model name"
            required
            autoFocus
          />
          <input
            type="text"
            name="year"
            onChange={handleChange}
            value={state.year}
            className="form-control m-3"
            placeholder="Enter Released Year"
            required
          />
          <input
            type="text"
            name="color"
            onChange={handleChange}
            value={state.color}
            className="form-control m-3"
            placeholder="Enter Car color"
            required
          />
          <button
            className="btn btn-lg btn-primary btn-block m-3"
            type="submit"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};
