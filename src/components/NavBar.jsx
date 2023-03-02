import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const { logOutUser } = useContext(AuthContext);
  return (
    <ul>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <button type="button" onClick={logOutUser}>
          Log out
        </button>
      </li>
    </ul>
  );
}

export default NavBar;
