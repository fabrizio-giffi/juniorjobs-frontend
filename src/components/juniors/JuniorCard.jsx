import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./JuniorCard.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const api_URL = import.meta.env.VITE_API_URL;

const JuniorCard = ({ junior, userDB, setUpdated }) => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const addJunior = async (juniorId) => {
    const requestBody = { id: user.id, juniorId };
    try {
      await axios.put(`${api_URL}/company/addFavoriteJunior`, requestBody);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="image-outer">
        <img src={junior.profilePic} alt={`${junior.firstName} ${junior.lastName}`} />
      </div>
      <div className="junior-name">
        <h5>{junior.firstName}</h5>
        <h5>{junior.lastName}</h5>
      </div>
      <div className="skills">
        <h5>
          <ul>
            {junior.skills.map((skill) => {
              return <li key={skill}>{skill}</li>;
            })}
          </ul>
        </h5>
      </div>
      <div className="country">
        <h5>{junior.location.country}</h5>
        <div className="details-heart">
          <h5>
            <Link to={`/junior/${junior._id}`}>details</Link>
          </h5>
          {(userDB && !isLoggedIn) || userDB.favorites.some((favorite) => favorite._id === junior._id) ? (
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => addJunior(junior._id)} aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default JuniorCard;
