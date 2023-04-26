//integration with genius api
import axios from 'axios';
import "dotenv/config"


const URL_BASE = 'https://api.genius.com';
const TOKEN = 'Bearer ' + process.env.GENIUS_TOKEN;

const cleanSearchInput = (artistName: string, title: string) => {
    return `${title} ${artistName}`
        .toLowerCase()
        .replace(/ *\([^)]*\) */g, '')
        .replace(/ *\[[^\]]*]/, '')
        .replace(/feat.|ft./g, '')
        .replace(/\s+/g, ' ')
        .trim();
};



const getLyricsUrl = async (artistName: string, title: string): Promise<string | null> => {
    //const URL = `${URL_BASE}/search?q=${cleanSearchInput(artistName, title)}`;
    const URL = `${URL_BASE}/search?q=${artistName} ${title}`;
    const responseInfo = await axios.get(URL, {
        headers: {
            Authorization: TOKEN
        }
    });
    const lyricsList = responseInfo.data.response.hits;

    //Se filtra solo canciones en inglés
    const lyricsListFiltered = lyricsList.filter((lyrics: any) => {
        return lyrics.result.language === 'en';
    });

    if (lyricsListFiltered.length === 0) {
        return null;
    }

    return lyricsListFiltered[0].result.url;
}

export {getLyricsUrl}