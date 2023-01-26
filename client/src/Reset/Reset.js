import React from "react";
import "./Reset.css"

import iconLogin  from  "../icon/iconLogin.png"


const Reset = () =>{

    let email
    let password

    function post(){
        fetch(`http://localhost:3001/api/forgot`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        }).then(response => {
            return response.text();
        }).then(data => {
            if (data=== "good") {
                localStorage.setItem("password", password)
                window.open("/?month=january", "_self")
            } else {
                alert(data)
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
                    <span className="youEmailText">YOU EMAIL</span>
                    <input  type="email" className="emailInput" onChange={(e)=>{email=e.target.value}}/>
                </div>
                <div className="password">
                    <span className="newPasswordText">NEW PASSWORD</span>
                    <input  type="text" className="passwordInput"  onChange={(e)=>{password=e.target.value}}/>
                </div>

                <div className="registration">
                    <button className="registrationButton" onClick={post}>RESET</button>
                </div>

                <div className="login">
                    <div className="loginItem">
                        <button className="loginButton" onClick={()=>{window.open("/login","_self")}}> <img alt="login" src={iconLogin} className="imgRegistration" /></button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Reset