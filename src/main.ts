import {AdaptiveFormat} from "./model/AdaptiveFormat";
import {YouTubeAdapter} from "./YouTubeAdapter";

async function makeAPICall() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  console.log(data);
}

async function makeYouTubeAPICall() {
    const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=javascript&type=video&key=AIzaSyCq3');
    const data = await response.json();
    console.log(data);
}

async function getYouTubeVideoInfo( youTubeUrl: URL) {
    const response = await fetch(youTubeUrl);
    const responseText = await response.text();

    const matches = responseText.match(/ytInitialPlayerResponse = (\{.*\});<\/script>/);
    if (!matches || matches.length <= 1) {
        throw new Error('Could not find ytInitialPlayerResponse');
    }
    const ytInitialResponse = matches[1];
    const responseContext = JSON.parse(ytInitialResponse);
    console.log(`Number of available formats: ${responseContext.streamingData.formats.length}`);
    console.log(`Number of available adaptive formats: ${responseContext.streamingData.adaptiveFormats.length}`);

    console.log('Video details');
    console.log(`Title: ${responseContext.videoDetails.title}`);
    console.log(`Author: ${responseContext.videoDetails.author}`);

    const adaptiveFormats = responseContext.streamingData.adaptiveFormats;
    adaptiveFormats.forEach((format: AdaptiveFormat) => {
        if (format.mimeType.startsWith("audio/mp4")) {
            console.log(`Mime type: ${format.mimeType}, quality: ${format.audioQuality}, sample rate: ${format.audioSampleRate}`);
        }
    });
}

async function getVideoDetails(youTubeUrl: URL) {
    const youTubeAdapter = new YouTubeAdapter(youTubeUrl);
    const videoTitle = await youTubeAdapter.getVideoTitle();
    const videoAuthor = await youTubeAdapter.getVideoAuthor();
    const audioFormats = await youTubeAdapter.getAudioFormats();

    console.log(`Video title: ${videoTitle}`);
    console.log(`Video author: ${videoAuthor}`);
    console.log(`Number of audio formats: ${audioFormats.length}`);
    audioFormats.forEach((format: AdaptiveFormat) => {
        console.log(`Mime type: ${format.mimeType}, quality: ${format.audioQuality}, sample rate: ${format.audioSampleRate}`);
    });
}

getVideoDetails(new URL('https://www.youtube.com/watch?v=Wyd9OcI37AY')).then(() => {
    console.log('done');
});