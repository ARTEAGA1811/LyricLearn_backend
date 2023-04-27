import "dotenv/config"
import {sign, verify} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "no_secret"

const generateToken = (username: string, email: string ) => {
    const jwtSign = sign({username, email}, JWT_SECRET, {
        expiresIn: "1h"
    })
    return jwtSign;
}

const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET);
}

export {generateToken, verifyToken}