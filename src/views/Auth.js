import jwtDecode from "jwt-decode";
import React from "react";
import Button from "react-bootstrap/Button";
import { Login } from "utils/auth";

const Auth = (props) => {
  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      const email = e.target.email.value
      const password = e.target.password.value
      const res = await Login(email,password)
      const userProfile = jwtDecode(res.access_token)
      console.log(userProfile)
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit} method="post">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button
              type="submit"
              className="btn btn-primary"
              variant="primary"
              size="lg"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
