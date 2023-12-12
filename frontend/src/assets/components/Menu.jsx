import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Menu = () => {
  const { state } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem("token");

  const isActive = (path) => {
    return window.location.pathname === path
      ? { color: "#bef67a" }
      : { color: "#ffffff" };
  };

  const RenderMenu = () => {
    if (!state && !isAuthenticated) {
      return (
        <>
          <AppBar
            position="fixed"
            style={{ top: 0, zIndex: 1000, background: "rgb(255, 81, 81)" }}
          >
            <Toolbar>
              <img
                src="./photos/logo.png"
                alt="Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography variant="h6" color="inherit"></Typography>
              <div>
                <Button style={isActive("/home")}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </Button>
                <Button style={isActive("/featured")}>
                  <Link
                    to="/featured"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Businesses
                  </Link>
                </Button>
              </div>
              <div style={{ position: "absolute", right: "10px" }}>
                <span style={{ float: "right" }}>
                  <Button style={isActive("/signup")}>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Sign up
                    </Link>
                  </Button>
                  <Button style={isActive("/signin")}>
                    <Link
                      to="/signin"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Sign In
                    </Link>
                  </Button>
                </span>
              </div>
            </Toolbar>
          </AppBar>
        </>
      );
    } else {
      return (
        <>
          <AppBar
            position="fixed"
            style={{ top: 0, zIndex: 1000, background: "rgb(255, 81, 81)" }}
          >
            <Toolbar>
              <img
                src="./photos/logo.png"
                alt="Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography variant="h6" color="inherit"></Typography>
              <div>
                <Button style={isActive("/home")}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </Button>
                <Button style={isActive("/featured")}>
                  <Link
                    to="/featured"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Businesses
                  </Link>
                </Button>
              </div>
              <div style={{ position: "absolute", right: "10px" }}>
                <span style={{ float: "right" }}>
                  <span>
                    <Button style={isActive("/myreviews")}>
                      <Link
                        to="/myreviews"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        My Reviews
                      </Link>
                    </Button>
                    <Button style={isActive("/myprofile")}>
                      <Link
                        to="/myprofile"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        My Profile
                      </Link>
                    </Button>
                    <Button style={isActive("")}>
                      <Link
                        to="/signout"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Sign Out
                      </Link>
                    </Button>
                  </span>
                </span>
              </div>
            </Toolbar>
          </AppBar>
        </>
      );
    }
  };

  return (
    <>
      <RenderMenu />
    </>
  );
};

export default Menu;
