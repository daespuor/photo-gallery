import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
export const config = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_B2C_CLIENT_ID,
    authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY,
    redirectUri: import.meta.env.VITE_AZURE_AD_B2C_REDIRECT_URI,
    knownAuthorities: [import.meta.env.VITE_AZURE_AD_B2C_KNOWN_AUTHORITIES],
    postLogoutRedirectUri: import.meta.env
      .VITE_AZURE_AD_B2C_POST_LOGOUT_REDIRECT_URI,
    navigationToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [import.meta.env.VITE_AZURE_AD_B2C_SCOPES],
};


