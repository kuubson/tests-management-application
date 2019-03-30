module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log(`New client ${socket.id} arrived!`);

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} left!`);
        })

    })

}