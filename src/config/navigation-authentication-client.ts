import {
  IPublicClientApplication,
  NavigationClient,
  NavigationOptions,
} from "@azure/msal-browser";
import { Capacitor } from "@capacitor/core";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio";

export default class NavigationAuthenticationClient extends NavigationClient {
  constructor(private msalInstance: IPublicClientApplication) {
    super();
  }

  async navigateExternal(
    url: string,
    options: NavigationOptions
  ): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      const browser = InAppBrowser.create(url, "_blank", {
        location: "no",
        hidenavigationbuttons: "yes",
        clearcache: "yes",
        clearsessioncache: "yes",
        hideurlbar: "yes",
        fullscreen: "yes",
        closebuttoncaption: "Close",
      });
      browser.on("loadstart").subscribe((event) => {
        if (event.url.includes("#state")) {
          browser.close();
          console.log("Handling #state...");
          const domain = event.url.split("#")[0];
          const url = event.url.replace(domain, "capacitor://localhost:5173/");
          const hash = new URL(url).hash;
          console.log(url, "url current");
          this.msalInstance.handleRedirectPromise(hash).then(res => {
          }).catch((error) => {
            console.error(error, "Redirection error");
          });
        }
        if (event.url.includes("https://localhost/")) {
          browser.close();
          console.log("Handling localhost...");
          const url = event.url.replace(
            "https://localhost/",
            "capacitor://localhost:5173/"
          );
          this.msalInstance.handleRedirectPromise(url);
        }
      });
      browser.on("message").subscribe((message) => {
        console.log(message, "message")
        if (message.data.challenge) {
          FingerprintAIO.isAvailable().then(() => {
            FingerprintAIO.show({
              title: "Give me your finger"
            }).then(() => {
              FingerprintAIO.registerBiometricSecret({
                secret: message.data.challenge
              }).then(() => {
                browser.executeScript({
                  code: `
        	$("#extension_fido_rawId").val("${message.data.challenge}");
        
        	localStorage.setItem("credentialId", $("#extension_fido_rawId").val());
        	$("#status").text("Successfully created credential with ID: " + $("#extension_fido_rawId").val());

        	if (!isDebug)
            	$("#continue").click();
`})
              }).then(() => console.log("Script executed!")).catch(console.log)
            })
          })
        } else if (message.data.assertion) {
          FingerprintAIO.isAvailable().then(() => {
            FingerprintAIO.loadBiometricSecret({
              title: "Give me your finger"
            }).then((secret) => {
              browser.executeScript({
                code: `
        	$("#extension_fido_rawId").val("${secret}");
        
        	if (!isDebug)
            	$("#continue").click();
`
              }).then(() => console.log("Script executed!")).catch(console.log)
            })
          })
        }
      })
    } else {
      window.location.assign(url);
    }
    return true;
  }
}
function stringToArrayBuffer(str: string) {
  return Uint8Array.from(str, (c: any) => c.charCodeAt(0)).buffer;
}
