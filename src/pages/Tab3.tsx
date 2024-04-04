import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";
import PlaylistContent from "../components/PlaylistContent";
import { usePlaylist } from "../hooks/usePlaylist";
import { VideoContext } from "../context/video-context";
import { useState } from "react";
import { Video as VideoType } from "../types/playlist";
import VideoContent from "../components/VideoContent";

const Tab3: React.FC = () => {
  const { playlist } = usePlaylist();
  const videoContextValue = useState<VideoType | null>(null);
  return (
    <IonPage>
      <VideoContext.Provider value={videoContextValue}>
        <IonSplitPane when="lg" contentId="playlist">
          <IonMenu contentId="playlist">
            <IonHeader>
              <IonToolbar color="dark">
                <IonTitle>{playlist?.name}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              {playlist && <PlaylistContent playlist={playlist} />}
            </IonContent>
          </IonMenu>
          <VideoContent />
        </IonSplitPane>
      </VideoContext.Provider>
    </IonPage>
  );
};

export default Tab3;
