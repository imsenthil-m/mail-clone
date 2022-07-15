import { resolve } from 'path';

const fs = require('fs');

export const readFile = (path, cb) => {
    fs.readFile(path, 'utf8', (err, data) => {  
        if(!err && cb) cb(JSON.parse(data));
    })
}

export const writeFile = (path, data=[], cb) => {
    fs.writeFile(path, JSON.stringify(data), () => { if(cb) cb()});
}

export const writeFileAsync = (path, data=[]) => {
    return new Promise((resolve, reject) => {
        writeFile(path, data, resolve);
    })
}

export const readFileAsync = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, resolve);
    })
}