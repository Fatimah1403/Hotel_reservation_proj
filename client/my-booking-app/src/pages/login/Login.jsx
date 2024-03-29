import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../components/utils/toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    const validator = true;

    if (!validator) {
      // register user
      errorToast("error login user");
    }
    const baseUrl = "http://localhost:5000/api/v1/users";
    const uri = `${baseUrl}/login`;

    // try {
    //   const response = requestHandler("post", uri, data);
    //   console.log(response[0]);
    //   if (response[0] === null) {
    //     const message = response[1]
    //     console.log(message);
    //     errorToast("error loggin in");
    //   }
    //   console.log(response[0]);
    //   successToast("Login Successful")
    // } catch (error) {
    //   const message = `${error.message}`
    //   errorToast(message)
    // }
    try {
      const userCredentials = `${data.email}:${data.password}`;
      const encodedCredentials = btoa(userCredentials);

      const response = await axios.post(
        uri,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        successToast("Login Successful");
      }
    } catch (error) {
      console.error(error);
      errorToast("error logging in user");
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
