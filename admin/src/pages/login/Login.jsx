import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../../hooks/axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      apiClient
        .post("/admin/login", formData)
        .then((response) => {
          setErrors({});
          setSuccessMessage("Login Successfulll!");
          localStorage.setItem(
            "auth-data",
            JSON.stringify({
              access_token: response?.data?.token,
            })
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          setErrors(error?.response?.data?.errors);
          setSuccessMessage("");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="p-3 bg-light rounded shadow-sm">
            <h2 className="mb-4">Admin Login</h2>
            <span className="text-success text-center d-block">
              {successMessage}
            </span>
            <span className="text-danger text-center d-block">
              {errors?.message}
            </span>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button className="mt-2" variant="success" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
