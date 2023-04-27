import {Request, Response} from 'express'
import httpStatus from "http-status";
import {loginUser, registerNewUser} from "../services/auth.service";
import {handleHttp} from "../utils/error.handle";

const registerCtrl = async ({body}: Request, res: Response) => {
    try {
        const userResponse = await registerNewUser(body)
        res.status(httpStatus.CREATED)
        res.send(userResponse)
    } catch (e) {
        handleHttp(res, "ERROR_REGISTER_USER", e)
    }
}

const loginCtrl = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const tokenResponse = await loginUser({email, password});
        res.status(httpStatus.ACCEPTED)
        res.send(tokenResponse)
    } catch (e) {
        handleHttp(res, "ERROR_LOGIN_USER", e)
    }
}


export {registerCtrl, loginCtrl}