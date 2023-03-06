import { Link } from "react-router-dom";
import "./JuniorCard.css";

const JuniorCard = ({ junior }) => {
  return (
    <div className="card">
      <div className="image-outer">
        <img
          src={junior.profilePic}
          alt={`${junior.firstName} ${junior.lastName}`}
        />
      </div>
      <div className="junior-name">
        <h5>{junior.firstName}</h5>
        <h5>{junior.lastName}</h5>
      </div>
      <div className="skills">
        <h5>
          <ul>
            {junior.skills.map((skill) => {
              return <li key={skill}>{skill}</li>;
            })}
          </ul>
        </h5>
      </div>
      <div className="country">
        <h5>{junior.location.country}</h5>
        <h5><Link to={`/junior/${junior._id}`}>
        details
        </Link></h5>
      </div>
    </div>
  );
};

export default JuniorCard;
