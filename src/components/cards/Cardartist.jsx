const Cardartist = ({ details = [] ,set_player_function,setcurrentsong}) => {
    const handleonclick = (detail) => {
    set_player_function(true)
    setcurrentsong(detail)
    }

    return (  
        <div className="bottom-cards">
            {details.map((detail)=>(
                    <div className="cardlong-preview" onClick={()=>handleonclick(detail)} >
                    <img src={detail.trackId} className="image-properties"/>
                    <h3>{detail.artistName}</h3>
                </div>
            ))};
        </div>
    );
}
 
export default Cardartist;