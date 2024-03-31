import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";
import VideoPlayer from "../components/VideoPlayer";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Video</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <VideoPlayer />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
