import {Request, Response} from "express";
import httpStatus from "http-status";
import {handleHttp} from "../utils/error.handle";
import {getLyrics} from "../services/lyrics.service";

const getLyricsController = async (req: Request, res: Response) => {
    try {
        const {artistName, title} = req.body;
        const lyrics = await getLyrics(artistName, title);
        res.status(httpStatus.ACCEPTED);
        res.send(lyrics);
    } catch (e) {
        handleHttp(res, "ERROR_GET_LYRICS", e);
    }
}

export {getLyricsController}