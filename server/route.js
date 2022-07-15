const express = require('express');
const router = express.Router();

router.get('/folders', require('./controllers/folders/get'));
router.post('/folder', require('./controllers/folders/post'));
router.get('/mails/:folder_name', require('./controllers/mails/get'));
router.get('/message/:folder_name/:message_id', require('./controllers/message/get'));
router.put('/message/:folder_name/:message_id', require('./controllers/message/put'));
router.post('/message/new', require('./controllers/message/post'));
router.get('/contacts/', require('./controllers/contacts/get'));

module.exports=router;