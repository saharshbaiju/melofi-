import Cardlong from "../cards/Cardlong";
import { useState,useEffect } from "react";
const Tab = ({heading,set_player_function, setcurrentsong,song,Active_tab,username}) => {

  const [songdata, setSongdata] = useState([]);

  useEffect(() => {
    if (Active_tab!=="home") return;

    const fetchplaylist = async () => {
      const res = await fetch("http://127.0.0.1:5000/recentlyplayed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:username })
      });

      const data = await res.json();


      if (!res.ok) {
        console.error("Failed to fetch playlist");
        return;
      }
      setSongdata(data.results);

    };

    fetchplaylist();
  }, [Active_tab,song]);

    return ( 
      <div className="recentlyplayed">
        <h1>{heading}</h1>
        <Cardlong  details={songdata}  set_player_function={set_player_function} setcurrentsong = {setcurrentsong}/>
      </div>
        
     );
}
 
export default Tab;