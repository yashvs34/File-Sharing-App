import { useState } from "react";
import DarkVeil from './DarkVeil';
import { useRecoilState } from "recoil";
import signinState from "../atoms/signinStateAtom";
import { useNavigate } from "react-router-dom";

function LoginComponent ()
{
    const [loginComponent, setLoginComponent] = useState("signin");
    const [emailInput, setEmailInput] = useState("signin");
    const [passwordInput, setPasswordInput] = useState("signin");
    const [currentState, setCurrentState] = useRecoilState(signinState);
    const navigate = useNavigate();


    return (
        <>
            <div style={{position: "fixed",top: 0,left: 0,width: "100%",height: "100%",zIndex: 0,pointerEvents: "none"}}>
                <DarkVeil />
            </div>

            <div className="signin-page" style={{ position: "relative", zIndex: 1 }}>
                <div className="signin-container">
                    <div className="signin-text">
                        {loginComponent === "signin" ? "Log in to your account" : "Create a new account"}
                    </div>

                    <div className="signin-welcome-text">
                        {loginComponent === "signin" ? "Welcome back! Please enter your details." : "Welcome! Please enter your details."}
                    </div>

                    <div className="signup-login-tab">
                        <button className="signup-tab" onClick={() => {
                            setLoginComponent("signup");
                        }}>
                            Sign up
                        </button>

                        <button className="login-tab" onClick={() => {
                            setLoginComponent("signin");
                        }}>
                            Login
                        </button>
                    </div>

                    <div className="signin-input-container">
                        <div>
                            <input type="email" style={{background:"transparent"}} placeholder="Enter your email" className="signin-email-input" onChange={(event) => {
                                setEmailInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="password" style={{background:"transparent"}} placeholder="Enter password" className="signin-password-input" onChange={(event) => {
                                setPasswordInput(event.target.value);
                            }} />
                        </div>
                    </div>

                    <button className="signin-button" onClick={async () => {
                        setCurrentState({
                            signinState : "Signing you in..."
                        });

                        const response = await axios.post(`http://localhost:8081/${loginComponent}`, {
                            userName : emailInput,
                            password : passwordInput
                        });

                        if (response.data.message === "Invalid username")
                        {
                            setCurrentState({
                                signinState : "No user found!"
                            });
                            return;
                        }
                        else if (response.data.message === "Invalid password")
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
                            navigate('/dashboard');
                            return;
                        }
                        else if (response.data.message === "User signin successfull")
                        {
                            setCurrentState({
                                signinState : "Signin successfull"
                            });
                            localStorage.setItem("authToken", response.data.token);
                            navigate('/dashboard');
                            return;
                        }
                        else if (response.data.message === "Invalid inputs")
                        {
                            setCurrentState({
                                signinState : "Invalid inputs!"
                            });
                            return;
                        }
                        else if (response.data.message === "User already exists")
                        {
                            setCurrentState({
                                signinState : "Account already exists, please Signin"
                            });
                            return;
                        }
                        else if (response.data.message === "Account created successfully")
                        {
                            setCurrentState({
                                signinState : "Account created successfully!"
                            });
                            setLoginComponent("signin");
                            return;
                        }

                        setCurrentState({
                            signinState : "Some error occurred"
                        });
                        return;
                    }}>
                        Submit
                    </button>

                    <div className={currentState.signinState === "INITIAL" ? "initial-current-state" : "signin-current-state"}>{currentState.signinState}</div>
                    
                </div>
            </div>
        </>
    )
}

export default LoginComponent