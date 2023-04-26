import {Request, Response} from "express";
import httpStatus from "http-status";
import {handleHttp} from "../utils/error.handle";
import {GeniusLyricsService} from "../services/api_lyrics/GeniusLyrics.service";
import {MusixmatchLyricsService} from "../services/api_lyrics/MusixmatchLyrics.service";

const getLyricsController = async (req: Request, res: Response) => {
    try {
        const {artistName, title} = req.body;
        const musixmatchApi = new MusixmatchLyricsService();
        //const geniusApi = new GeniusLyricsService();

        //const lyrics = await geniusApi.getLyrics(artistName, title);
        const lyrics = await musixmatchApi.getLyrics(artistName, title);
        res.status(httpStatus.ACCEPTED);
        res.send(lyrics);
    } catch (e) {
        handleHttp(res, "ERROR_GET_LYRICS", e);
    }
}

export {getLyricsController}