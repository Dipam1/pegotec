import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = (event) => {
    event.preventDefault();
    const loginInfo = { email, password };
    axios
      .post("https://api.framework.pegotec.pro/api/auth/login", loginInfo)
      .then((response) => {
        toast.success("User Logged In!");
      })
      .catch((err) => {
        toast.error("Login Unsuccessful");
      });
  };

  return (
    <div className="login-page-main">
      <h2>Sign In</h2>
      <div className="form-container">
        <Form onSubmit={formSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="sm"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="sm"
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback tooltip type="invalid">
              Password must be atleast 6 characters!
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="px-3" size="sm" variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
