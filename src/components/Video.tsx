import Hls from "hls.js";
import { useEffect, useRef } from "react";
import "./Video.css";

export default function Video() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (Hls.isSupported()) {
      console.log("HLS supported!");

      const hls = new Hls({
        debug: true,
      });

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("video and hls.js are attached");
      });
      hls.on(Hls.Events.MANIFEST_PARSED, (evt, data) => {
        console.log(
          "manifest loaded, found " + data.levels.length + " quality level"
        );
      });
      hls.on(Hls.Events.ERROR, (evt, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("fatal media error trying to recover");
              hls.recoverMediaError();
              break;
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("fatal network error", data);
            default:
              hls.destroy();
              break;
          }
        }
      });
      hls.loadSource("http://localhost:3033/playlist.m3u8");
      hls.attachMedia(videoRef.current!);

      return () => {
        hls.destroy();
      };
    }
  }, []);
  return <video id="video-frame" ref={videoRef} controls></video>;
}
