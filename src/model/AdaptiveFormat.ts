export interface AdaptiveFormat{
    itag: number;
    url: string;
    mimeType: string;
    bitrate: number;
    width: number;
    height: number;
    initRange: Range;
    indexRange: Range;
    lastModified: string;
    contentLength: string;
    quality: string;
    fps: number;
    qualityLabel: string;
    projectionType: string;
    averageBitrate: number;
    audioQuality: string;
    approxDurationMs: string;
    audioQualityLabel?: string;
    audioSampleRate?: string;
    audioChannels?: number;
    loudnessDb?: number;
}

export interface Range{
    start: string;
    end: string;
}