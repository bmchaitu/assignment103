import React, { useContext } from "react";
import UserContext from "../context/userContext";
export default () => {
  const userContext = useContext(UserContext);
  React.useEffect(() => {
    userContext.loadUser();
  }, []);

  const handleClick = () => {
    console.log("Handle Clicked");
    userContext.getUser();
  };
  return (
    <div>
      <h3>Fucker</h3>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
