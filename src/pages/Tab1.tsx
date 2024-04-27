import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useEffect } from "react";
import { loginRequest } from "../config/auth-config";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Capacitor, registerPlugin } from "@capacitor/core";
const Tab1: React.FC = () => {
  const { accounts, inProgress, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  function register() {
    if (!Capacitor.isNativePlatform()) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .catch((error) => {
          console.log(error.message);
          instance.loginRedirect(loginRequest);
        });
    } else {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
          authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY_MOBILE
        })
        .catch((error) => {
          console.log(error.message);
          instance.loginRedirect({ ...loginRequest, authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY_MOBILE });
        });
    }
  }
  function authenticate() {

    if (!Capacitor.isNativePlatform()) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
          authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY_2
        })
        .catch((error) => {
          console.log(error.message);
          instance.loginRedirect({ ...loginRequest, authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY_2 });
        });
    } else {

      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
          authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY_2_MOBILE
        })
        .catch((error) => {
          console.log(error.message);
          instance.loginRedirect({ ...loginRequest, authority: import.meta.env.VITE_AZURE_AD_B2C_AUTHORITY_2_MOBILE });
        });
    }
  }
  return (<IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tab 1</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer name={isAuthenticated ? "User 123" : "User"} />
      <IonButton onClick={() => register()}>Register</IonButton>
      <IonButton onClick={authenticate}>Authenticate</IonButton>
    </IonContent>
  </IonPage>
  );
};

export default Tab1;
