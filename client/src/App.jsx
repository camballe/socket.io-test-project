import { useEffect, useState, useRef } from "react";

import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

function App() {
  const effectRan = useRef(false);

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    console.log("Render 1");
    if (effectRan.current === false) {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });

      return () => {
        console.log("unmounted");
        effectRan.current === true;
      };
    }
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Room number..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h3>Message: {messageReceived}</h3>
    </div>
  );
}

export default App;
