import { NavLink } from "react-router-dom";

function NavBar() {
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
    </ul>
  );
}

export default NavBar;
