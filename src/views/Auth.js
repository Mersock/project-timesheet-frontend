import React from "react";
import { Button } from "react-bootstrap";

const Auth = (props) => {
  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="auth-Submit">
            <Button
              className="btn-fill auth-btn"
              type="submit"
              variant="primary"
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
