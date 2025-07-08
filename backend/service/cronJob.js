const cron = require('node-cron');
const { deleteData } = require('../repository/fileSharingRepository');

cron.schedule('0 7 * * *', () => {
    deleteData();
});

module.exports = cron;