import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useState } from "react";
import axios from "axios";

function FileShareComponent ({userData})
{
    const [user, setUser] = useRecoilState(userState);
    const [email, setEmail] = useState();

    return (
        <>
            <div className="sharing-component">
                Enter Email to send to
            </div>
            <input type="text" name="" id="" onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <div className="share-button" onClick={() => {
                axios.post('http://localhost:8081/send', {
                    "token" : localStorage.getItem("authToken"),
                    "emailFrom" : "yashvardhansingh232@gmail.com",
                    "emailTo" : email,
                    "link" : userData.shortUrl,
                    "fileName" : userData.fileName,
                    "size" : userData.size 
                });
            }}>Send</div>
        </>
    )
}

export default FileShareComponent