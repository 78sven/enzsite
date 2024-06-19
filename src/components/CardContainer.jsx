import Card from "./Card"
import rjala from "../rjala.js"

function CardContainer() {
  return (
    <div className="card-container">
        <h1>Afrad enz:</h1>
        {rjala.map(rajal => 
        <Card name={rajal.name}
        desc={rajal.desc}
        img={rajal.img}
        key={rajal.id}
        />)}
    </div>
  )
}

export default CardContainer