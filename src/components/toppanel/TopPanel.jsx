import { useState,useEffect } from "react";
import {Link} from "react-router-dom";


const TopPanel = ({setDetails,currentUser}) => {
    const [query,setquery] = useState("trending...");
    useEffect(()=>{
        if (!query.trim()) return;
        const timer = setTimeout(()=>{
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=25`)
            .then(res => res.json())
            .then(data => setDetails(data.results))
            .catch(err => console.error(err))
        },400);

        return ()=>clearTimeout(timer);
    },[query]);

    return ( 
        <div className="top-panel">
        
            <input type="search" 
            placeholder="Search songs,artist ..."
            value={query} 
            onChange={(e)=> setquery(e.target.value)} 
            onClick={()=>setquery("")}
            className="search" />
   
            <div className="logout">
            <div className="profile">
                <h3>{currentUser}</h3>
                <Link to ='/'><img src="../../../icon/logout.svg" alt="logout" className="logout-button" /></Link>
            </div>
            </div>
        </div>
     );
}
 
export default TopPanel;