import { useState, useEffect } from "react";
import Cardlongplaylist from "../cards/Cardlongplaylist";

const PlaylistTab = ({set_player_function, setcurrentsong,playlist}) => {
    
    const [songdata, setSongdata] = useState([]);
    const [dofetch, setdofetch] = useState("");

  useEffect(() => {
    if (!playlist) return;

    const fetchplaylist = async () => {
      const res = await fetch("http://127.0.0.1:5000/playlistitems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlist_id: playlist.id })
      });

      const data = await res.json();


      if (!res.ok) {
        console.error("Failed to fetch playlist");
        return;
      }
      setSongdata(data.results);

    };

    fetchplaylist();
  }, [playlist,dofetch]);

    return ( 
      <div className="recentlyplayed">
        <h1>{playlist.name}</h1>
        <Cardlongplaylist details={songdata} set_player_function={set_player_function} setcurrentsong = {setcurrentsong} refresh={setdofetch} playlist={playlist}/>
      </div>
        
     );
}
 
export default PlaylistTab;