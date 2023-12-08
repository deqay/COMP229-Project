// SignIn.jsx
import { useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../src/App";
const SignOut = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/users/signout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        localStorage.clear();
        dispatch({ type: "USER", payload: false });
        navigate("/signin");

        if (res.status != 200) {
          const error = new error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default SignOut;
