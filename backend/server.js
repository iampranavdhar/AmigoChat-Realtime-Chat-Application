import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import chatroomRoutes from "./routes/chatrooms.js";
import http from "http";
import { Server } from "socket.io";


/* App Config */
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

/* Middleware -> Deals the Connections between database and the App */
app.use(express.json());
app.use(cors());


/* Socket.io Setup */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("One User Got Connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("One User Got Disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

/* API Routes -> The first part is the default path for all the requests in that users.js file there we have to continue from this path */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chatrooms", chatroomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/photo", express.static("images"));

/* Database Connection */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MONGODB CONNECTED");
  }
);

app.get("/",(req,res)=>{
  res.send("Welcome to the AmigoChat API")
})

/* Port Listening In */
server.listen(port, () => {
  console.log("Server is running in PORT 5000");
});
