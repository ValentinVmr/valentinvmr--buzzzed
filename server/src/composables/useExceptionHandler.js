const SocketMessages = require("../infra/socket-messages");
const useI18n = require("./useI18n");

const { t } = useI18n();

module.exports = () => {
    const emitException = (socket, error) => {
        console.error(JSON.stringify({ error: error.message }));
        socket.emit(SocketMessages.EXCEPTION, JSON.stringify({ key: error.message, message: t(error.message) }));
    }

    return { emitException };
}