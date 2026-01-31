import "./sidebar.css"
import PlaylistButtons from "../playlist/PlaylistButtons";

import { useEffect, useState } from "react"



export default function Sidebar({onNavigate,newPlaylist,currentUser,setCurrentPlaylist,playlists,setPlaylists,active,setActive}){


  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch("http://127.0.0.1:5000/playlistsbutton", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser }),
      });

      const data = await res.json();
      setPlaylists(data);
    };

    fetchPlaylists();
    }, [newPlaylist, currentUser]);
  

    
    const handleNavigation = (tab_name) => {
        setActive(tab_name);
        onNavigate(tab_name);

        

    }

    return (
            <div className="side bar glass">
                <div className="logo" ><p>MeloFi</p></div>

                <button
                className={active === "home" ? "navbutton active" : "navbutton"}
                onClick={() => handleNavigation("home")}>
                    HOME
                </button>


                <button className={active === "new-playlist" ? "navbutton active" : "navbutton"}
                onClick={() => handleNavigation("new-playlist")}>
                    NEW PLAYLIST +
                </button>


            <div className="buttons">
                  {playlists.map((playlist) => (
                    <PlaylistButtons
                    key={playlist.id}
                    data={playlist}
                    active={active}
                    setActive={setActive}
                    onNavigate={onNavigate}
                    setCurrentPlaylist ={setCurrentPlaylist}
                    />
                ))}

            </div>



                
        </div>
    )
}