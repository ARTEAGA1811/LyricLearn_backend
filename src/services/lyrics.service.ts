import {getLyricsUrl} from "../integrations/genius";
import axios from "axios";
import {AnyNode, Cheerio, Element, load} from 'cheerio';


const getLyricsFromUrl = async (url: string) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = load(html);

    const containerLyrics = $('[data-lyrics-container=true]');
    const myLyrics: string[] = [];


    //SE filtra por etiquetas <a> y texto sin etiquetas
    const songPart: Cheerio<AnyNode> = containerLyrics.contents().filter((index, element) => {
        return (element.type === 'tag' && element.name === 'a') || element.type === 'text';
    });

    const extractWordsFromTagA = (songPart: Element) => {
        $(songPart).each((index, element) => {
                $(element).find('span').each((index, childElement) => {
                    if ($(childElement).find('br').length > 0) {
                        const contentHtml = $(childElement).html() || '';
                        const words = contentHtml.split('<br>');
                        words.forEach(word => {
                            myLyrics.push(word);
                        });
                    } else {
                        myLyrics.push($(childElement).text());
                    }
                });
            }
        );
    }

    songPart.each((index, element) => {
        if (element.type === 'tag') {
            extractWordsFromTagA(element);
        } else {
            myLyrics.push($(element).text());
        }
    });

    // containerLyrics.find('a').each((index, element) => {
    //     $(element).find('span').each((index, childElement) => {
    //         if ($(childElement).find('br').length > 0) {
    //             const contentHtml = $(childElement).html() || '';
    //             const words = contentHtml.split('<br>');
    //             words.forEach(word => {
    //                 myLyrics.push(word);
    //             });
    //         } else {
    //             myLyrics.push($(childElement).text());
    //         }
    //     });
    // });

    return myLyrics;
}
const getLyrics = async (artistName: string, title: string) => {
    const responseUrl = await getLyricsUrl(artistName, title)
    const responseLyrics = await getLyricsFromUrl(responseUrl)
    return responseLyrics
}

export {getLyrics}