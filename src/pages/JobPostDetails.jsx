import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JobPostForm from "../components/jobs/JobPostForm";
import { AuthContext } from "../context/auth.context";

const api_URL = import.meta.env.VITE_API_URL;

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

function JobPostDetails() {
  const [jobPost, setJobPost] = useState({});
  const [dateCreated, setDateCreated] = useState();
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);

  const fetchPost = async () => {
    const response = await axios.get(`${api_URL}/posts/${id}`);
    setJobPost(response.data);
    setIsFetching(false);
    const dateObj = new Date(response.data.createdAt);
    setDateCreated(dateObj);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!editing && (
        <>
          {" "}
          <h2>{jobPost.title}</h2>
          <p>{jobPost.description.jobtype}</p>
          <ul>
            {jobPost.stack.map((element) => (
              <li key={element}>{element}</li>
            ))}
          </ul>
          {isLoggedIn ? (
            <>
              {" "}
              <p>HR Contact: {jobPost.email}</p>
              <Link to={`/company/${jobPost.company._id}`}>
                <h4>{jobPost.company.name}</h4>
              </Link>
              <p>
                {jobPost.address.city} - {jobPost.address.country}
              </p>
              <h3>Job Description:</h3>
              <p>{jobPost.description.heading}</p>
              <h3>Your tasks:</h3>
              <p>{jobPost.description.tasks}</p>
              <h3>Your profile:</h3>
              <p>{jobPost.description.requirements}</p>
              <h3>Benefits:</h3>
              <p>{jobPost.description.benefits}</p>
              <h3>Salary range:</h3>
              <p>
                €<span>{jobPost.salaryRange.minimum}</span> - €<span>{jobPost.salaryRange.maximum}</span>
              </p>
              <p>Created: {dateCreated.toLocaleDateString("en-US", options)}</p>{" "}
            </>
          ) : (
            <p>Log in or sign up to see more informations</p>
          )}
        </>
      )}

      {!isLoggedIn ||
        (jobPost.company._id === user?.id && (
          <>
            {!editing && (
              <Button variant="outlined" type="button" onClick={() => setEditing(true)}>
                Edit post
              </Button>
            )}

            {editing && (
              <>
                <h1>Editing</h1>
                <JobPostForm jobPost={jobPost} setEditing={setEditing} isEditing />
              </>
            )}
          </>
        ))}
    </>
  );
}

export default JobPostDetails;
