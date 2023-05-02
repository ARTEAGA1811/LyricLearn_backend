import {Router} from "express";
import {checkTokenCtrl, loginCtrl, logoutCtrl, registerCtrl} from "../controllers/auth.controller";

const router = Router()

router.post("/register", registerCtrl)

router.post("/login", loginCtrl)

router.post("/logout", logoutCtrl)

router.post("/check-token", checkTokenCtrl)


export {router}