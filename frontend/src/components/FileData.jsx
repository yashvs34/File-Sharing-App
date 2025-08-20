import { useState } from "react"
import FileShareComponent from "./FileShareComponent"

function FileData ({userData})
{
    const [clicked, setClicked] = useState(true);

    return (
        <div className="file-container">
            <div>
                {userData.fileName}
            </div>

            <div>
                {Math.ceil((new Date(userData.expiryAt) - new Date()) / (1000 * 60 * 60 * 24))}
            </div>

            <div className="share-file">
                <FileShareComponent userData={userData} />
            </div>

        </div>
    )
}

export default FileData 