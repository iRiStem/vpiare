const express = require('express')
const config = require('config')
const cors = require('cors');
const http = require('http');




const app = express()
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());


const PORT = config.get('port') || 3001

const server = http.createServer(app);



server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING on port ${PORT}`);
});