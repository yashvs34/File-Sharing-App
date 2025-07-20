import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import { useEffect } from "react";
import { userState } from "../atoms/userAtom";

function Signin ()
{
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [currentState, setCurrentState] = useState("");
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useRecoilState(userState);

    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("authToken");
    
            if (token)
            {
                const response = await axios.post('http://localhost:8081/signin', {
                    "token" : token
                });

                if (response.data.message === "Valid user")
                {
                    setCurrentState("Signin successfull");
                    setAuth({
                        isLoggedIn : true
                    });
                    setUser({
                        user : response.data.userData
                    });
                }
            }

            return;
        }

        verifyToken();
    }, []);

    return (
        <>
            <div className="signin-page">
                <div className="signin-container">
                    <div className="signin-text">
                        Signin
                    </div>

                    <div className="signin-input-container">
                        <div>
                            <input type="email" placeholder="Enter email" className="signin-email-input" onChange={(event) => {
                                setEmailInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="password" placeholder="Enter password" className="signin-password-input" onChange={(event) => {
                                setPasswordInput(event.target.value);
                            }} />
                        </div>
                    </div>

                    {<div className="signin-current-state">{currentState}</div>}

                    <button className="signin-button" onClick={async () => {
                        setCurrentState("Signing you in...");

                        const response = await axios.post('http://localhost:8081/signin', {
                            userName : emailInput,
                            password : passwordInput
                        });

                        if (response.data === "Invalid username")
                        {
                            setCurrentState("No user found!");
                            return;
                        }
                        else if (response.data === "Invalid password")
                        {
                            setCurrentState("Invalid password!");
                            return;
                        }
                        else if (response.data.message === "Valid user")
                        {
                            setCurrentState("Signin successfull");
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
                            setCurrentState("Signin successfull");
                            localStorage.setItem("authToken", response.data.token);
                            setAuth({
                                isLoggedIn : true
                            });
                            setUser({
                                user : response.data.userData
                            });
                            return;
                        }

                        setCurrentState("Some error occurred");
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