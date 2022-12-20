import {AdaptiveFormat} from "./model/AdaptiveFormat";

export class YouTubeAdapter{
    private videoMetadData: any;
    constructor(private youTubeURL: URL){
    }

    private async getMetaData(): Promise<any> {
        if(!this.videoMetadData){
            const response = await fetch(this.youTubeURL);
            const responseText = await response.text();
            const matches = responseText.match(/ytInitialPlayerResponse = (\{.*\});<\/script>/);
            if (!matches || matches.length <= 1) {
                throw new Error(`Could not find meta data for ${this.youTubeURL}`);
            }
            const ytInitialResponse = matches[1];
            this.videoMetadData = JSON.parse(ytInitialResponse);
        }
        return this.videoMetadData;
    }

    public async getVideoTitle(): Promise<string> {
        const metaData = await this.getMetaData();
        return metaData.videoDetails.title;
    }

    public async getVideoAuthor(): Promise<string> {
        const metaData = await this.getMetaData();
        return metaData.videoDetails.author;
    }

    public async getAudioFormats(): Promise<AdaptiveFormat[]> {
        const metaData = await this.getMetaData();
        const adaptiveFormats = metaData.streamingData.adaptiveFormats;
        return adaptiveFormats.filter((format: AdaptiveFormat) => {
            return format.mimeType.startsWith("audio/mp4");
        });
    }
}