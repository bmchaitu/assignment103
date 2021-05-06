import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import UserContext from '../context/UserContext';

class CarList extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }
  //static contextType = UserContext;

  async componentDidMount() {
    const { data } = await axios.get(
      "https://blooming-taiga-58489.herokuapp.com/api/cars"
    );
    this.setState({
      list: data
    });
  }

  handleModify = (cid) => {
    this.props.history.push({ pathname: "/modifycar", state: { cid } });
  };
  handleDelete = async (cid) => {
    await axios.delete(
      "https://blooming-taiga-58489.herokuapp.com/api/cars/" + cid
    );
    const newlist = this.state.list.filter((c) => c._id !== cid);
    this.setState({ list: newlist });
  };
  handleAdd = () => {
    this.props.history.push("/addcars");
    //history.push('/addcars')
  };
  render() {
    return (
      <div className="container m-3">
        <div className="mx-5">
          <table className="table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((car) => {
                return (
                  <tr key={car._id}>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.color}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/modifycar",
                          model: car.model,
                          year: car.year,
                          color: car.color,
                          id: car._id
                        }}
                        role="button"
                      >
                        <button className="btn btn-info">Modify Car</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.handleDelete(car._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/addcars" role="button">
            <button className="btn btn-primary">Add New Car</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CarList;
