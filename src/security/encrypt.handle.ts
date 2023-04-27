import {hash, compare} from "bcryptjs"

const encrpyt = async (passPlainText: string) => {
    const passwordHash = await hash(passPlainText, 8)
    return passwordHash
}


const comparePasswords = async (passPlain: string, passHash: string) => {
    const isTheSame = await compare(passPlain, passHash)
    return isTheSame
}

export {encrpyt, comparePasswords}