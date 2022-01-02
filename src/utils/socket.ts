import {io} from "socket.io-client";

const socket = io(
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/', {
        autoConnect: false
    }
);

export default socket;
