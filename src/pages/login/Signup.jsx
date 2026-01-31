import signupcss from "../../css/signup.module.css"
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate()

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (password !== repassword){
            alert("password do not match");
            return;
        }

        const res = await fetch("https://amfoss-curriculum-production.up.railway.app/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password}),
        });


        const data = await res.json();

        if (res.ok) {
        navigate("/login");
        } else {
        alert(data.error || "Signup failed");
        }
    };



     


    return (   
            <div className={signupcss.loginBackground}>
        <div className={signupcss.loginBox}>

        <div className={signupcss.playerName}>
          <h1 className={signupcss.title}>MeloFi</h1>
        </div>
        {/* <div className={signupcss.inputDetails}> */}
        <form className={signupcss.form}>
            <div className={signupcss.inputFeilds}>
                <input type="text" className={signupcss.usernameInput} 
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                />
                <input type="password" className={signupcss.passwordInput} 
                placeholder="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
                <input type="password" className={signupcss.repasswordInput}
                 placeholder="re-enter password"
                 value={repassword}
                 onChange={(e)=>setRepassword(e.target.value)}
                 required
                 />
            </div>
              
            <button onClick={handlesubmit} className={signupcss.loginButton}>
                SIGN UP
            </button>
            <p className={signupcss.noAccount}>Already have an account {" "}<Link to="/login" className={signupcss.signupLink}>Log in</Link></p>
        </form>
        {/* </div> */}
        
        </div>
    </div>
     );
}
 
export default Signup;