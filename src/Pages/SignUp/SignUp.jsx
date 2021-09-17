import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    dob: new Date(),
    about: "",
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/region/asia")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const formSubmit = (event) => {
    event.preventDefault();
    handleShow();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const calculateAge = () => {
    var today = new Date();
    var birthDate = new Date(formData.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="signup-page-main">
      <h2>Sign In</h2>
      <div className="form-container">
        <Form onSubmit={formSubmit}>
          <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Compant Name</Form.Label>
            <Form.Control
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              size="sm"
              type="text"
              placeholder="Enter your company name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              size="sm"
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              size="sm"
              type="text"
              placeholder="Enter your address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              size="sm"
              type="number"
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Select
              aria-label="Default select example"
              size="sm"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            >
              {countries.map((country) => (
                <option key={country.name}>{country.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date Of Birth</Form.Label>
            <DatePicker
              selected={formData.dob}
              onChange={(date) => setFormData({ ...formData, dob: date })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>About You</Form.Label>
            <Form.Control
              value={formData.about}
              onChange={(e) => {
                if (e.target.value.length > 300) {
                  toast.error("No More Than 300 Characters!");
                  return;
                }
                setFormData({ ...formData, about: e.target.value });
              }}
              as="textarea"
              placeholder="About You.."
              required
              style={{ height: "100px" }}
            />
          </Form.Group>

          <Button className="px-3" size="sm" variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signed Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dataInfo"> Company Name: {formData.companyName}</div>
          <div className="dataInfo"> Email: {formData.email}</div>
          <div className="dataInfo"> Address: {formData.address}</div>
          <div className="dataInfo"> Phone: {formData.phone}</div>
          <div className="dataInfo"> Country: {formData.country}</div>
          <div className="dataInfo"> Your Age: {calculateAge()} Years Old</div>
          <div className="dataInfo"> About: {formData.about}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
