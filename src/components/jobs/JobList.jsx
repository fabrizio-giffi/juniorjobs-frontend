import { Alert, Box, Container, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CompanyFilter from "../filters/CompanyFilter";
import GeoFilter from "../filters/GeoFilter";
import FieldFilter from "../filters/FieldFilter";
import JobPostCard from "./JobPostCard";
import { AuthContext } from "../../context/auth.context";

const api_URL = import.meta.env.VITE_API_URL;
let filtered = [];

function JobList() {
  const { user } = useContext(AuthContext);
  const [jobList, setJobList] = useState([]);
  const [userDB, setUserDB] = useState({});
  const [updated, setUpdated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [geoQuery, setGeoQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [fieldQuery, setFieldQuery] = useState("");

  const fetchData = async () => {
    const jobList = await axios.get(`${api_URL}/posts`);
    setJobList(jobList.data.reverse());
    if (user) {
      const fetchedUser = await axios.get(`${api_URL}/user/${user.id}`);
      setUserDB(fetchedUser.data);
    }
    setIsFetching(false);
    setUpdated(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [updated]);

  //FILTERS
  const countryFilter = [];
  jobList.forEach((post) => {
    if (!countryFilter.includes(post.address.country) && post.address?.country !== "") {
      countryFilter.push(post.address.country);
    }
  });

  const companyFilter = [];
  jobList.forEach((post) => {
    if (!companyFilter.includes(post.company.name)) {
      companyFilter.push(post.company.name);
    }
  });

  if (isFetching) {
    return (
      <>
        <Container
          className="filterCtn"
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton sx={{ mb: 8 }} variant="rounded" width="500px" height="40px" />
          <Box className="column-break" width="lg" sx={{ display: "flex", flexWrap: "nowrap", gap: 3, mb: 3 }}>
            <Skeleton variant="rounded" width="370px" height="300px" />
            <Skeleton variant="rounded" width="370px" height="300px" />
          </Box>
          <Box width="lg" sx={{ display: "flex", gap: 3 }}>
            <Skeleton variant="rounded" width="370px" height="300px" />
            <Skeleton variant="rounded" width="370px" height="300px" />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <Box sx={{ mb: 10 }}>
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
        <CompanyFilter companyQuery={companyQuery} setCompanyQuery={setCompanyQuery} companyFilter={companyFilter} />
        <FieldFilter fieldQuery={fieldQuery} setFieldQuery={setFieldQuery} />
      </Container>
      <Container component="main" maxWidth="lg">
        <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4" gutterBottom>
          Current job posts
        </Typography>
        <Box sx={{ display: "flex", flexFlow: "row wrap", gap: "2rem", justifyContent: "center" }}>
          {
            (filtered = jobList
              .filter((post) => (geoQuery.length === 0 ? true : post.address.country === geoQuery))
              .filter((post) => (companyQuery.length === 0 ? true : post.company.name === companyQuery))
              .filter((post) => (fieldQuery === "" ? true : post.field === fieldQuery))
              .map((post) => {
                return jobList.length > 0 ? (
                  <JobPostCard key={post._id} post={post} userDB={userDB} setUpdated={setUpdated} />
                ) : (
                  <p>{key}</p>
                );
              }))
          }
          {filtered.length === 0 && (
              <Alert severity="info" sx={{ justifySelf: "end" }}>
                No job post matches your search, try again with different filters.
              </Alert>
            )}
        </Box>
      </Container>
    </Box>
  );
}

export default JobList;
