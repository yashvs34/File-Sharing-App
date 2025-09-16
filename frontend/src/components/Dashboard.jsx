import { useRecoilState } from "recoil"
import { authState } from "../atoms/authAtom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import axios from 'axios';
import FileData from "./FileData";
import LiquidEther from './LiquidEther';
import RotatingComponent from './RotatingComponent'

function Dashboard ()
{
    const [user, setUser] = useRecoilState(userState);
    const [userData, setUserData] = useState([]);
    const [optionClicked, setOptionClicked] = useState(false);
    const [file, setFile] = useState();
    const [expiry, setExpiry] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const dataFunction = async () => {
            const data = await axios.post('https://swiftly-backend.yashvs34.me/user', {
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
            <div style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 0 }}>
                <LiquidEther colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]} mouseForce={15} cursorSize={100} isViscous={false} viscous={30} iterationsViscous={32} iterationsPoisson={32} resolution={0.5} isBounce={false} autoDemo={true} autoSpeed={0.5} autoIntensity={2.2} takeoverDuration={0.25} autoResumeDelay={3000} autoRampDuration={0.6} />
            </div>


            <div className="dashboard" style={{ position: "relative", zIndex: 1 }}>

                <div className="upload-file-container" >
                    {/* <img src={optionClicked ? `x-button.png` : `option.png`} className="option-image" onClick={() => {
                        setOptionClicked(!optionClicked);
                    }}/> */}
                    <div className="option-wrapper" onClick={() => setOptionClicked(!optionClicked)}>
                        <img src="option.png" className={`option-image ${optionClicked ? "hidden" : ""}`} />
                        <img src="x-button.png" className={`option-image ${optionClicked ? "" : "hidden"}`} />
                    </div>
                    {optionClicked ? 
                    <div className="upload-show-container">
                        <div className="file-input-container">
                            <input type="file" className="input-container" onChange={(event) => {
                                setFile(event.target.files[0]);
                            }} />
                        </div>
                        <div className="file-expiry-container">
                            <div>Choose expiry date : </div>
                            <input type="date" className="file-expiry-input" min={new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]} onChange={(event) => {
                                setExpiry(event.target.value);
                            }}/>
                        </div>
                        <div className="button-container">
                            {loading ? <RotatingComponent/> : <div className="upload-button" onClick={async () => {
                                setLoading(true);
                                const formData = new FormData();
                                formData.append("file", file);
                                formData.append("expiry", expiry);
                                formData.append("token", localStorage.getItem("authToken"));
                                const result = await axios.post('https://swiftly-backend.yashvs34.me/upload', formData, {
                                    headers:{
                                        "Content-Type": "multipart/form-data",
                                    }
                                });
                                setLoading(false);
                                window.location.reload();
                            }}>
                                Upload
                            </div>}
                        </div>
                    </div> : <></>}
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