//integration with genius api
import axios from 'axios';
import "dotenv/config"


const URL_BASE = 'https://api.genius.com';
const TOKEN = 'Bearer ' + process.env.GENIUS_TOKEN;
const searchSongId = async (artistName: string, title: string) => {
    // const URL = `${URL_BASE}/search?q=${artistName} ${title}`;
    // const responseInfo = await axios.get(URL, {
    //         },
    //     )
    // ;
    // return response.data.response.hits[0].result.id;
    return 378195;
}


const getLyricsUrl = async (artistName: string, title: string): Promise<string> => {
    const idSong = await searchSongId(artistName, title);
    const URL = `${URL_BASE}/songs/${idSong}`;
    const responseInfo = await axios.get(URL, {
            headers: {
                Authorization: TOKEN
            },
        }
    );
    return responseInfo.data.response.song.url;
}

export  {getLyricsUrl}