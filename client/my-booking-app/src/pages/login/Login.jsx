import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../components/utils/toastify";
// import { validate } from "../../../../../server/models/RefreshToken";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    const validator = true

    if (!validator) {
      // register user
      errorToast("error login user");
    }
    const baseUrl = "http://localhost:6000/signup";
    const uri = `${baseUrl}/signup`;

    try {
      const response = requestHandler("post", uri, data);
      console.log(response[0]);
      if (response[0] === null) {
        const message = response[1]
        console.log(message);
        errorToast("error loggin in");
      }
      console.log(response[0]);
      successToast("Login Successful")
    } catch (error) {
      const message = `${error.message}`
      errorToast(message)
    }
  };

  return (
    <div className="body">
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={handleLogin}>
          <h2>Log in</h2>
          <div className="inputBox">
            <input type="text" id="email" name="email" required="required" />
            {/* <!-- <div class="email_error">Please fill up your Email</div> --> */}
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              id="password"
              name="password"
              required="required"
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links"></div>
          {/* <!-- <input type="submit" value="Login"> --> */}
          <button id="loginButton" type="submit">
            Login
          </button>
          {/* <!-- <a href="index.html" className="button">Login</a> --> */}
        </form>
      </div>
    </div>
  );
};

export default Login;