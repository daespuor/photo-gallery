import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { config } from "./config/auth-config";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(config);

async function appStart() {
  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise();
}

appStart()
  .catch(console.error)
  .finally(() => {
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </React.StrictMode>
    );
  });
