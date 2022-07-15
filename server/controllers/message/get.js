const _ = require('lodash');
const sharedUtils = require('../utils/index');
const updateReadStatus = require('../utils/mailbox').updateReadStatus;
const handler = async (req, res) => {
    const messageId = _.toLower(req.params.message_id);
    const folderName = _.toLower(req.params.folder_name)
    const mail = await sharedUtils.readFileAsync(`./mocks/messages/${messageId}.json`);
    updateReadStatus(folderName, messageId)
    res.status(200).json(mail);
}

module.exports = [handler];