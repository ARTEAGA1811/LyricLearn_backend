import {Response} from "express"
import {logger} from "./logs.handle";
import httpStatus from "http-status";
import mongoose from "mongoose";
import {ErrorResponse} from "../interfaces/response.interface";

const handleHttp = (res: Response, message: string, e: any, code: number) => {
    logger.error(e)
    logger.error(e.message)

    res.status(code)
    const errorResponse: ErrorResponse = {
        status: code,
        error: {
            message: message
        }
    }
    res.send(errorResponse)
}


const validateParams = (...params: any) => {
    for (const param of params) {
        if (!param) {
            return false
        }
    }
    return true
}

const handleRegisterExceptions = (e: any, res: Response) => {
    if (e.code === 11000) {
        if (e.keyValue.email) {
            handleHttp(res, "EMAIL_ALREADY_EXISTS", e, 400)
        } else if (e.keyValue.username) {
            handleHttp(res, "USERNAME_ALREADY_EXISTS", e, 400)
        } else {
            handleHttp(res, e.message, e, httpStatus.BAD_REQUEST)
        }
    } else if (e instanceof mongoose.Error.ValidationError) {
        handleHttp(res, "INVALID_DATA", e, 400)
    } else {
        handleHttp(res, "UNEXPECTED_ERROR", e, 500)
    }
}
export {handleHttp, validateParams, handleRegisterExceptions}