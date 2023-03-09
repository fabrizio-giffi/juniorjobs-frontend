import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./JuniorList.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import PublicIcon from "@mui/icons-material/Public";

const api_URL = import.meta.env.VITE_API_URL;

const JuniorCard = ({ junior, userDB, setUpdated, setGeoQuery, setStackQuery, stackQuery }) => {
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

  const handleClick = (skill) => {
    if (!stackQuery.includes(skill)) setStackQuery([...stackQuery, skill]);
  };

  return (
    <div className="card-public">
      <div className="image-outer">
        <img src={junior.profilePic || `https://api.dicebear.com/5.x/initials/svg?seed=${junior.firstName}`} alt={`${junior.firstName} ${junior.lastName}`} />
      </div>
      <div className="junior-name">
        <h5>{junior.firstName}</h5>
        <h5>{junior.lastName}</h5>
      </div>
      <div className="skills">
        <h5>
          <ul>
            {junior.skills.map((skill) => {
              return (
                <Button
                  sx={{ bgcolor: "#EAF4F4", color: "slategray", textTransform: "none" }}
                  variant="contained"
                  onClick={() => handleClick(skill)}
                  key={skill}
                >
                  {skill}
                </Button>
              );
            })}
          </ul>
        </h5>
      </div>
      <div className="country">
        <Button
          sx={{
            bgcolor: "#EAF4F4",
            color: "slategray",
            textTransform: "none",
            minWidth: "100px",
            position: "relative",
          }}
          variant="contained"
          onClick={() => setGeoQuery(junior.location.country)}
        >
          <PublicIcon sx={{ position: "absolute", right: "-8px", bottom: "20px" }} />
          {junior.location?.country !== "" ? junior.location.country : "N/A"}
        </Button>
        <div className="details-heart">
          <h5>
            <Link to={`/junior/${junior._id}`}>details</Link>
          </h5>
          {!isLoggedIn || !userDB || userDB.favorites?.some((favorite) => favorite._id === junior._id) ? (
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
