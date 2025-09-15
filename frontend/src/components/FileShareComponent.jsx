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
            <input type="text" className="email-input" placeholder="Enter Email to send to" name="" id="" onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <div className="share-button" onClick={() => {
                axios.post('https://swiftly-backend.yashvs34.me/send', {
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