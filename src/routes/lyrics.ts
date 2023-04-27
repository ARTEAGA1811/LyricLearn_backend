import {Router} from "express";
import {getLyricsController} from "../controllers/lyrics.controller";
import {checkTokenSession} from "../middleware/session";

const router = Router()

router.post("/", checkTokenSession, getLyricsController)

export {router}