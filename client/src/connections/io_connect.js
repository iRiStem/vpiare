import { io_connect } from '../app-setting';

const { io } = require("socket.io-client");
const socket = io.connect(io_connect);

export function useSocket() {
  return { socket }
}