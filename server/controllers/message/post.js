const _ = require('lodash');
const mailBoxUtils = require('../utils/mailbox');
const uuidv1 = require('uuid').v1;
const fs = require('fs');
const sharedUtils = require('../utils/index');

const handler = (req, res) => {
    const reqBody = req.body;
    const uniqueMessageId = uuidv1();
    
    const mailMetadata = {
        'message-id': uniqueMessageId,
        'to': reqBody.toAddress,
        subject: reqBody.subject,
        from: 'me@abc.com'
    }
    reqBody.toAddress === 'me@abc.com' ?
        mailBoxUtils.addMessageToFolder('inbox', mailMetadata)
        :mailBoxUtils.addMessageToFolder('sent', mailMetadata)
    
    const mailContent = {
        "from": "me <me@abc.com>",
        "id": uniqueMessageId,
        "subject": reqBody.subject,
        "to": reqBody.toAddress,
        "date": new Date(),
        "body": reqBody.content
    }
    sharedUtils.writeFile(`./mocks/messages/${uniqueMessageId}.json`, mailContent)
    res.status(200).send();
}

const updateSentMails = (message) => {
    const sentMails = mailBoxUtils.getMailbox('sent');    
    sentMails.push(message);
    sharedUtils.writeFile(`./mocks/folders/sent.json`, sentMails)
}

const addToSentFolder = (message) => {
    try{
        if(fs.existsSync('./mocks/folders/sent.json')) {
            updateSentMails(message);
        } else {
            sharedUtils.writeFile(`./mocks/folders/sent.json`, [{...message}]);
        }
    }
    catch(err) {
        console.log("Error occured", err);
    }
    
    
}

const addToInboxFolder = message => {
    const inboxMails = mailBoxUtils.getMailbox('inbox');
    inboxMails.push(message);
    return;
}

module.exports = [handler];