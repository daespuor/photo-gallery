import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { Category, Playlist, Video } from "../types/playlist";
import { useCallback, useContext } from "react";
import { VideoContext } from "../context/video-context";

type PlaylistContentProps = {
  playlist: Playlist;
};
const PlaylistVideo: React.FC<{ video: Video }> = ({ video }) => {
  const [, setVideo] = useContext(VideoContext);
  const handleClick = useCallback(() => {
    setVideo(video);
  }, [setVideo, video]);
  return (
    <IonItem lines="full" onClick={handleClick}>
      <IonLabel>{video.title}</IonLabel>
      <IonText>{video.description}</IonText>
    </IonItem>
  );
};
const PlaylistCategory: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <IonAccordion value={category.name}>
      <IonItem slot="header" color="medium">
        <IonLabel>{category.name}</IonLabel>
      </IonItem>
      <div slot="content">
        <IonList>
          {category.videos.map((video) => {
            return <PlaylistVideo video={video} key={video.title} />;
          })}
        </IonList>
      </div>
    </IonAccordion>
  );
};
const PlaylistContent: React.FC<PlaylistContentProps> = ({ playlist }) => {
  return (
    <IonAccordionGroup>
      {playlist.categories.map((category) => {
        return <PlaylistCategory category={category} key={category.name} />;
      })}
    </IonAccordionGroup>
  );
};

export default PlaylistContent;
