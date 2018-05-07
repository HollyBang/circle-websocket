const express = require('express');
const socket = require('socket.io');

// App setup
let app = express();
let server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
let io = socket(server);
let clients = [];
let count = 0;
let test = null;

const iter = clients[Symbol.iterator]();
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    clients.push(socket.id);
    // Handle event
    console.log('clients', clients);
    socket.on('moveStart', function(){
        ++count;
       
        test = iter.next().value;
        if(test == clients[0]) {
           test = iter.next().value;
        }
        // console.log('iter        ', test);
        // console.log('client 0     ', clients[0]);
        // console.log('clients--------> ', clients);
        // console.log('generator--------> ', test);
        socket.broadcast.to(`${test}`).emit('moveStart');
     
    });


    socket.on('disconnecting', (reason) => {
        console.log('bye-bye------',socket.id);
        clients.forEach((element, i) => {
            if(element == socket.id) {
                clients.splice(i, 1)
            }
        });
        console.log('after delete', clients);
      });

});
