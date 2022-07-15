const sharedUtils = require('./index');
export  const getMessage = async (messageId) => {
    const _messageId = _.toLower(messageId);
    return await sharedUtils.readFileAsync(`./mocks/messages/${messageId}.json`);
}