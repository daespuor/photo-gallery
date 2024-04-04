export type Video = {
  url: string;
  title: string;
  description: string;
  duration: number;
};
export type Category = {
  name: string;
  videos: Video[];
};
export type Playlist = {
  name: string;
  categories: Category[];
};
