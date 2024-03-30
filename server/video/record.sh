#!/bin/bash

ffmpeg -f avfoundation -i "1" -f avfoundation -i ":0" -r 30 -b:a 200KB -c:v libx264  -c:a aac  -f segment -segment_time 10 -segment_list playlist.m3u8 -segment_format mpegts output_%03d.ts
