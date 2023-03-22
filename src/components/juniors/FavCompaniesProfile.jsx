import { Avatar, Box, Card, Divider, IconButton, List, Stack, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const api_URL = import.meta.env.VITE_API_URL;
let filtered = [];

function FavCompaniesProfile() {
  const { user } = useContext(AuthContext);
  const [favoriteCompanies, setFavoriteCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setFavoriteCompanies(response.data.favoriteCompanies);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteCompany(companyId) {
    const requestBody = { id: user.id, companyId };
    try {
      await axios.put(`${api_URL}/user/privateprofile/deleteFavCompany`, requestBody);
      getCompanies();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Box className="nobottom" sx={{ minWidth: "50%", boxSizing: "border-box", p: 4 }}>
      <Typography variant="h6">Favorite companies</Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {favoriteCompanies.length > 0 &&
          (filtered = favoriteCompanies.map((company) => {
            return (
              <Card
                key={company._id}
                sx={{ display: "flex", p: 2, alignItems: "center", justifyContent: "space-between" }}
              >
                <Link to={`/company/${company._id}`} key={company._id}>
                  <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 1 }} alt={company.name} src={company.profilePic} />
                    <Typography>{company.name}</Typography>
                  </Stack>
                </Link>
                <IconButton sx={{ ml: 1, p: 0 }} type="button" onClick={() => deleteCompany(company._id)}>
                  <ClearIcon sx={{ width: 20 }} />
                </IconButton>
              </Card>
            );
          }))}
        {filtered.length === 0 && (
          <>
            <Divider />
            <Typography className="prompt">
              Your favorite list is still empty.
              <br />
              Have a look at our newest <Link to={"/jobs"}>job posts</Link>.
            </Typography>
          </>
        )}
      </List>
    </Box>
  );
}

export default FavCompaniesProfile;
