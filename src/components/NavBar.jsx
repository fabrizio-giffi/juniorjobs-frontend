import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./NavBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

function NavBar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [cross, setCross] = useState(false);

  return (
    <>
      <div className="ul-navbar">
        <NavLink to='/' >
          <img src="../juniorjobs.png" alt="logo junior jobs" />
        </NavLink>

        <ul className="ul-desktop">
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/jobs">Jobs</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to={user.role === "company" ? "/junior" : "/jobs"}>
                  {user.role === "company" ? "Juniors" : "Jobs"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              {user.role === "company" && (
                <li>
                  <NavLink to="/create-post">Create job post</NavLink>
                </li>
              )}
            </>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/" onClick={logOutUser}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>

        <Button className="burger">
          {!cross ? (
            <MenuIcon sx={{ color: "grey" }} onClick={(e) => setCross(true)} />
          ) : (
            <CloseIcon
              sx={{ color: "grey" }}
              onClick={(e) => setCross(false)}
            />
          )}
        </Button>
      </div>

      {cross ? (
        <div className="dropdown">
          <ul className="ul-mobile">
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <hr />
                <li>
                  <NavLink to="/jobs">Jobs</NavLink>
                </li>
                <hr />
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
                <hr />
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to={user.role === "company" ? "/junior" : "/jobs"}>
                    {user.role === "company" ? "Juniors" : "Jobs"}
                  </NavLink>
                </li>
                <hr />
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <hr />
                {user.role === "company" && (
                  <li>
                    <NavLink to="/create-post">Create job post</NavLink>
                  </li>
                )}
              </>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/" onClick={logOutUser}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default NavBar;
