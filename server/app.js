const express = require('express')
const config = require('config')
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const ApiVK = require('./api/auth.vk')
const User = require('./data/models/User')
let authVk = new ApiVK()
let user = new User()

const { authConnection } = require( './sockets/auth.socket')
const { groupsConnection } = require( './sockets/groups.socket')
const { mailingConnection } = require( './sockets/mailing.socket')

const app = express()
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const PORT = config.get('port') || 3002

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.get('cors_origin'),
    methods: ['GET', 'POST'],

  },
  maxHttpBufferSize: 1e20,
});

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING on port ${PORT}`);
});
//server.on("listening", function () { server.close(); });

io.on('connection', (socket) => {
  authConnection(io, socket, authVk, user)
  groupsConnection(io, socket, authVk)
  mailingConnection(io, socket, authVk)
})

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING on port ${PORT}`);
  });

  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }

}


//start()



