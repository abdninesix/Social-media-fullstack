import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// Our work starts here
let onlineUsers = [] // An empty array

const addUser = (username, socketId) => { // A function to add user to array
  const isExist = onlineUsers.find(user => user.socketId === socketId)
  if (!isExist) { onlineUsers.push({ username, socketId }) }
  console.log(username + " connected")
}

const removeUser = (socketId) => { // A function to remove user from array
  onlineUsers = onlineUsers.filter(user => user.username !== username)
  console.log(username + " disconnected")
}

const getUser = (username) => { // A function to get user from array
  return onlineUsers.find(user => user.username === username)
}

//Our work ends here and we will use these functions in io.on

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
      addUser(username, socket.id);
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});