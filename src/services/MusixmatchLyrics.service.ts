import axios from "axios";
import {load} from 'cheerio';
import {ILyricsService} from "./ILyricsService";
import {getLyricsUrl} from "../integrations/musixmatch";
import {GeniusLyricsService} from "./GeniusLyrics.service";


class MusixmatchLyricsService implements ILyricsService {

    getLyricsFromUrl = async (url: string) => {
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);

        //Get the elementes that have the class "mxm-lyrics__content"
        const containerLyrics = $('.mxm-lyrics__content');
        const myLyrics: string[] = containerLyrics.text().split('\n');

        return myLyrics;
    }


    getLyrics = async (artistName: string, title: string) => {
        const artistName_ = artistName.replace(" ", "_")
        const title_ = title.replace(" ", "_")
        const responseUrl = await getLyricsUrl(artistName_, title_)

        if(responseUrl){
            return await this.getLyricsFromUrl(responseUrl)
        }


        //Si no se encuentra la letra en musixmatch, se usa la api de genius
        console.log("No se encontró la letra en musixmatch, se usa la api de genius")
        const geniusApi = new GeniusLyricsService();
        return await geniusApi.getLyrics(artistName_, title_);
    }
}

export {MusixmatchLyricsService}