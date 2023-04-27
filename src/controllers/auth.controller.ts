import {Request, Response} from 'express'
import httpStatus from "http-status";
import {registerNewUser} from "../services/auth.service";
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


export {registerCtrl}