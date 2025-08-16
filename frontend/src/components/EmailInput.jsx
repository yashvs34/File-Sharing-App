import { useState } from "react";


function EmailInput ()
{
    const [emailInput, setEmailInput] = useState();
    
    return (
        <div>
            <input type="email" style={{background:"transparent"}} placeholder="Enter your email" className="email-input" onChange={(event) => {
                setEmailInput(event.target.value);
            }} />
        </div>
    )
}

export default EmailInput