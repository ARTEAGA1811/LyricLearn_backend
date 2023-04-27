import {Schema, model, Types, Model} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";

const isEmailValid = (email: string) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return emailRegex.test(email)
}

//El objeto que se crea es la definición
const UserSchema = new Schema<UserInterface>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        email: {
            type: String,
            trim: true,
            //required: "Email address is required",
            required: true,
            unique: true,
            validate: [isEmailValid, "Please fill a valid email address"],
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please fill a valid email address"],
        },
        idSpotify: {
            type: String,
            required: false,
            default: null
        },
    },
    {
        timestamps: true, //Me permite que se me creen columnas con el registro de creado y actualizado automáticamente
        versionKey: false
    }
)


// Creamos el modelo
const UserModel = model('user', UserSchema)

export default UserModel