const mailBox = {}
const getMessage = require('./message').getMessage;
const sharedUtils = require('./index');
const fs = require('fs');

export const updateReadStatus = async (folderName, messageId, readStatus = true) => {
    const _folderName = _.toLower(folderName);
    const mails = await getMailbox(_folderName);
    mails.map(mail => {
        if(mail['message-id'] === messageId)
        mail.readStatus = readStatus; 
    });
    sharedUtils.writeFile(`./mocks/folders/${_folderName}.json`, mails);
    return;
}

export const getMailbox = async (folderName, cb) => {
    const _folderName = _.toLower(folderName);
    await createFolderMails(_folderName) 

    return await sharedUtils.readFileAsync(`./mocks/folders/${_folderName}.json`);
}



export const updateStarred = async (folderName, messageId, starred = true) => {
    const _folderName = _.toLower(folderName);
    const mails = await getMailbox(_folderName);
    mails.map(mail => {
        if(mail['message-id'] === messageId)
        mail.starred = starred; 
    });
    sharedUtils.writeFile(`./mocks/folders/${_folderName}.json`, mails);
    const mail = await getMessage(messageId);
    mail.starred = starred;
    sharedUtils.writeFile(`./mocks/messages/${messageId}.json`, mail);
    return;
}

export const moveTo = async (folderName, messageId, moveToFolder ) => {
    const mails = await getMailbox(folderName);
    let mailIndex = -1;
    const message = mails.filter((mail, index) => {
        if(mail['message-id'] === messageId ) {
            mailIndex = index;
        }
        return mail['message-id'] === messageId
    });
    console.log(" mailIndex ", mailIndex);
    if(mailIndex !==-1)mails.splice(mailIndex, 1);
    sharedUtils.writeFile(`./mocks/folders/${folderName}.json`, mails, () => {});
    const movingFolderMails = await getMailbox(moveToFolder);
    movingFolderMails.push(message[0]);
    sharedUtils.writeFile(`./mocks/folders/${moveToFolder}.json`, movingFolderMails, () => {});
    return;
}

export const deleteMail = async (folderName, messageId) => {
    const mails = await getMailbox(folderName);
    let mailIndex = -1;
    const message = mails.filter((mail, index) => {
        if(mail['message-id'] === messageId ) {
            mailIndex = index;
        }
        return mail['message-id'] === messageId
    });
    console.log(" mailIndex ", mailIndex);
    if(mailIndex !==-1)mails.splice(mailIndex, 1);
    sharedUtils.writeFile(`./mocks/folders/${folderName}.json`, mails, () => {});
    const trashMail = await getMailbox('Trash');
    trashMail.push(message[0]);

    sharedUtils.writeFile(`./mocks/folders/trash.json`, trashMail, () => {});
    return;
}

export const addMessageToFolder = async (folderName, message) => {
    const folderMails = await getMailbox(folderName);
    folderMails.push(message);
    //overwriteFolderMails(folderName, folderMails);
    sharedUtils.writeFile(`./mocks/folders/${folderName}.json`,folderMails, () => { })
}

export const overwriteFolderMails = (folderName, mails) => {
    fs.writeFile(`./mocks/folders/${folderName}.json`, JSON.stringify(mails), () => {});
}

export const createFolderMails = async (folderName) => {
    return new Promise((resolve, reject) => {
        if(!fs.existsSync(`./mocks/folders/${folderName}.json`)) {
            fs.writeFile(`./mocks/folders/${folderName}.json`, 
            JSON.stringify([]), 
            (err) => {if(!err) resolve(true)}
            );
        } else {
            resolve(false);
        }
    })
    
}