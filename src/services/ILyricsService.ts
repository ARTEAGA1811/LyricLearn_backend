
export interface ILyricsService {
    getLyricsFromUrl(url: string): Promise<string[]>

    getLyrics(artistName: string, title: string): Promise<string[]>;
}