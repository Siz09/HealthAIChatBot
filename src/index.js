import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { signInAnon, auth, onAuthStateChanged } from "./firebase-config";

// Create the root once, outside of any callbacks
const root = ReactDOM.createRoot(document.getElementById("root"));

// Flag to ensure we only render once after initial auth state
let hasRendered = false;

// ➊ Start the anonymous sign‑in immediately.
signInAnon();

// ➊ OPTIONAL: wait until we actually have a UID before mounting the UI.
//    This guarantees every component sees auth.currentUser.uid.
onAuthStateChanged(auth, () => {
  // Only render once, after the initial authentication state is established
  if (!hasRendered) {
    root.render(<App />);
    hasRendered = true;
  }
});