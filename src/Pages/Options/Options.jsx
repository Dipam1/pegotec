import React from "react";
import { useHistory } from "react-router";
import "./Options.css";

const Options = () => {
  const history = useHistory();

  return (
    <div className="login-signup-option">
      <div className="option" onClick={() => history.push("/login")}>
        Login
      </div>
      <div className="option" onClick={() => history.push("/signup")}>
        Sign Up
      </div>
    </div>
  );
};

export default Options;
