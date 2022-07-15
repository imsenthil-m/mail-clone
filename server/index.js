//import express from "express";
const express = require('express');

const app = express();
const port = process.env.PORT || 9001;
const PROD = process.env.NODE_ENV === 'production';
const routes = require('./route');
const bodyParser = require('body-parser');

if (PROD) {
    app.use('/', express.static('dist'));
}

app.use(bodyParser.json({type: 'application/json'}));
app.use('/api', routes);
// app.get('/api/message', (req, res) => {
//     res.send('Build something amazing! 🚀');
// });

app.listen(port, () => {
    if (PROD) {
        console.log(`\n\n\n🚀  Server running at http://localhost:${port}.\n\n\n`);
    } else {
        console.log(`\n\n\n🚀  Server running at http://localhost:9000.\n\n\n`);
    }
})