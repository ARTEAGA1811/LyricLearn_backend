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
            handleHttp(res, "INCOMPLETE_PARAMS", new Error("INCOMPLETE_PARAMS"), 400)
            return
        }

        const userResponse = await registerNewUser(body);

        const createdResponse: SuccessResponse = {
            status: 201,
            data: {
                message: "USER_CREATED"
            },
        }

        res.status(201)
        res.send(createdResponse)
    } catch (e: any) {
        handleRegisterExceptions(e, res)
    }
}

const loginCtrl = async (req: Request, res: Response) => {
    try {
        const {email, password, remember} = req.body;
        let cookieMessage = "";
        if (!validateParams(email, password)) {
            handleHttp(res, "INCOMPLETE_PARAMS", new Error("INCOMPLETE_PARAMS"), 400)
            return
        }
        const tokenResponse = await loginUser({email, password});

        //Se guarda el token en la cookie solo si el usuario lo solicita
        if (remember) {
            res.cookie("token", tokenResponse, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            })
            cookieMessage = "COOKIE_CREATED"
            console.log("cookie created: ", req.cookies.token)

        } else {
            //Se elimina la cookie si el usuario no lo solicita
            const myCookie = req.cookies.token
            console.log("cookie gotten: ", myCookie)

            if (myCookie) {
                res.clearCookie("token")
                cookieMessage = "COOKIE_DELETED"
            } else {
                cookieMessage = "COOKIE_NOT_CREATED_YET"
            }

        }
        //console.log("tokenResponse", tokenResponse)
        console.log("cookieMessage", cookieMessage)
        res.status(202)
        res.send({
            status: 202,
            data: {
                token: tokenResponse,
                message: cookieMessage
            }
        })
    } catch (e: any) {
        handleHttp(res, e.message, e, 403)
    }
}


export {registerCtrl, loginCtrl}