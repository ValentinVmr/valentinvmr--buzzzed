const useServer = require('./composables/useServer');

const { server, io } = useServer();
const handleMessages = require('./infra/handlers');

io.on('connection', (socket) => {
    console.log('a user connected');
    handleMessages(socket);
});

const port = process.env.PORT || 9876;

server.listen(port, () => {
    console.log('server running at http://localhost:' + port);
});