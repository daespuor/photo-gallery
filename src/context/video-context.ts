import { createContext } from "react";
import { Video } from "../types/playlist";

type VideoContextProps = [Video | null, (video: Video) => void];
export const VideoContext = createContext<VideoContextProps>([
  null,
  () => {
    return;
  },
]);
