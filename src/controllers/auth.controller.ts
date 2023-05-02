import {Request, Response} from 'express'
import httpStatus from "http-status";
import {checkIfValidToken, loginUser, registerNewUser} from "../services/auth.service";
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
        const {email, password} = req.body;
        if (!validateParams(email, password)) {
            handleHttp(res, "INCOMPLETE_PARAMS", new Error("INCOMPLETE_PARAMS"), 400)
            return
        }
        const tokenResponse = await loginUser({email, password});

        //Se guarda el token en la cookie
        res.cookie("token", tokenResponse, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        });

        res.status(202)
        res.send({
            status: 202,
            data: {
                token: tokenResponse,
                message: "LOGIN_SUCCESS"
            }
        })
    } catch (e: any) {
        handleHttp(res, e.message, e, 403)
    }
}

const logoutCtrl = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token")
        res.status(200)
        res.send({
            status: 200,
            data: {
                message: "LOGOUT_SUCCESS"
            }
        })
    } catch (e: any) {
        handleHttp(res, e.message, e, 403)
    }
}

const checkTokenCtrl = async (req: Request, res: Response) => {
    try {

        const {token} = req.body;
        console.log("token backend: ", token)
        if (!token) {
            throw new Error("TOKEN_NOT_FOUND")
        }
        const infoUser = checkIfValidToken(token)
        if (!infoUser) {
            throw new Error("INVALID_TOKEN")
        }

        res.status(200)
        res.send({
            status: 200,
            data: {
                token: token,
                message: "TOKEN_VALID",
                user: infoUser
            }
        })
    } catch (e: any) {
        handleHttp(res, e.message, e, 403)
    }
}


export {registerCtrl, loginCtrl, checkTokenCtrl, logoutCtrl}