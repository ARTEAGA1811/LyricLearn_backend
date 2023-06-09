import "dotenv/config"
import {sign, verify} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "no_secret"

const generateToken = (id: string, username: string, email: string, expiration: string) => {
    const jwtSign = sign({id, username, email}, JWT_SECRET, {
        expiresIn: expiration
    })
    return jwtSign;
}

const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET);
}

export {generateToken, verifyToken}