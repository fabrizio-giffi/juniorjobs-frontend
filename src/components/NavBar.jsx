import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./NavBar.css";

function NavBar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);


  return (
    <ul className="ul-navbar">
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
  );
}

export default NavBar;
