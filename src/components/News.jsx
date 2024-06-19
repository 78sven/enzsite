import news from "../news.js"

const key = 0
function News() {
  return (
    <div className="news">
        <h1>A5bar enz</h1>
        {news.map(khabr => <p key={khabr.id}>{khabr.date}: {khabr.text}</p>)}
        
    </div>
  )
}

export default News