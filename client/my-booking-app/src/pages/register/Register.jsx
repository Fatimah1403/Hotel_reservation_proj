import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../components/utils/toastify";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import requestHandler from "../../components/utils/requestHandler";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.elements.username.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      country: event.target.elements.country.value,
      city: event.target.elements.city.value,
      phone: event.target.elements.phone.value,
    }


    // const validator = await validator(data)
    const validator = true

    if (!validator){
      // register user
      errorToast("error registering user")
    }
    const baseUrl = "http://localhost:6000/api/v1/users"
    const uri = `${baseUrl}/signup`

    try{
      const parsedData = {
        ...data,
        email: ""
      }
      const response = requestHandler("post", uri, data)
      console.log(response[0]);
    }
    catch(error){

    }

  };

  return (
    <div className="body">
      <div className="boxs">
        <span className="borderLine"></span>
        <form onSubmit={handleRegister}>
          <h2>Register Here</h2>
          <div className="columns">
            <div className="rows">
              <div className="inputBoxs">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required="required"
                />
                {/* <!-- <div class="email_error">Please fill up your Email</div> --> */}
                <span>Username</span>
                <i></i>
              </div>
              <div className="inputBoxs">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required="required"
                />
                {/* <!-- <div class="email_error">Please fill up your Email</div> --> */}
                <span>Password</span>
                <i></i>
              </div>
              <div className="inputBoxs">
                <input
                  type="text"
                  id="country"
                  name="country"
                  required="required"
                />
                {/* <!-- <div class="email_error">Please fill up your Email</div> --> */}
                <span>Country</span>
                <i></i>
              </div>
            </div>
            <div className="rows">
              <div className="inputBoxs">
                <input
                  type="text"
                  id="email"
                  name="email"
                  required="required"
                />
                {/* <!-- <div class="email_error">Please fill up your Email</div> --> */}
                <span>Email</span>
                <i></i>
              </div>
              <div className="inputBoxs">
                <input type="text" id="city" name="city" required="required" />
                <span>City</span>
                <i></i>
              </div>
              <div className="inputBoxs">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  required="required"
                />
                <span>Phone</span>
                <i></i>
              </div>
              <div className="links"></div>
            </div>
          </div>
          {/* <!-- <input type="submit" value="Login"> --> */}
          <button id="loginButton" type="submit">
            Register
          </button>
          {/* <!-- <a href="index.html" className="button">Login</a> --> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
