import { Avatar, Box, Button, Card, CardHeader, Chip, IconButton, List, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import PublicIcon from "@mui/icons-material/Public";

const api_URL = import.meta.env.VITE_API_URL;

const JuniorCard = ({ junior, userDB, setUpdated, setGeoQuery, setFieldQuery, fieldQuery }) => {
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
    if (!fieldQuery.includes(skill)) setFieldQuery([...fieldQuery, skill]);
  };

  return (
    <Card sx={{ width: "50%", bgcolor: "#fbfbfb", p: 3 }}>
      <Box sx={{ width: "100", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 64, height: 64 }}
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${junior.firstName[0]}${junior.lastName[0]}`}
              alt={`${junior.firstName} ${junior.lastName}`}
            />
          }
          title={junior.firstName + " " + junior.lastName}
          subheader={`(${junior.pronouns})`}
        />
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
          {junior.location?.country !== "" ? junior.location?.country : "N/A"}
        </Button>
      </Box>
      <Typography>{junior.bio}</Typography>
      <div className="country">
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
    </Card>
  );
};

export default JuniorCard;
