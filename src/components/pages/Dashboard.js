import React from "react";
import UserContext from "../../context/userContext";
import CarList from "../CarList";

export default ({ history }) => {
  var userContext = React.useContext(UserContext);
  const handleClick = () => {
    localStorage.removeItem("x-auth-token");
    userContext.removeUser();
  };

  //console.log(history);
  return (
    <div style={{ textAlign: "center" }}>
      <div className="container ">
        <div className="row px-5">
          <div className="row">
            <div className="d-flex flex-row-reverse px-3">
              <button className="btn btn-warning" onClick={handleClick}>
                LogOut
              </button>
            </div>
          </div>
          <CarList />
        </div>
      </div>
    </div>
  );
};
