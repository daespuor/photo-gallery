package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/vnd.apple.mpegurl")
	w.Write(playlist)
}
func handleStaticContent(prefix string, root http.FileSystem) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		r.URL.Path = strings.TrimPrefix(r.URL.Path, prefix)
		http.FileServer(root).ServeHTTP(w, r)
	})
}
func main() {
	currentPath, errWD := os.Getwd()
	if errWD != nil {
		fmt.Print("Unable to get current dir")
	}
	videoPrefix := "/video"
	currentPath += videoPrefix

	server := http.NewServeMux()
	server.HandleFunc("/playlist.m3u8", handlePlaylist)
	server.Handle("/", handleStaticContent(videoPrefix, http.Dir(currentPath)))
	http.ListenAndServe(":3033", server)
	fmt.Println("vim-go")
}
