import React, { useState } from "react";
import { Button, Card, Form, } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });
  
    const data = await response.json();
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_id", data.user.id); // assuming user id is located in user.id
      navigate('/dashboard/events');
    
    } else {
      console.error("Invalid email or password");
    }
  }  

  return (
    <div className="page-sign">
      <Card className="card-sign">
        <Card.Header>
          <Link to="/" className="header-logo mb-4">dashbyte</Link>
          <Card.Title>Logga in</Card.Title>
          <Card.Text>Välkommen till vårt intranät</Card.Text>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Form.Label >Epost</Form.Label>
              <Form.Control type="text" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <Form.Label className="d-flex justify-content-between">Lösenord <Link to="">Glömt ditt lösenord?</Link></Form.Label>
              <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" variant="primary" className="btn-sign">Sign In</Button>

            <div className="divider"><span>Saknar du konto? Kontakta oss!</span></div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}