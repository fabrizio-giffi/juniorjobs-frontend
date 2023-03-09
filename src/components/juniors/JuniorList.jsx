import JuniorCard from "./JuniorCard";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import GeoFilter from "../filters/GeoFilter";
import StackFilter from "../filters/StackFilter";
import "./JuniorCard.css";
import "./JuniorList.css";
import { Container } from "@mui/system";

const api_URL = import.meta.env.VITE_API_URL;

const JuniorList = () => {
  const { user } = useContext(AuthContext);
  const [juniors, setJuniors] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [userDB, setUserDB] = useState({});
  const [updated, setUpdated] = useState(false);
  const [geoQuery, setGeoQuery] = useState("");
  const [stackQuery, setStackQuery] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(`${api_URL}/user`);
    setJuniors(response.data.reverse());
    if (user) {
      const getCompany = await axios.get(`${api_URL}/company/${user.id}`);
      setUserDB(getCompany.data);
    }
    setUpdated(false);
    setIsFetching(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [updated]);

  // FILTERS
  const countryFilter = [];
  juniors.forEach((junior) => {
    if (typeof junior.location !== "undefined" && !countryFilter.includes(junior.location.country)) {
      countryFilter.push(junior.location.country);
    }
  });

  const stackFilter = [];
  juniors.forEach((junior) => {
    junior.skills.forEach((skill) => {
      if (!stackFilter.includes(skill)) {
        stackFilter.push(skill);
      }
    });
  });

  if (isFetching) {
    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Skeleton width="50%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="50%">
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      </>
    );
  }

  return (
    juniors.length > 0 && (
      <>
        <Container
          className="filterCtn"
          sx={{
            mt: 3,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GeoFilter geoQuery={geoQuery} setGeoQuery={setGeoQuery} countryFilter={countryFilter} />
          <StackFilter stackQuery={stackQuery} setStackQuery={setStackQuery} stackFilter={stackFilter} />
        </Container>
        <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4" gutterBottom>
          Available juniors
        </Typography>

        <div className="outer-junior-card">
          {juniors
            // Filter out the juniors that have an undefined firstName or lastName
            .filter((junior) => junior.firstName || junior.lastName)
            .filter((junior) => (geoQuery.length === 0 ? true : junior.location.country === geoQuery))
            .filter((junior) =>
              stackQuery.length === 0 ? true : stackQuery.every((skill) => junior.skills.includes(skill))
            )
            .map((junior) => {
              return (
                <JuniorCard
                  stackQuery={stackQuery}
                  setStackQuery={setStackQuery}
                  setGeoQuery={setGeoQuery}
                  key={junior._id}
                  junior={junior}
                  userDB={userDB}
                  setUpdated={setUpdated}
                />
              );
            })}
        </div>
      </>
    )
  );
};
export default JuniorList;
