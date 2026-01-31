
import { useEffect } from "react"
const Rightsidebar = ({song,audioElem,isplaying,setisplaying}) => {


    const playpause = () => {
    if (isplaying){
        setisplaying(false);
    }else{
        setisplaying(true);
    }}

    useEffect(()=>{
        if(!audioElem.current) return;

        if(isplaying){
            audioElem.current.play();
        }else{
            audioElem.current.pause();
        }
    },[isplaying]);

   

    return ( 
        <div className="rightbar">
            {!song ?(<h4 className="not-playing-message">no song playing currently</h4> ):(
            <>
            <img src={song.artworkUrl100.replace("100x100","600x600")} alt="song.trackName" className="sidebar-image"/>
            {isplaying === false && <img src="../../../icon/play.svg" onClick={playpause} className="sidebar-playpause"/>}
            {isplaying === true && <img src="../../../icon/puase.svg" onClick={playpause} className="sidebar-playpause"/>}
            </>
            )}
        </div>
     );
}
 
export default Rightsidebar;