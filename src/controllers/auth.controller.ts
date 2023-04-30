import {Request, Response} from 'express'
import httpStatus from "http-status";
import {loginUser, registerNewUser} from "../services/auth.service";
import {handleHttp, handleRegisterExceptions, validateParams} from "../utils/error.handle";
import UserModel from "../models/userModel";
import {RegisterInterface} from "../interfaces/user.interface";
import * as mongoose from "mongoose";
import {SuccessResponse} from "../interfaces/response.interface";

const registerCtrl = async ({body}: Request, res: Response) => {
    try {
        //Check params
        const {username, email, password} = body as RegisterInterface;
        if (!validateParams(username, email, password)) {
            handleHttp(res, "INCOMPLETE_PARAMS", new Error("INCOMPLETE_PARAMS"), httpStatus.BAD_REQUEST)
            return
        }

        const userResponse = await registerNewUser(body);

        const createdResponse: SuccessResponse = {
            status: 201,
            message: "USER_CREATED",
        }

        res.status(201)
        res.send(createdResponse)
    } catch (e: any) {
        handleRegisterExceptions(e, res)
    }
}

const loginCtrl = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const tokenResponse = await loginUser({email, password});
        res.status(httpStatus.ACCEPTED)
        res.send(tokenResponse)
    } catch (e) {
        handleHttp(res, "ERROR_LOGIN_USER", e, httpStatus.FORBIDDEN)
    }
}


export {registerCtrl, loginCtrl}