# References

## Obtaining YouTube Stream Data
1. GET YouTube URL
   2. In the HTML response, locate the `streamingData` JSON object
      3. See ```var ytInitialResponse = {responseContext...```
   3. The `streamingData` object contains an array of `formats`
   4. Each `format` entry describes a download stream
   5. There is also an `adaptiveFormats` array, which contains the same information as `formats`, but for adaptive streams
   6. In the format objects, search for `audio/mp4` streams and find the one with the highest `audioQuality`

## Google
* [Google Dewveloper Console](https://console.cloud.google.com/)

## YouTube
* [GitHub: YouTube API Samples](https://github.com/youtube/api-samples)
* [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs)
* [YouTube NodeJS Client](https://googleapis.dev/nodejs/googleapis/latest/youtube/index.html)

## Other
* [Make your own YouTube Downloader](https://javascript.plainenglish.io/make-your-own-youtube-downloader-626133572429)
* [node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
