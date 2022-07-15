
const sharedUtils = require('../utils/index');
const handler = (req, res) => {
    sharedUtils.readFile('./mocks/folders.json', (data) => {
        res.status(200).json(data);
    })
}

module.exports = [handler];