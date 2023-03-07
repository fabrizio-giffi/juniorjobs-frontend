import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import JobPostCard from "../components/JobPostCard";
import { AuthContext } from "../context/auth.context";
const API_URL = "http://localhost:5005/api/";

function JobList() {
  const { user } = useContext(AuthContext);
  const [jobList, setJobList] = useState([]);
  const [userDB, setUserDB] = useState({});
  const [updated, setUpdated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [geoQuery, setGeoQuery] = useState("");
  const [stackQuery, setStackQuery] = useState([]);

  const fetchData = async () => {
    const jobList = await axios.get(`${API_URL}posts`);
    setJobList(jobList.data.reverse());
    const fetchedUser = await axios.get(`${API_URL}user/${user.id}`);
    setUserDB(fetchedUser.data);
    setIsFetching(false);
    setUpdated(false);
  };

  useEffect(() => {
    console.log("User in JobList.jsx", user);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [updated]);

  const countryFilter = [];
  jobList.forEach((post) => {
    if (!countryFilter.includes(post.address.country)) {
      countryFilter.push(post.address.country);
    }
  });

  const stackFilter = [];
  jobList.forEach((post) => {
    post.stack.forEach((stack) => {
      if (!stackFilter.includes(stack)) {
        stackFilter.push(stack);
      }
    });
  });

  // console.log(countryFilter);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>JobList</h2>
      <Box>
        <TextField
          style={{ minWidth: "120px" }}
          type="text"
          onChange={(event) => setGeoQuery(event.target.value)}
          id="outlined-basic"
          label="Country"
          defaultValue={""}
          variant="outlined"
          select
        >
          {countryFilter.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={() => setGeoQuery("")}>Remove filter</Button>
      </Box>
      <Box>
        {/* <Autocomplete
          multiple
          id="tags-outlined"
          options={stackFilter}
          getOptionLabel={(option) => option}
          defaultValue={[]}
          filterSelectedOptions
          onChange={(event) => {
            console.log("EVENT LOOKS LIKE THIS", event.target.firstChild.data);
            setStackQuery([...stackQuery, event.target.firstChild.data]);
          }}
          renderInput={(params) => <TextField {...params} label="Stacks" placeholder="Stack" />}
        /> */}
        <Button onClick={() => setGeoQuery("")}>Remove filter</Button>
      </Box>
      <Box sx={{ display: "flex", flexFlow: "row wrap", gap: "2rem", justifyContent: "center" }}>
        {jobList
          .filter((post) => (geoQuery.length === 0 ? true : post.address.country === geoQuery))
          // .filter((post) => post.stack.some(stack => stackFilter.includes(stack)) )
          .map((post) => {
            return <JobPostCard key={post._id} post={post} userDB={userDB} setUpdated={setUpdated} />;
          })}
      </Box>
    </>
  );
}

export default JobList;
