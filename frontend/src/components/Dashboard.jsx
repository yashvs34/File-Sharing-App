import { useRecoilState } from "recoil"
import { authState } from "../atoms/authAtom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import axios from 'axios';
import FileData from "./FileData";
import Squares from './Squares';

function Dashboard ()
{
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useRecoilState(userState);
    const [userData, setUserData] = useState([]);
    const [uploadedFile, setUploadedFile] = useState();
    const [file, setFile] = useState();
    const [expiry, setExpiry] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const dataFunction = async () => {
            const data = await axios.post('http://localhost:8081/user', {
                userName : user.userName,
                token : localStorage.getItem("authToken")
            });
            
            setUserData(data.data);
            console.log(data.data);  
        }
        
        dataFunction();
    }, []);

    return (
        <>
            <div style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none"}}>
                <Squares speed={0.5} squareSize={40} direction='diagonal' diagonalborderColor='#675151ff' hoverFillColor='#222'/>
            </div>

            <div className="dashboard" style={{ position: "relative", zIndex: 1 }}>
                <div className="upload-file-container" >
                    <div className="file-input-container">
                        <input type="file" className="input-container" onChange={(event) => {
                            setFile(event.target.files[0]);
                        }} />
                        <div className="input-cover" >Upload File</div>
                    </div>
                    <div className="file-expiry-container">
                        <div>Choose expiry date : </div>
                        <input type="date" min={new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]} onChange={(event) => {
                            setExpiry(event.target.value);
                        }}/>
                    </div>
                    <div className="upload-button" onClick={() => {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("expiry", expiry);
                        formData.append("token", localStorage.getItem("authToken"));
                        axios.post('http://localhost:8081/upload', formData, {
                            headers:{
                                "Content-Type": "multipart/form-data",
                            }
                        });
                    }}>
                        Upload
                    </div>
                </div>

                <div className="files-container">
                    {userData.length > 0 ? userData.map((fileInfo, index) => (
                        <FileData key={index} userData={fileInfo}/>
                    )) : <>No files uploaded</>}
                </div>
            </div>
        </>
    )
}

export default Dashboard