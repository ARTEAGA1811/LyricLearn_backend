import {Router} from "express";
import {getLyricsController} from "../controllers/lyrics.controller";

const router = Router()

router.post("/", getLyricsController)

export {router}