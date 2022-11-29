
const app = require('express')();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        var incomingData = JSON.parse(message)
         var data = 
         {
             TimeStamp: Date.now(),
             Label: incomingData.Label,
             Data: parseInt(incomingData.Data)
         }

        io.emit('message', JSON.stringify(data) );   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );



// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })
// var clients = [];

// server.on('connection', async (socket) => { 
//     console.log("Socket Opened");  
//     clients.push(socket);
//     socket.on('message', async (message) => {

//         var incomingData = JSON.parse(message)
//         var data = 
//         {
//             TimeStamp: Date.now(),
//             Label: incomingData.Label,
//             Data: parseInt(incomingData.Data)
//         }
//         console.log(data);
//         clients.forEach(function(client) {
//             client.send(JSON.stringify(data));
//   });
// });
// socket.onclose = event => {
//     console.log(event.reason);
//     const index = array.indexOf(socket);
//     if (index > -1) { // only splice array when item is found
//         array.splice(index, 1); // 2nd parameter means remove one item only
//       }
      
// };

// });

