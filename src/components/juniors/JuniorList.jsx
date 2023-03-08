import JuniorCard from "./JuniorCard";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import GeoFilter from "../filters/GeoFilter";
import StackFilter from "../filters/StackFilter";

const api_URL = import.meta.env.VITE_API_URL;

const JuniorList = () => {
  const { user } = useContext(AuthContext);
  const [juniors, setJuniors] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
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
      console.log("USERDB", userDB);
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

console.log("FETCHING" ,isFetching)

  // FILTERS
  const countryFilter = [];
  juniors.forEach((junior) => {
    if (!countryFilter.includes(junior.location.country)) {
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
      <div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: 1 }}>
            {isFetching ? (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
            )}
          </Box>
          <Box sx={{ width: "50%" }}>
            {isFetching ? (
              <Skeleton width="50%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography>Ted</Typography>
            )}
          </Box>
        </Box>
        {isFetching ? (
          <Skeleton variant="rectangular" width="50%">
            <div style={{ paddingTop: "57%" }} />
          </Skeleton>
        ) : (
          <Image
            src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
            alt=""
          />
        )}
      </div>
    );
  }

  return (
    juniors.length > 1 && (
      <>
        <GeoFilter geoQuery={geoQuery} setGeoQuery={setGeoQuery} countryFilter={countryFilter} />
        <StackFilter stackQuery={stackQuery} setStackQuery={setStackQuery} stackFilter={stackFilter} />

        <div className="outer-junior-card">
          {juniors
            .filter((junior) => (geoQuery.length === 0 ? true : junior.location.country === geoQuery))
            .filter((junior) =>
              stackQuery.length === 0 ? true : stackQuery.every((skill) => junior.skills.includes(skill))
            )
            .map((junior) => {
              return <JuniorCard key={junior._id} junior={junior} userDB={userDB} setUpdated={setUpdated} />;
            })}
        </div>
      </>
    )
  );
};
export default JuniorList;
