const Cardlongplaylist = ({ details = [] ,set_player_function,setcurrentsong,refresh,playlist}) => {
    const handleonclick = (detail) => {
    set_player_function(true)
    setcurrentsong(detail)
    }





    async function handledelete (detail) {
        const res = await fetch("http://127.0.0.1:5000/playlistitemsdelete",{
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({trackId:detail.trackId,playlistId:playlist.id})
        });
        const data = await res.json();

        if (res.ok){
            console.log("deleted")
        }else{
            alert(data.msg)
        }

        refresh(detail.trackId)
    };
    return (  
        <div className="bottom-cards" >
            {details.map((detail)=>(
                <div className="cardlong-preview" onClick={()=>handleonclick(detail)} key={detail.trackId} >
                    <img src={detail.artworkUrl100.replace("100x100","600x600")} className="image-properties"/>
                    <h3>{detail.trackName}</h3>
                    <h4>{detail.artistName}</h4>
                    <button className="button-delete" onClick={(e)=>{ e.stopPropagation(); handledelete(detail)}}>delete</button>
                </div>
            ))};
        </div>
    );
}
 
export default Cardlongplaylist;