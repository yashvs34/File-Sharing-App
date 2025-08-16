import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import { useEffect } from "react";
import { userState } from "../atoms/userAtom";
import signinState from "../atoms/signinStateAtom";
import DarkVeil from './DarkVeil';

function Signin ()
{
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useRecoilState(userState);
    const [currentState, setCurrentState] = useRecoilState(signinState);

    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         const token = localStorage.getItem("authToken");
    
    //         if (token)
    //         {
    //             const response = await axios.post('http://localhost:8081/signin', {
    //                 "token" : token
    //             });

    //             if (response.data.message === "Valid user")
    //             {
    //                 setCurrentState({
    //                     signinState : "Signin successfull"
    //                 });
    //                 setAuth({
    //                     isLoggedIn : true
    //                 });
    //                 setUser({
    //                     user : response.data.userData
    //                 });
    //                 navigate('/dashboard');
    //             }
    //         }

    //         return;
    //     }

    //     verifyToken();
    // }, [auth.isLoggedIn]);

    return (
        <>
            <div style={{position: "fixed",top: 0,left: 0,width: "100%",height: "100%",zIndex: 0,pointerEvents: "none"}}>
                <DarkVeil />
            </div>
            
            <div className="signin-page" style={{ position: "relative", zIndex: 1 }}>
                <div className="signin-container">
                    <div className="signin-text">
                        Login to Your Account
                    </div>

                    <div className="welcome-text">
                        Welcome back! Please enter your details.
                    </div>

                    <div className="signin-input-container">
                        <div>
                            <input type="email" style={{background:"transparent"}} placeholder="Enter email" className="signin-email-input" onChange={(event) => {
                                setEmailInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="password" style={{background:"transparent"}} placeholder="Enter password" className="signin-password-input" onChange={(event) => {
                                setPasswordInput(event.target.value);
                            }} />
                        </div>
                    </div>

                    {<div className="signin-current-state">{currentState.signinState}</div>}

                    <button className="signin-button" onClick={async () => {
                        setCurrentState({
                            signinState : "Signing you in..."
                        });

                        const response = await axios.post('http://localhost:8081/signin', {
                            userName : emailInput,
                            password : passwordInput
                        });

                        if (response.data === "Invalid username")
                        {
                            setCurrentState({
                                signinState : "No user found!"
                            });
                            return;
                        }
                        else if (response.data === "Invalid password")
                        {
                            setCurrentState({
                                signinState : "Invalid password!"
                            });
                            return;
                        }
                        else if (response.data.message === "Valid user")
                        {
                            setCurrentState({
                                signinState : "Signin successfull"
                            });
                            setAuth({
                                isLoggedIn : true
                            });
                            setUser({
                                user : response.data.userData
                            });
                            return;
                        }
                        else if (response.data.message === "User signin successfull")
                        {
                            setCurrentState({
                                signinState : "Signin successfull"
                            });
                            localStorage.setItem("authToken", response.data.token);
                            setAuth({
                                isLoggedIn : true
                            });
                            setUser({
                                user : response.data.userData
                            });
                            return;
                        }

                        setCurrentState({
                            signinState : "Some error occurred"
                        });
                        return;
                    }}>
                        Submit
                    </button>

                    <div className="signup-in-signin">
                        <div className="signup-in-signin-text">
                            Don't have an account?
                        </div>
                        <div className="signup-in-signin-link" onClick={() => {
                            navigate('/signup');
                        }}>
                            Signup
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin