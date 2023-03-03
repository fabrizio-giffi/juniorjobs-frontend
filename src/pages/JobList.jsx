import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5005/api/posts";

function JobList() {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    const response = await axios.get(`${API_URL}`);
    setJobList(response.data);
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
      <ul>
        {jobList.map((post) => {
          return (
            <div key={post._id}>
              <li>{post.title}</li>
              <Link to={`/jobs/${post._id}`}>
                <button type="button">See details</button>
              </Link>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default JobList;
