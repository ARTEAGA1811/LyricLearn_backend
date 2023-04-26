//integration with musixmatch api
import axios from 'axios';
import "dotenv/config"


const URL_BASE = 'https://api.musixmatch.com/ws/1.1/';
const API_KEY = process.env.MUSIXMATCH_API_KEY;

const getLyricsUrl = async (artistName: string, title: string): Promise<string | null> => {
    const path = `track.search?q_artist=${artistName}&q_track=${title}&f_has_lyrics=true&s_artist_rating=desc&s_track_rating=desc&apikey=${API_KEY}`;
    const URL = `${URL_BASE}${path}`;
    const responseInfo = await axios.get(URL);
    const trackList: any[] = responseInfo.data.message.body.track_list;
    if (trackList.length === 0) {
        return null;
    }
    //return responseInfo.data.message.body.track_list[0].track.track_share_url;
    return trackList[0].track.track_share_url;
}

export {getLyricsUrl}