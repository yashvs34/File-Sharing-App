
function FileData (userData)
{
    return (
        <div>
            <div>
                {userData.fileName}
            </div>

            <div>
                {userData.expiryAt}
            </div>
        </div>
    )
}

export default FileData 