

const { io } = require("socket.io-client");
const socket = io.connect(process.env.REACT_APP_IO_CONNECT);

export function useSocket() {
  return { socket }
}