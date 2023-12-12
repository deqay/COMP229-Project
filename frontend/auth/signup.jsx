// SignUp.jsx

import { useState } from "react";
import { signup } from "./api-auth";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async () => {
    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const data = await signup(user);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex-container">
      <div className="square">
        <div className="header">
          <div className="text"> Sign Up for Visitara</div>
          <div className="underline"></div>
        </div>
        <p className="sub-text">
          
          Connect with great local businesses
        </p>
        <p className="terms-text">
          By continuing, you agree to Vistara’s{" "}
          <a className="terms-link" href="https://terms.yelp.com/tos/en_us/20200101_en_us/" target="_blank" rel="noopener noreferrer">Terms of Service</a>{" "}
          and acknowledge Vistara's{" "}
          <a className="terms-link" href="https://terms.yelp.com/privacy/en_us/20220831_en_us/">Privacy Policy</a>.
        </p>

        <form>
          <div className="form-group">
            <label htmlFor="name">
              <AiOutlineUser /> Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChange("name")}
              value={values.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <AiOutlineMail /> Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange("email")}
              value={values.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <AiOutlineLock /> Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange("password")}
              value={values.password}
            />
          </div>
          {values.error && (
            <div className="error-message">{values.error}</div>
          )}
          <button type="button" onClick={clickSubmit}>
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already on Visitara? <a className="terms-link"href="/signin">Log in</a> 
        </p>
     

      </div>

      <div className="image-container">
        <img src="/photos/sign.jpeg" alt="Side Image" />
      </div>
      
    </div>
  );
          };

export default SignUp;
