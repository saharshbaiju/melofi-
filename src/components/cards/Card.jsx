const Cards = ({ details = [] ,set_player_function,setcurrentsong}) => {
    const handleonclick = (detail) => {
        set_player_function(true)
        setcurrentsong(detail)
        

    }   
    
    return (  
        <div className="middlecards">
            {details.map((detail)=>(
                <div className="card-preview"key={detail.trackId} onClick={()=>handleonclick(detail)}>
                    <img src={detail.artworkUrl100.replace("100x100","600x600")} className="image-properties"/>
                    <h3>{detail.trackName}</h3>
                    <h4>{detail.artistName}</h4>

                </div>
            ))}
        </div>
    );
}
 
export default Cards;

