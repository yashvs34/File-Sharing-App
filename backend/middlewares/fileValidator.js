

function fileTypeValidator (req, res, next)
{
    const fileType = req.file.mimetype;
    const size = req.file.size;

    if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType == 'image/svg+xml' || fileType === 'image/gif' || fileType === 'application/pdf')
    {
        if (size <= 10 * 1024 * 1024)
        {
            next();
        }
        else
        {
            res.json({
                message : 'File is too big'
            });
        }
    }
    else
    {
        res.json({
            message : 'Given file type is not supported for uploading'
        });
    }
}

module.exports = fileTypeValidator;