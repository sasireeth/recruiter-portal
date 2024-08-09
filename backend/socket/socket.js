const { Server } = require("socket.io");
const express = require("express");
const cron = require('node-cron');
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3004"],
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
});

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {};


function emitNotification(m) {
  io.emit('notifcation', {message:m,content:"Have a nice day"});
}

cron.schedule('0 9 * * *', () => {
  emitNotification('Hi recruiters');
});


io.on('connection', (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

  // socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

module.exports= { app, io, server,  emitNotification};