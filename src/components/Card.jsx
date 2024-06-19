import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card(props) {
  return ( 
    <Link to={`/person/${props.name}`} relative="path">
      <div className="card">
          <img alt="pfp" src={props.img} className="card-image"></img>
          <h2 className="card-name">{props.name}</h2>
          <p>{props.desc}</p>
      </div>
    </Link>
  )
}
Card.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  img: PropTypes.any
}
export default Card