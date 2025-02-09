import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:9876" //"https://api-buzzzed.sleeplessnight.fr/";

export const socket = io(URL);
