import {useRef} from "react";


const BottomPanel = ({audioElem,currentSong}) => {
    const clickRef = useRef()

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;


        const divprogress = offset /width *100;

        audioElem.current.currentTime = divprogress/100 * currentSong.length;
    }
     


    return ( 
        <div className="bottom-panel">
            <div className="progress-container">
                <div className="progress-wrapper" onClick={checkWidth} ref={clickRef}>
                <div className="progress" style={{ width: `${currentSong?.progress ?? 0}%` }}>

                </div>
            </div>
        </div>
    </div>

     );
}
 
export default BottomPanel;