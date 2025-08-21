const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// serve files from public folder
app.use(express.static("public"));

// socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // relay chat messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // cleanup
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
