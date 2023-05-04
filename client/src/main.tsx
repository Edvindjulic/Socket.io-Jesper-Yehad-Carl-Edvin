import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SocketProvier from "./context/SocketContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SocketProvier>
      <App />
    </SocketProvier>
  </React.StrictMode>
);
