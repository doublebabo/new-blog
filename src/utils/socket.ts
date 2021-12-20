import {io} from "socket.io-client";

const socket = io(
    process.env.NODE_ENV === 'development' ? 'http://192.168.1.102:4000/' : '/', {
        autoConnect: false
    }
);

export default socket;
