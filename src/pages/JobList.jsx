import { Autocomplete, Avatar, Box, Button, MenuItem, Skeleton, TextField, Typography } from "@mui/material";
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
    if (user) {
      const fetchedUser = await axios.get(`${API_URL}user/${user.id}`);
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

  // const handleStack = (event) => {
  //   console.log(event.target.innerText);
  //   if (typeof event.target.innerText !== "undefined") {
  //     setStackQuery([...stackQuery, event.target.innerText]);
  //   } else {
  //     console.log(event.target);
  //     const toDelete = event.target.parentNode.parentNode.childNodes[0].innerText;
  //     const index = stackQuery.indexOf(toDelete);
  //     const queryDelete = stackQuery.splice(index, 1);
  //     console.log("Array after splicing", queryDelete);
  //     setStackQuery([...queryDelete]);
  //   }
  // };

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

  console.log(stackQuery);

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
        <Autocomplete
          multiple
          id="tags-outlined"
          options={stackFilter}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          value={[...stackQuery]}
          onChange={(event) => setStackQuery([...stackQuery, event.target.innerText])}
          renderInput={(params) => {
            return <TextField {...params} label="Stacks" placeholder="Stack" />;
          }}
        />
        <Button onClick={() => setStackQuery([])}>Remove filter</Button>
      </Box>

      <Box sx={{ display: "flex", flexFlow: "row wrap", gap: "2rem", justifyContent: "center" }}>
        {jobList
          .filter((post) => (geoQuery.length === 0 ? true : post.address.country === geoQuery))
          .filter((post) => (stackQuery.length === 0 ? true : stackQuery.every((stack) => post.stack.includes(stack))))
          .map((post) => {
            return <JobPostCard key={post._id} post={post} userDB={userDB} setUpdated={setUpdated} />;
          })}
      </Box>
    </>
  );
}

export default JobList;
