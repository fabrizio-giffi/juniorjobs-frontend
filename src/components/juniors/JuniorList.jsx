import JuniorCardPublic from "./JuniorCardPublic";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { List, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import GeoFilter from "../filters/GeoFilter";
import FieldFilter from "../filters/FieldFilter";
import { Container } from "@mui/system";
import JuniorCard from "./JuniorCard";
let filtered = [];

const api_URL = import.meta.env.VITE_API_URL;

const JuniorList = () => {
  const { user } = useContext(AuthContext);
  const [juniors, setJuniors] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [userDB, setUserDB] = useState({});
  const [updated, setUpdated] = useState(false);
  const [geoQuery, setGeoQuery] = useState("");
  const [fieldQuery, setFieldQuery] = useState("");
  const [focus, setFocus] = useState();

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

  useEffect(() => {
    setFocus(filtered[0]?.props.children.props.junior);
  }, [fieldQuery, geoQuery]);

  // FILTERS
  const countryFilter = [];
  juniors.forEach((junior) => {
    if (
      typeof junior.location !== "undefined" &&
      !countryFilter.includes(junior.location?.country) &&
      junior.location?.country !== ""
    ) {
      countryFilter.push(junior.location.country);
    }
  });

  return (
    juniors.length > 0 && (
      <Container maxWidth="lg" sx={{ mb: 10, mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isFetching ? (
          <Skeleton variant="rounded" width="80%" height="40px" />
        ) : (
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
            <FieldFilter fieldQuery={fieldQuery} setFieldQuery={setFieldQuery} />
          </Container>
        )}
        {isFetching ? (
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} width="40%" />
        ) : (
          <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4" gutterBottom>
            Available juniors
          </Typography>
        )}
        <Stack
          direction="row"
          sx={{
            borderRadius: "8px",
            bgcolor: "#eaf4f4",
            boxSizing: "border-box",
            mb: 5,
            minWidth: "100%",
          }}
        >
          <List
            disablePadding
            sx={{
              minWidth: "50%",
              display: "flex",
              boxSizing: "border-box",
              flexDirection: "column",
              gap: 2,
              maxHeight: "50vh",
              overflow: "auto",
              p: 4,
            }}
          >
            {
              (filtered = juniors
                // Filter out the juniors that haven't yet set their firstName or lastName
                .filter((junior) => junior.firstName !== "N/A" || junior.lastName !== "N/A")
                .filter((junior) => (geoQuery === "" ? true : junior.location.country === geoQuery))
                .filter((junior) => (fieldQuery === "" ? true : junior.field === fieldQuery))
                .map((junior) => {
                  return isFetching ? (
                    <Skeleton variant="rounded" sx={{ minWidth: "370px", mb: 2 }} height="140px" />
                  ) : (
                    <ListItem sx={{ width: "100%" }} disablePadding key={junior._id} onClick={() => setFocus(junior)}>
                      <JuniorCardPublic
                        fieldQuery={fieldQuery}
                        setFieldQuery={setFieldQuery}
                        setGeoQuery={setGeoQuery}
                        junior={junior}
                        userDB={userDB}
                        setUpdated={setUpdated}
                      />
                    </ListItem>
                  );
                }))
            }
            {filtered.length === 0 && (
              <Typography variant="h6" sx={{ justifySelf: "end" }}>
                No user matches your search, try again with different filters.
              </Typography>
            )}
          </List>
          <JuniorCard
            style={{ width: "100%" }}
            focus={focus || filtered[0]?.props.children.props.junior}
            isFetching={isFetching}
            setFieldQuery={setFieldQuery}
            fieldQuery={fieldQuery}
          />
        </Stack>
      </Container>
    )
  );
};
export default JuniorList;
