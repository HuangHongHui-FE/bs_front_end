const Ws = require('ws');
const server = new Ws.Server({ port: 8090 });

const AES = require("../../util/AES.js")


function bindEvent () {
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', handleConnection);
}

function handleOpen () {
    console.log('BE: WebSocket open');
}

function handleClose () {
    console.log('BE: WebSocket close');
}

function handleError () {
    console.log('BE: WebSocket error');
}

function handleConnection (ws) {
    console.log('BE: WebSocket connection');
    // console.log(ws)
    // server.clients.forEach(e =>{
    //     e.send(server.clients)
    // })

    ws.on('message', handleMessage);
}

function handleMessage (msg) {
    const msg01 = JSON.parse(msg.toString())
    msg01.user = AES.aesDecrypt(msg01.user)
    server.clients.forEach((c) => {
        c.send(JSON.stringify(msg01));
    })
}

module.exports = bindEvent