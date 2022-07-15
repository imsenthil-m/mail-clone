const _ = require('lodash');
//import _ from 'lodash';
//import {updateReadStatus} from '../utils/mailbox';
const mailBoxUtils = require('../utils/mailbox');
const sharedUtils = require('../utils/index');
const handler = async (req, res) => {
    const messageId = _.toLower(req.params.message_id);
    const folderName = _.toLower(req.params.folder_name)
    const reqBody = req.body;
    //const mail = require(`./mocks/messages/${messageId}.json`)
    const mail = await sharedUtils.readFileAsync(`./mocks/messages/${messageId}.json`)
    
        if(reqBody.readStatus !== undefined) {
            await mailBoxUtils.updateReadStatus(folderName, messageId, false);
        }
        if(reqBody.starred !== undefined) {
            await mailBoxUtils.updateStarred(folderName, messageId, reqBody.starred);
        }
        if(reqBody.delete !== undefined) {
            await mailBoxUtils.deleteMail(folderName, messageId );
        }
        if(reqBody.moveTo !== undefined) {
            await mailBoxUtils.moveTo(folderName, messageId, reqBody.moveTo );
        }
        res.status(200).send();

    
}

module.exports = [handler];