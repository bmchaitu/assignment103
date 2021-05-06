import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

import Joi from "joi-browser";
class Modifycar extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = { year: "", color: "", model: "" };
  }

  componentDidMount() {
    this.setState({
      year: this.props.location.year,
      model: this.props.location.model,
      color: this.props.location.color
    });
  }
  handleClick = () => {
    localStorage.removeItem("x-auth-token");
    this.context.removeUser();
  };

  handleChange = (ev) => {
    const newstate = { ...this.state };
    newstate[ev.target.name] = ev.target.value;
    this.setState(newstate);
  };

  handleSubmit = (ev) => {
    let schema = {
      model: Joi.string().required().label("Model name"),
      year: Joi.number().required().label("Released Year"),
      color: Joi.string().required().label("Color")
    };
    ev.preventDefault();
    const obj = {
      color: this.state.color,
      year: this.state.year,
      model: this.state.model
    };
    const res = Joi.validate(obj, schema);
    if (res.error) {
      alert(res.error.message);
    } else {
      axios
        .put(
          `https://blooming-taiga-58489.herokuapp.com/api/cars/${this.props.location.id}`,
          this.state
        )
        .then(() => this.props.history.push("/"))
        .catch((err) => alert("Something is wrong"));
    }
  };

  // componentWillUnmount() {
  //   const user = this.context;
  //   if (user.user.loggedIn) this.props.history.push("/dashboard");
  // }

  handleLogout = () => {
    localStorage.removeItem("auth-token");
    //setUser({ token: undefined, user: undefined, loggedIn: false });
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className="row m-3">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Home
              </Link>
              <button className="btn btn-warning" onClick={this.handleClick}>
                LogOut
              </button>
            </div>
          </nav>
        </div>

        <div className="addcontainer p-5">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="mx-3">Enter New Car Details</h2>
            <input
              type="text"
              name="model"
              onChange={this.handleChange}
              value={this.state.model}
              className="form-control m-3"
              placeholder="Enter model name"
              required
              autoFocus
            />
            <input
              type="text"
              name="year"
              onChange={this.handleChange}
              value={this.state.year}
              className="form-control m-3"
              placeholder="Enter Year name"
              required
            />
            <input
              type="text"
              name="color"
              onChange={this.handleChange}
              value={this.state.color}
              className="form-control m-3"
              placeholder="Enter color name"
              required
            />
            <button
              className="btn btn-lg btn-success btn-block m-3"
              type="submit"
            >
              Done
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Modifycar;
