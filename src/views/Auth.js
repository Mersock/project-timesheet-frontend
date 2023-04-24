import React from "react";
import Button from "react-bootstrap/Button";

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
          <div className="d-grid gap-2 mt-3">
            <Button
              type="submit"
              class="btn btn-primary"
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
