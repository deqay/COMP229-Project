import { useContext, useState } from "react";
import { signin } from "./api-auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { UserContext } from "../src/App";
import "/auth/SignIn.css";

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async () => {
    event.preventDefault();
    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const data = await signin(user);
      localStorage.setItem("token", data.token);
      document.cookie = `token = ${data.token}`;
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        dispatch({ type: "USER", payload: true });
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={clickSubmit}>
        <div className="header">
          <div className="text">Log In to Visitara</div>
          <div className="underline"></div>
        </div>
        <p className="sub-text">
          New to Visitara?{" "}
          <a className="terms-link" href="/signup">
            Sign up
          </a>
        </p>

        <p className="terms-text">
          By continuing, you agree to Vistara’s{" "}
          <a
            className="terms-link"
            href="https://terms.yelp.com/tos/en_us/20200101_en_us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          and acknowledge Vistara's{" "}
          <a
            className="terms-link"
            href="https://terms.yelp.com/privacy/en_us/20220831_en_us/"
          >
            Privacy Policy
          </a>
          .
        </p>

        <div className="form-group">
          <label htmlFor="email">
            <AiOutlineMail /> Email
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange("email")}
            required
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
            required
          />
        </div>
        {values.error && <div className="error-message">{values.error}</div>}
        <button onClick={clickSubmit}>Submit</button>
      </form>

      <div className="image-container">
        <img src="/photos/sign.jpeg" alt="Side Image" />
      </div>
    </div>
  );
};

export default SignIn;
