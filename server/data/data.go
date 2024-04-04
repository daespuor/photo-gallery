package data

import (
	"time"
)

type Video struct {
	Url         string        `json:"url"`
	Title       string        `json:"title"`
	Description string        `json:"string"`
	Duration    time.Duration `json:"duration"`
}

type Category struct {
	Videos []Video `json:"videos"`
	Name   string  `json:"name"`
}

type Playlist struct {
	Categories []Category `json:"categories"`
	Name       string     `json:"name"`
}

func GetPlaylist() (Playlist, error) {
	url := "http://localhost:3033" + "/video/playlist.m3u8"
	video1 := Video{Url: url, Title: "How to cook a cake", Description: "This is a video that shows how to cook a cake", Duration: 10}
	video2 := Video{Url: url, Title: "How to cook a pizza", Description: "This is a video that shows how to cook a pizza", Duration: 20}
	video3 := Video{Url: url, Title: "How to cook a pasta", Description: "This is a video that shows how to cook a pasta", Duration: 30}
	category1 := Category{Videos: []Video{video1, video2, video3}, Name: "Cooking"}
	video4 := Video{Url: url, Title: "How to play guitar", Description: "This is a video that shows how to play guitar", Duration: 40}
	video5 := Video{Url: url, Title: "How to play piano", Description: "This is a video that shows how to play piano", Duration: 50}
	video6 := Video{Url: url, Title: "How to play drums", Description: "This is a video that shows how to play drums", Duration: 60}
	category2 := Category{Videos: []Video{video4, video5, video6}, Name: "Music"}
	video7 := Video{Url: url, Title: "How to play soccer", Description: "This is a video that shows how to play soccer", Duration: 70}
	video8 := Video{Url: url, Title: "How to play basketball", Description: "This is a video that shows how to play basketball", Duration: 80}
	category3 := Category{Videos: []Video{video7, video8}, Name: "Sports"}
	playlist := Playlist{Categories: []Category{category1, category2, category3}, Name: "My Playlist"}
	return playlist, nil
}
