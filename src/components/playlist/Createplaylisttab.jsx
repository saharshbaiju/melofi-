
const Createplaylisttab = ({currentUser,newPlaylist,setNewPlaylist}) => {

    

    const handlesubmit = async(e) => {
        e.preventDefault();
        console.log(currentUser)
        const res = await fetch("http://127.0.0.1:5000/newplaylist",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({currentUser,newPlaylist}),
        });

        
        const data = await res.json()

        if (res.ok){
            setNewPlaylist("")
        }else{
            alert(data.error)
        }



    }
     

    return ( 
        <div className="create-playlist" >
            <form className="playlist-form" onSubmit={handlesubmit}>
                <input type="text"
                 placeholder="ENTER  NEW PLAYLIST NAME"
                 className="playlist-name-input"
                 value = {newPlaylist}
                 onChange={(e)=>{setNewPlaylist(e.target.value)}}

                 />
                <button type="submit" className="tick"> <img src="../../../icon/tick.svg" alt="" className="image-tick"/></button>
            </form> 
        </div>
    );
}
 
export default Createplaylisttab;