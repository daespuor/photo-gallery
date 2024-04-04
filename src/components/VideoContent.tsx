import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import Video from "./Video";
import { useContext } from "react";
import { VideoContext } from "../context/video-context";

const VideoContent: React.FC = () => {
  const [video] = useContext(VideoContext);
  return (
    <div className="ion-page" id="playlist">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{video?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{video && <Video video={video} />}</IonContent>
    </div>
  );
};

export default VideoContent;
