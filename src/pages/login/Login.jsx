import logincss from "../../css/login.module.css"
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { useState, useEffect } from "react";

function Login({setCurrentUser}){
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        localStorage.setItem("username", username);
        setCurrentUser(username);
    }, [username]);
    

    const handlesubmit = async(e) => {
        e.preventDefault();
        console.log("submitted")

        const res = await fetch("https://amfoss-curriculum-production.up.railway.app/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password}),
        });

        const data = await res.json()

        if (res.ok){
            navigate('/home')
        }else{
            alert(data.error || "login failed try again")
        }


    }
     

    return(
    <div className={logincss.loginBackground}>
        <div className={logincss.loginBox}>

        <div className={logincss.playerName}>
          <h1 className={logincss.title}>MeloFi</h1>
        </div>
        {/* <div className={logincss.inputDetails}> */}
        <form className={logincss.form} onSubmit={handlesubmit}>
            <div className={logincss.inputFeilds}>
                <input type="text" className={logincss.usernameInput} 
                placeholder="username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                required
                />
                <input type="password" className={logincss.passwordInput} 
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <Link to="/forgot-password" className={logincss.forgotPasswordLink}>
                    Forgot password?
                </Link>

            </div>
              
            <button type="submit" className={logincss.loginButton}>
                LOG IN
            </button>
            <p className={logincss.noAccount}>Don't have an account?{" "}<Link to="/signup" className={logincss.signupLink}>Sign up</Link></p>
        </form>
        {/* </div> */}
        
        </div>
    </div>
    )
}

export default Login