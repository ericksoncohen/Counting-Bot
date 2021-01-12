const express = require("express");
const server = express();
console.log("Loaded File 'keepAlive.js'.");
server.all('/', (req, res) => {
  res.send("Bot is online.")
});
function keepAlive() {
  server.listen(3000);
}
module.exports = keepAlive;