import React from 'react'
import "./Login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    navigate("/")
  }

  return (
    <div className="body">
      <div className='box'>
       <span className="borderLine"></span>
        <form >
            <h2>Log in</h2>
            <div className="inputBox">
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
            <div className="links">
            </div>
            {/* <!-- <input type="submit" value="Login"> --> */}
            <button onClick={handleClick} id="loginButton" type="submit">Login
            </button>
            {/* <!-- <a href="index.html" className="button">Login</a> --> */}
        </form>
    </div>
    </div>
    
  )
}

export default Login
