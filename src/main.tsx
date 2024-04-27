import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

function appStart() {
  return Promise.resolve()
}

appStart()
  .catch(console.error)
  .finally(() => {
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
