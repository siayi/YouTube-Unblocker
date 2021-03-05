# NodeJS YouTube Unblocker

A simple YouTube proxy and client for viewing YouTube videos in blocked/restricted networks. Makes use of the `ytdl-core` and `ytsr` npm packages. It is effectively just a wrapper for these packages. 

You can use a running example here:

- https://youtube-proxy3.herokuapp.com/

## Functionality
- Searching for videos
- Streams over connection rather than download
- No ads
- Bypasses firewalls
- Download videos with one click

## Note:
This only *streams* the video, the download also only streams. Therefore, skipping and scrubbing are not supported. The only fix to this would be to fully download the video before sending it to the user. Although this could be desireable it puts the server running the code at risk of massive downloads and also decreases performance. If you make these changes feel free to make a PR though and I can put it on another branch.
