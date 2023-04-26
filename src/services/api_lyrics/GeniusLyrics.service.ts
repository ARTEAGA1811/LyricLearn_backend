import {getLyricsUrl} from "../../integrations/genius";
import axios from "axios";
import {AnyNode, Cheerio, Element, load} from 'cheerio';
import {ILyricsService} from "./ILyricsService";


class GeniusLyricsService implements ILyricsService {

    getLyricsFromUrl = async (url: string) => {
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);

        const containerLyrics = $('[data-lyrics-container=true]');
        const myLyrics: string[] = [];

        const htmlString = containerLyrics.html() || "";
        const elementsString = htmlString.split("<br>");
        const elements = elementsString.map((element: string) => {
            return load(element);
        });

        elements.forEach((newElement) => {
            myLyrics.push(newElement.text());
        });


        return myLyrics;
    }
    getLyrics = async (artistName: string, title: string) => {
        const responseUrl = await getLyricsUrl(artistName, title)

        if (responseUrl) {
            return await this.getLyricsFromUrl(responseUrl)
        }

        // Si no se encuentra la letra en genius, se manda un error
        console.log("No se encontró la letra en genius")
        throw new Error("No se encontró la letra en genius")
    }
}

export {GeniusLyricsService}