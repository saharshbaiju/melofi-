import { useEffect } from "react";

const Globalplayer = ({song,audioElem,setCurrentSong,username}) => {

    useEffect(()=>{
        if (!song) return;
        async function addsongrecently () {
            const sqlDetails ={
            track_id:song.trackId,
            track_name:song.trackName,
            artist_name:song.artistName,
            artwork_url:song.artworkUrl100?.replace("100x100", "600x600"),
            preview_url:song.previewUrl,
            username:username
            };
    
            const res = await fetch("http://127.0.0.1:5000/addtorecentlyplayed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sqlDetails)
            });

            const returnmsg = await res.json();

            if (res.ok){
                console.log(returnmsg.msg)
                console.log("playlist recorded")
            }
        }
        addsongrecently()
    },[song?.trackId]);


    if (!song) return <audio ref={audioElem} />;
    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;

        setCurrentSong({...song,"progress":ct/duration *100,"length":duration})
    }
     

    return(
    <>
        <audio src={song.previewUrl} ref={audioElem} onTimeUpdate={onPlaying}></audio>
    </>
    )
}
 
export default Globalplayer;