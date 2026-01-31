const PlaylistButtons = ({data,active,setActive,onNavigate,setCurrentPlaylist}) => {
    function handlebutton(data) {
        setActive(data.name)
        onNavigate(data.name)
        setCurrentPlaylist(data)
    }

    return(
        <button className={active === data.name? "navbutton active" : "navbutton"}
        onClick={() => handlebutton(data)}>{data.name}</button>
    );
}
export default PlaylistButtons;