const File = require('../models/file');

async function deleteData ()
{
    try
    {
        await File.updateMany(
            {expiryAt : {$lt : Date.now()}},
            {$set : {isDeleted : true}}
        );
    
        console.log("Deletion job done");
    }
    catch (error)
    {
        console.log("Error in deleting", error);
    }
}

async function findData ({user})
{
    try
    {
        return await File.find({user});
    }
    catch (error)
    {
        console.log("Error in finding user's data", error);
    }
}

module.exports = {deleteData, findData}