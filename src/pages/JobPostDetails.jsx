import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const API_URL = "http://localhost:5005/api/posts/";

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

function JobPostDetails() {
  const [jobPost, setJobPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dateCreated, setDateCreated] = useState();
  const { id } = useParams();

  const fetchPost = async () => {
    const response = await axios.get(`${API_URL}${id}`);
    setJobPost(response.data);
    setIsLoading(false);
    const dateObj = new Date(response.data.createdAt);
    setDateCreated(dateObj);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(dateCreated);
  return (
    <>
      <div>JobPostDetails</div>
      <h2>{jobPost.title}</h2>
      <p>{jobPost.description.jobtype}</p>
      <ul>
        {jobPost.stack.map((element) => (
          <li key={element}>{element}</li>
        ))}
      </ul>
      <p>HR Contact: {jobPost.email}</p>
      <Link>
        {/* Link to the company when available */}
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
        €<span>{jobPost.salaryRange.minimum}</span> - €<span>{jobPost.salaryRange.maximum}</span>{" "}
      </p>
      <p>Created: {dateCreated.toLocaleDateString("en-US", options)}</p>
    </>
  );
}

export default JobPostDetails;
