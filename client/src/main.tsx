import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import RoomContext from "./context/RoomContext.tsx";
import SocketProvier from "./context/SocketContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SocketProvier>
      <RoomContext>
        <App />
      </RoomContext>
    </SocketProvier>
  </React.StrictMode>
);
