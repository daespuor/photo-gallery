package main

import (
	"daespuor91/go/video/data"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
)

type NextFunc func(w http.ResponseWriter, req *http.Request)

func AddCORS(nextFunc NextFunc) NextFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		nextFunc(w, req)
	}
}

func handlePlaylist(w http.ResponseWriter, req *http.Request) {
	filepath, errWD := os.Getwd()
	if errWD != nil {
		http.Error(w, "Error getting the current directory", http.StatusInternalServerError)
	}
	filepath = filepath + "/video/playlist.m3u8"
	playlist, err := os.ReadFile(filepath)
	if err != nil {
		http.Error(w, "Error reading the playlist.m3u8", http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/vnd.apple.mpegurl")
	w.Write(playlist)
}
func handleStaticContent(prefix string, root http.FileSystem) http.Handler {
	handler := func(w http.ResponseWriter, r *http.Request) {
		r.URL.Path = strings.TrimPrefix(r.URL.Path, prefix)
		http.FileServer(root).ServeHTTP(w, r)
	}
	return http.HandlerFunc(AddCORS(handler))
}
func handleVideos(w http.ResponseWriter, req *http.Request) {
	playlist, err := data.GetPlaylist()
	if err != nil {
		http.Error(w, "Error getting the playlist", http.StatusInternalServerError)
	}
	playlistToSend, errMarshalling := json.Marshal(playlist)
	if errMarshalling != nil {
		http.Error(w, "Error encoding the playlist", http.StatusTeapot)
	}
	w.Header().Set("Contet-type", "application/json")
	w.Write(playlistToSend)

}
func main() {
	currentPath, errWD := os.Getwd()
	if errWD != nil {
		fmt.Print("Unable to get current dir")
	}
	videoPrefix := "/video"
	currentPath += videoPrefix

	server := http.NewServeMux()
	server.HandleFunc("/playlist.m3u8", AddCORS(handlePlaylist))
	server.HandleFunc("/videos", AddCORS(handleVideos))
	server.Handle("/", handleStaticContent(videoPrefix, http.Dir(currentPath)))
	http.ListenAndServe(":3033", server)
	fmt.Println("vim-go")
}
