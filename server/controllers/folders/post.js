const sharedUtils = require('../utils/index');
const handler = (req, res) => {
    sharedUtils.readFile('./mocks/folders.json', (folders) => {
        folders.push(req.body.folderName);
        sharedUtils.writeFile('./mocks/folders.json', folders);
        res.status(201).send();
    })
}

module.exports = [handler];