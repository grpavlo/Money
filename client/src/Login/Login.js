import React from "react";
import "./Login.css"
import iconLogin  from  "../icon/iconLogin.png"


const Login = () =>{

    let email
    let password

    function post(){
        fetch(`http://localhost:3001/api/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        }).then(response => {
            return response.text();
        }).then(data => {
            if (JSON.parse(data).m === "good") {
                localStorage.setItem("email", email)
                localStorage.setItem("password", password)
                localStorage.setItem("id",JSON.parse(data).a)
                window.open("/?month=january", "_self")
            } else {
                alert(JSON.parse(data).m)
            }
        });
    }

    return(
        <div className="main">

            <div className="form">

                <div className="back">
                    <div className="emailBack"></div>
                    <div className="passwordBack"></div>
                    <div className="registrationBack"></div>
                    <div className="loginBack"></div>
                </div>

                <div className="background"></div>


                <div className="email">
                    <span className="emailText">EMAIL</span>
                    <input  type="email" className="emailInput" onChange={(e)=>{email=e.target.value}}/>
                </div>
                <div className="password">
                    <span className="passwordText">PASSWORD</span>
                    <input  type="text" className="passwordInput"  onChange={(e)=>{password=e.target.value}}/>
                </div>

                <div className="registration">
                    <button className="registrationButton" onClick={post}>LOGIN</button>
                </div>

                <button className="forgot" onClick={()=>{window.open("/forgot","_self")}}>Forgot your password?</button>

                <div className="login">
                    <div className="loginItem">
                        <button className="loginButton" onClick={()=>{window.open("/registration","_self")}}> <img alt="login" src={iconLogin} className="imgRegistration" /></button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Login