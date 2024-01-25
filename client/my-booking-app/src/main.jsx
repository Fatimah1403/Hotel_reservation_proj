import React from "react";
import ReactDOM from "react-dom/client";
import { UserGetter } from "./userContext/useContext";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserGetter>
        <App />
      </UserGetter>
    </Router>
  </React.StrictMode>
);
