import {Request, Response, NextFunction} from "express"
import {handleHttp} from "../utils/error.handle";
import {verifyToken} from "../security/token.handle";

const checkTokenSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenInput = req.headers["authorization"]
        if (!tokenInput) {
            throw new Error("Token not found")
        }

        const token = tokenInput.split(" ")[1]
        if (!token) {
            throw new Error("Invalid format token")
        }

        //Obtenemos la información del usuario
        //Si no es válido se lanza una exepción.
        const infoUser = verifyToken(token)
        console.log(infoUser);

        next()


    } catch (e) {
        handleHttp(res, "ERROR_TOKEN", e)
    }
}


export {checkTokenSession}