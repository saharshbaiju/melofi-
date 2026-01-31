import { useEffect } from "react"
import Playlistadd from "../playlist/Playlistadd"
const Mainplayer = ({set_player_function,song,audioElem,isplaying,setisplaying,playlists,active,setActive}) => {
    const onclickhandle = () => {
        set_player_function(false)
        
    }
    //  const playpause = () => {
    //     audioElem.current.play()
    //  }

    const playpause = () => {
        if (isplaying){
            setisplaying(false);
        }else{
            setisplaying(true);
        }
        
    }
     
    
      
    // if (isplaying === true) {
    //     audioElem.current.play();
    // }

    useEffect(()=>{
        if(!audioElem.current) return;

        if(isplaying){
            audioElem.current.play();
        }else{
            audioElem.current.pause();
        }
    },[isplaying]);
    
    if (!song) return null;
    return ( 
        <div className="mainplayer">
            <img src="../../../icon/back.svg" onClick={onclickhandle} className="back-button-mainplayer"/>
            <img src={song.artworkUrl100.replace("100x100","600x600")} alt="song.trackName" className="mainplayer-image"/>
            {isplaying === false && <img src="../../../icon/play.svg" onClick={playpause} className="playpause"/>}
            {isplaying === true && <img src="../../../icon/puase.svg" onClick={playpause} className="playpause"/>}
            
            
            <div className="playlist-button-container">
                {playlists.map((playlist)=> (
                    <Playlistadd  
                    data={playlist} 
                    active={active} 
                    setActive = {setActive}
                    key = {playlist.id}
                    song ={song}
                    />))};
            </div>

            

        </div>
     );
}
 
export default Mainplayer;