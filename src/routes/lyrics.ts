import {Router} from "express";
import {getLyricsController} from "../controllers/lyrics.controller";

const router = Router()

router.get("/", getLyricsController)

export {router}