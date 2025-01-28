const useServer = require('./composables/useServer');

const { server, io } = useServer();
const handleMessages = require('./infra/handlers');

io.on('connection', (socket) => {
    console.log('a user connected');
    handleMessages(socket);
});

server.listen(8080, () => {
    console.log('server running at http://localhost:8080');
});