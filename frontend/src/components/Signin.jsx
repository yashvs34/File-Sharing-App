import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import axios from "axios"

function Signin ()
{
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [currentState, setCurrentState] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <div className="signin-page">
                <div className="signin-container">
                    <div className="signin-text">
                        Signin
                    </div>

                    <div className="signin-input-container">
                        <div>
                            <input type="email" placeholder="Enter email" className="signin-email-input" onKeyDown={(event) => {
                                setEmailInput(event.target.value);
                            }} />
                        </div>

                        <div>
                            <input type="password" placeholder="Enter password" className="signin-password-input" onKeyDown={(event) => {
                                setPasswordInput(event.target.value);
                            }} />
                        </div>
                    </div>

                    {<div className="current-state">{currentState}</div>}

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
                        else if (response.data === "Valid user")
                        {
                            setCurrentState("Signin successfull");
                            navigate('/dashboard');
                            return;
                        }
                        console.log(response.data);
                        setCurrentState("Some error occurred");
                        return;
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signin