// import "../css/login.css"

// function LoginComplete(){

//     return(
//         <body className="login-background">
            
//             <div className="login-box">
//                 <div className="player-name">
//                     <h1>MeloFi</h1>
//                 </div>
//                 <div>
//                     <button className="login-button">
//                     LOG IN
//                     </button>
//                 </div>
//                 <div>
//                     <button className="signup-button">
//                         SIGN UP
//                     </button>
//                 </div>
                
//             </div>
//         </body>
        
//     )
// }

// export default LoginComplete
import styles from"../../css/loginoptions.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
function LoginOptions() {         
  const navigate = useNavigate();    
  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginBox}>
        <div className={styles.playerName}>
          <h1 className={styles.title}>MeloFi</h1>
        </div>
        <div className={styles.glassBtn}>
            <button onClick={() => navigate("/login")} className={styles.loginButton}>
                LOG IN
            </button>
        </div>
     
        <div className={styles.glassBtn}>
            <button onClick={() => navigate("/signup")} className={styles.signupButton}>
                SIGN UP
            </button>
        </div>
      </div>
    </div>
  )
}

export default LoginOptions
