const sharedUtils = require('../utils/index');
const handler = (req, res) => {
    sharedUtils.readFile('./mocks/contacts.json', (data) => {
        res.status(200).json(data);
    })
}

module.exports = [handler];