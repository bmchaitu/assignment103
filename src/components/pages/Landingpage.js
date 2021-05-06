import "../../styles.css";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="form-div">
      <h1>Hey!</h1>
      <br />
      <p>
        Welcome to the platform. Become a registered user to explore more
        features that are available
      </p>
      <Link className="btn btn-primary mx-3" to="/register" role="button">
        SignUp
      </Link>
      <Link className="btn btn-info mx-3" to="/login" role="button">
        LogIn
      </Link>
    </div>
  );
};

export default Landingpage;
