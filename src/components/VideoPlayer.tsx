import { useRef } from "react";
import { CapacitorVideoPlayer } from "capacitor-video-player";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import "./VideoPlayer.css";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef(null);
  const modalRef = useRef<HTMLIonModalElement>(null);
  async function handlePlay() {
    const url = "http://localhost:3033/playlist.m3u8";
    if (videoRef.current === null) return;
    const resp = await CapacitorVideoPlayer.initPlayer({
      mode: "embedded",
      url,
      playerId: videoRef.current.id,
      showControls: true,
      title: "My Video Player",
      componentTag: "app-video-player",
      pipEnabled: true,
      width: 1200,
      height: 1000,
    });
    console.log(resp);
  }
  function confirm() {
    modalRef.current?.dismiss(undefined, "confirm");
  }
  function handleDismiss(evt: CustomEvent<OverlayEventDetail>) {
    if (evt.detail.role === "confirm") {
      console.log("Confirmed");
      handlePlay();
    }
  }
  return (
    <IonContent>
      <IonModal
        ref={modalRef}
        isOpen
        onWillDismiss={(evt) => {
          handleDismiss(evt);
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modalRef.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
            <IonTitle>Video Player Confirmation</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => confirm()}>Confirm</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="medium">
            This is going to reproduce a video using Capacitor Video Player. You
            have to confirm to continue and watch the video.
          </IonText>
        </IonContent>
      </IonModal>
      <app-video-player>
        <div
          id="video-player"
          ref={videoRef}
          slot="fixed"
          className="video-player"
        ></div>
      </app-video-player>
    </IonContent>
  );
};

export default VideoPlayer;
