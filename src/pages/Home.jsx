import CardContainer from "../components/CardContainer.jsx"
import News from "../components/News.jsx"
import Welcome from "../components/Welcome.jsx"

function Home() {
  return (
    <>
        <div className="flex">
            <Welcome/>
            
            <News/>
            <CardContainer/> 
        </div>
            
        
    </>
  )
}

export default Home