import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DarkVeil from './DarkVeil';

function Signup ()
{
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [firstNameInput, setFirstNameInput] = useState();
    const [lastNameInput, setLastNameInput] = useState();
    const [currentState, setCurrentState] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <div style={{position: "fixed",top: 0,left: 0,width: "100%",height: "100%",zIndex: 0,pointerEvents: "none"}}>
                <DarkVeil />
            </div>
            <div className="signup-page" style={{ position: "relative", zIndex: 1 }}>
                <div className="signup-container">
                    <div className="signup-text">
                        Signup
                    </div>

                    <div className="signup-input-container">
                        <div>
                            <input type="email" placeholder="Enter email" className="signup-email-input" onChange={(event) => {
                                setEmailInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="password" placeholder="Enter password" className="signup-password-input" onChange={(event) => {
                                setPasswordInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="text" placeholder="Enter Firstname" className="signup-firstName-input" onChange={(event) => {
                                setFirstNameInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="text" placeholder="Enter Lastname" className="signup-lastName-input" onChange={(event) => {
                                setLastNameInput(event.target.value);
                            }} />
                        </div>
                    </div>

                    {<div className="signup-current-state">{currentState}</div>}

                    <button className="signup-button" onClick={async () => {
                        setCurrentState("Creating account...");

                        const response = await axios.post('http://localhost:8081/signup', {
                            userName : emailInput,
                            password : passwordInput,
                            firstName : firstNameInput,
                            lastName : lastNameInput
                        });

                        if (response.data === "Invalid inputs")
                        {
                            setCurrentState("Invalid inputs!");
                            return;
                        }
                        else if (response.data === "User already exists")
                        {
                            setCurrentState("Account already exists, please Signin");
                            return;
                        }
                        else if (response.data === "Account created successfully")
                        {
                            setCurrentState("Account created successfully!");
                            navigate('/signin');
                            return;
                        }

                        setCurrentState("Some error occurred");
                        return;
                    }}>
                        Submit
                    </button>

                    <div className="signin-in-signup">
                        <div className="signin-in-signup-text">
                            Already have an account?
                        </div>
                        <div className="signin-in-signup-link" onClick={() => {
                            navigate('/signin');
                        }}>
                            Signin
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup