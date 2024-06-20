import { useEffect } from "react";
import rjala from "../rjala"
import { useParams } from 'react-router-dom';

let color = "ffffff";
const findPersonByName = (name) => {
    const person = rjala.find(person => person.name === name);
    if (!person) {
      console.log(`No person found with the name ${name}`);
      return null;
    }
    return person;
};

function PersonStats() {
  const { name } = useParams();
  const rajl = findPersonByName(name)
  
  useEffect(() => {
    switch (rajl.placement) {
      case 1:
        color = "#fce703";
        break;
      case 2:
        color = "#8a8a8a";
        break;
      case 3:
        color = "#CD7F32";
        break;
      default:
        color = "#ffffff";
    }
  })
  return (
    <div className="person-stats">
        <h2 className='person-title'>{name}</h2>
        <div><img src={rajl.img} className="card-image"></img></div>
        <p>Rank fles vocal: <a style={{color: color}}>{rajl.placement}</a></p>
        <p>{rajl.desc2}</p>
    </div>
  )
}

export default PersonStats