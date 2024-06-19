import rjala from "../rjala"
import { useParams } from 'react-router-dom';

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
  return (
    <div className="person-stats">
        <img src={rajl.img} className="card-image"></img>
        <p>Rank fles vocal: {rajl.placement}</p>
        <p>{rajl.desc2}</p>

    </div>
  )
}

export default PersonStats