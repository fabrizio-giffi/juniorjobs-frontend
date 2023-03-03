import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./NavBar.css";

function NavBar() {
  const { role, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <ul>
      {!isLoggedIn && (
        <>
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
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {role === "company" && (
            <li>
              <NavLink to="/profile">Create job post</NavLink>
            </li>
          )}
        </>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/" onClick={logOutUser}>
            logout
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavBar;
