import {LoginInteface, RegisterInterface, UserInterface} from "../interfaces/user.interface";
import UserModel from "../models/userModel";
import {comparePasswords, encrpyt} from "../security/encrypt.handle";
import {generateToken} from "../security/token.handle";

const registerNewUser = async (myUser: RegisterInterface) => {

    //usamos trim para eliminar los espacios en blanco
    myUser.username = myUser.username.trim()
    myUser.email = myUser.email.trim()
    myUser.password = myUser.password.trim()

    //Seteamos a lowercase el username
    //myUser.username = myUser.username.toLowerCase()


    // const checkExists = await UserModel.findOne({username: myUser.username})
    // if (checkExists) {
    //     throw new Error("The user already exists")
    // }


    myUser.password = await encrpyt(myUser.password)

    return await UserModel.create(myUser);
}


const loginUser = async ({email, password}: LoginInteface) => {
    //Validar que el usuario exista
    const userResponse = await UserModel.findOne({email}) as UserInterface
    if (!userResponse) {
        throw new Error("This email is not registered.")
    }

    //Lo que me trae de la BD es la pass encriptada.
    const passHash = userResponse.password
    const isCorrectPass = await comparePasswords(password, passHash)
    if (!isCorrectPass) {
        throw new Error("Username or password are incorrect")
    }


    //Como ya ingresó las credenciales correctas, vamos a hacer que se genere un token de sesión
    //Vamos a usar el _id como identificador único.
    const id = userResponse._id.toString();
    return generateToken(id, "7d");
}


export {registerNewUser, loginUser}