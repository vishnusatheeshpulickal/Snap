import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleAuth } from "./config";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <Router>
    <GoogleOAuthProvider clientId={googleAuth.clientId}>
      <App />
    </GoogleOAuthProvider>
  </Router>,
  document.getElementById("root")
);
