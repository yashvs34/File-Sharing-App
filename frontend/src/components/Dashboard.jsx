import { useRecoilState } from "recoil"
import { authState } from "../atoms/authAtom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import axios from 'axios';
import FileData from "./FileData";

function Dashboard ()
{
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useRecoilState(userState);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const dataFunction = async () => {
            const data = await axios.post('http://localhost:8081/user', {
                userName : user.userName,
                token : localStorage.getItem("authToken")
            });
            
            setUserData(data.data);
            console.log(userData);
        }
        
        dataFunction();
    }, []);

    return (
        <div className="dashboard">
            <div className="file-input-container">
                <input type="file" />
            </div>

            <div className="files-container">
                {userData.length > 0 ? userData.map((userData, index) => (
                    <FileData key={index} userData={userData}/>
                )) : <>No files uploaded</>}
            </div>
        </div>
    )
}

export default Dashboard