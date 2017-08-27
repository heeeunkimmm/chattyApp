// server.js

const express = require('express');
const ws = require('ws');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', (socket) => {
  console.log('Client connected');

  const userCountObj = {
    type: "userCountChanged",
    content: wss.clients.size
  }
  wss.broadcast(JSON.stringify(userCountObj));

  socket.on('message', function incoming(message) {
    console.log('received: ', message);
    const receivedMessage = JSON.parse(message);
    switch(receivedMessage.type) {
      case "postMessage":
        const messageObject = {
          type: "incomingMessage",
          id: uuid(),
          username: receivedMessage.username,
          content: receivedMessage.content
        }
        wss.broadcast(JSON.stringify(messageObject));
        break;
      case "postNotification":
        const notiObject = {
          type: "incomingNotification",
          id: uuid(),
          username: receivedMessage.username,
          content: receivedMessage.content
        }
        wss.broadcast(JSON.stringify(notiObject));
        break;
    }

  });

  socket.on('close', () => {
    console.log('Client disconnected');
    console.log('online clients after closing: ', wss.clients.size);
    const userCountObj = {
      type: "userCountChanged",
      content: wss.clients.size
    }
    wss.broadcast(JSON.stringify(userCountObj));
  });
});