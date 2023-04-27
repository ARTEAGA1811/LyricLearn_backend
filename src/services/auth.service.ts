import {UserInterface} from "../interfaces/user.interface";
import UserModel from "../models/userModel";
import {encrpyt} from "../security/encrypt.handle";

const registerNewUser = async (myUser: UserInterface) => {

    //usamos trim para eliminar los espacios en blanco
    myUser.username = myUser.username.trim()
    myUser.email = myUser.email.trim()
    myUser.password = myUser.password.trim()

    //Seteamos a lowercase el username
    //myUser.username = myUser.username.toLowerCase()


    const checkExists = await UserModel.findOne({username: myUser.username})
    if (checkExists) {
        throw new Error("The user already exists")
    }


    myUser.password = await encrpyt(myUser.password)

    return await UserModel.create(myUser);
}


export {registerNewUser}