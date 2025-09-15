import { useState } from "react"
import FileShareComponent from "./FileShareComponent"

function FileData ({userData})
{
    const [clicked, setClicked] = useState(false);

    return (
        <div className="file-container">
            {clicked ? <embed src={`${userData.cloudinaryUrl}`} className="file-preview-container"></embed> : <></>}
            <div>
                {userData.fileName}
            </div>

            <div className="file-info-detail">
                <div className="expiry-date">
                    Expires in : {Math.ceil((new Date(userData.expiryAt) - new Date()) / (1000 * 60 * 60 * 24))} days
                </div>

                <div onClick={() => {
                    setClicked(!clicked);
                }}>
                    <img src="./image.jpg" className="eye-image" />
                </div>

                <div className="more-info-button">
                    <img src="./menu.png" className="dot-image" />
                </div>
            </div>


            {/* <div className="share-file">
                <FileShareComponent userData={userData} />
            </div> */}

        </div>
    )
}

export default FileData 