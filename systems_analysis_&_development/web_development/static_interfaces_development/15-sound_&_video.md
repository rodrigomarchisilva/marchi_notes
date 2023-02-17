<!-- markdownlint-disable MD024 -->
# Sound and Video

[⬅️ Previous: Static Interfaces Development](14-static_interfaces_development.md) | [➡️ Next: Web Services](16-web_services.md)

[🏠 Home](../../README.md)

## Index

- [Sound and Video](#sound-and-video)
  - [Index](#index)
  - [Multimedia Formats](#multimedia-formats)
    - [Extensions](#extensions)
  - [Working with videos](#working-with-videos)
    - [video tag](#video-tag)
    - [Browser compatibility](#browser-compatibility)
    - [Determining the size of the video](#determining-the-size-of-the-video)
    - [Creating a control bar for the video](#creating-a-control-bar-for-the-video)
    - [Making a video start automatically](#making-a-video-start-automatically)
  - [Working with audio](#working-with-audio)
    - [audio tag](#audio-tag)
    - [Browser compatibility](#browser-compatibility-1)

## Multimedia Formats

### Extensions

- `.mp3`, `.mp4`, `.wav`, `.avi`, `.mov`, `.flv`, `.mkv`, `.wmv`, `.mpeg`, `.mpg`, etc.
- `.mp3` is the most common audio format.
- `.mp4` is the most common video format.

## Working with videos

### video tag

- You can use the `src` attribute to specify the path to the video file.

~~~html
<video src="video.mp4"></video>
~~~

- Another way to specify the path to the video file is to use the `source` tag.
- This way you can specify multiple video files with different formats, to make sure that the video will play in any browser.

~~~html
<video>
  <source src="video.mp4" type="video/mp4">
  <source src="video.ogg" type="video/ogg">
  <source src="video.webm" type="video/webm">
</video>
~~~

### Browser compatibility

| Browser | MP4 | WebM | OGG |
| ------- | --- | ---- | --- |
| IE      | YES | NO   | NO  |
| Chrome  | YES | YES  | YES |
| Firefox | YES | YES  | YES |
| Safari  | YES | NO   | NO  |
| Opera   | YES | YES  | YES |

### Determining the size of the video

- If you do not specify the height and width of the video, the browser might keep blinking during reproduction. You can use CSS or HTML attributes to specify the size of the video.

~~~html
<video src="video.mp4" width="320" height="240"></video>
~~~

~~~css
video {
  width: 320px;
  height: 240px;
}
~~~

### Creating a control bar for the video

- You can use the `controls` attribute to create a control bar for the video.
- It allows the user to play, pause, stop, and change the volume of the video.

~~~html
<video src="video.mp4" controls></video>
~~~

### Making a video start automatically

- You can use the `autoplay` attribute to make the video start automatically.

~~~html
<video src="video.mp4" autoplay></video>
~~~

## Working with audio

### audio tag

- Works the same way as the `video` tag, with just the same attributes.

~~~html
<audio src="audio.mp3"></audio>

<audio controls autoplay>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
</audio>
~~~

### Browser compatibility

| Browser | MP3 | WAV | OGG |
| ------- | --- | --- | --- |
| IE      | YES | NO  | NO  |
| Chrome  | YES | YES | YES |
| Firefox | YES | YES | YES |
| Safari  | YES | YES | NO  |
| Opera   | YES | YES | YES |

[⬆️ Back to top](#index)

[⬅️ Previous: Static Interfaces Development](14-static_interfaces_development.md) | [➡️ Next: Web Services](16-web_services.md)

[🏠 Home](../../README.md)
