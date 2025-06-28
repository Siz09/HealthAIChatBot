import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { signInAnon, auth, onAuthStateChanged } from "./firebase-config";

// ➊ Start the anonymous sign‑in immediately.
signInAnon();

// ➋ OPTIONAL: wait until we actually have a UID before mounting the UI.
//    This guarantees every component sees auth.currentUser.uid.
onAuthStateChanged(auth, () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});
