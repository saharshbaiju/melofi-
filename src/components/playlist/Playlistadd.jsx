const Playlistadd = ({data,active,setActive,song}) => {


    async function handlebutton () {
        const sqlDetails ={
        playlist_id:data.id,
        track_id:song.trackId,
        track_name:song.trackName,
        artist_name:song.artistName,
        artwork_url:song.artworkUrl100?.replace("100x100", "600x600"),
        preview_url:song.previewUrl
        };
        setActive(data.name)
        const res = await fetch("https://melofi-production.up.railway.app/addtoplaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sqlDetails)
        });

        const returnmsg = await res.json();

        if (res.ok){
            alert(returnmsg["msg"]);
            return
        }
    }

    return(
        <button className={active === data.name? "navbutton active" : "navbutton"}
        onClick={() => handlebutton()}>{data.name}</button>
    );
}
export default Playlistadd;