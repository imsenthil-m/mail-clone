
const getMailbox = require('../utils/mailbox').getMailbox;

const handler = async (req, res) => {
    const mails = await getMailbox(req.params.folder_name);
    res.status(200).json(mails);
}

module.exports = [handler];