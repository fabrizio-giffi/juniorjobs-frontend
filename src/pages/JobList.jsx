import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import JobPostCard from "../components/JobPostCard";
const API_URL = "http://localhost:5005/api/posts";

function JobList() {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    const response = await axios.get(`${API_URL}`);
    setJobList(response.data.reverse());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>JobList</h2>
      <Box sx={{ display: "flex", flexFlow: "row wrap", gap: "2rem", justifyContent: "center" }}>
        {jobList.map((post) => {
          return <JobPostCard key={post._id} post={post} />;
        })}
      </Box>
    </>
  );
}

export default JobList;
