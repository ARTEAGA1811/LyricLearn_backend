import {Request, Response, NextFunction} from "express"
import {handleHttp} from "../utils/error.handle";
import {verifyToken} from "../security/token.handle";
import httpStatus from "http-status";

const checkTokenSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenInput = req.headers["authorization"]
        if (!tokenInput) {
            const tokenError = new Error("Token not found")
            handleHttp(res, "TOKEN_NOT_FOUND", tokenError , 401)
            return
        }

        const token = tokenInput.split(" ")[1]
        if (!token) {
            const tokenError =  new Error("Invalid format token")
            handleHttp(res, "INVALID_FORMAT_TOKEN", tokenError, 401)
        }

        //Obtenemos la información del usuario
        //Si no es válido se lanza una excepción.
        const infoUser = verifyToken(token)
        console.log(infoUser);

        next()


    } catch (e) {
        handleHttp(res, "ERROR_TOKEN", e, 401)
    }
}


export {checkTokenSession}