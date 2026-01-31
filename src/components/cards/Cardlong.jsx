const Cardlong = ({ details = [] ,set_player_function,setcurrentsong}) => {
    const handleonclick = (detail) => {
    set_player_function(true)
    setcurrentsong(detail)
    }
    return (  
        <div className="bottom-cards">
            {details.map((detail)=>(
                <div className="cardlong-preview" onClick={()=>handleonclick(detail)} key={detail.trackId} >
                    <img src={detail.artworkUrl100.replace("100x100","600x600")} className="image-properties"/>
                    <h3>{detail.trackName}</h3>
                    <h4>{detail.artistName}</h4>
                </div>
            ))};
        </div>
    );
}
 
export default Cardlong;