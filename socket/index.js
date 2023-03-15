require('dotenv').config();
const port = process.env.PORT;
const io = require('socket.io')(port, {
    cors: {
        origin: 'http://localhost:3000'
    },
});


let users = [];

// adding user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

//remove user
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

//get sender
const getReceiver = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
}

io.on('connection', (socket) => {

    //user connection
    console.log(`A user connected`);

    // take userId and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });


    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const receiver = getReceiver(receiverId);
        console.log(receiver);
        io.to(receiver.socketId).emit('getMessage', {
            senderId,
            text,
        })

    });


    // disconnet user
    socket.on('disconnet', () => {
        console.log('A user Disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })

})
