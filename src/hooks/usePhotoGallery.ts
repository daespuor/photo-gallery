import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { isPlatform } from "@ionic/react";
import { useEffect, useState } from "react";

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
const PHOTO_STORAGE = "photos";
export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const savePhoto = async (photo: Photo): Promise<UserPhoto> => {
    const filepath = `${Date.now()}.jpeg`;
    let base64Photo;
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Photo = file.data;
    } else {
      base64Photo = await getBase64Data(photo.webPath!);
    }
    const savedFile = await Filesystem.writeFile({
      data: base64Photo,
      path: filepath,
      directory: Directory.Data,
    });


    if (isPlatform("hybrid")) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }

    return {
      filepath,
      webviewPath: photo.webPath,
    };
  };
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      quality: 100,
    });
    const newPhoto = await savePhoto(photo);
    const newPhotos = [newPhoto, ...photos];
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
    setPhotos(newPhotos);
  };

  useEffect(() => {
    async function loadPhotos() {
      const { value } = await Preferences.get({ key: PHOTO_STORAGE });
      const photosSaved: UserPhoto[] = value ? JSON.parse(value) : [];

      if (!isPlatform("hybrid")) {
        for (const photo of photosSaved) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photosSaved);
    }
    loadPhotos();
  }, []);

  return { takePhoto, photos };
}

async function getBase64Data(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = reject;

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };

    reader.readAsDataURL(blob);
  });
}
