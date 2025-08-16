import { useState } from "react";

function PasswordInput ()
{
    const [passwordInput, setPasswordInput] = useState();

    return (
        <div>
            <input type="email" style={{background:"transparent"}} placeholder="Enter your password" className="password-input" onChange={(event) => {
                setPasswordInput(event.target.value);
            }} />
        </div>
    )
}

export default PasswordInput