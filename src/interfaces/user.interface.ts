import mongoose from "mongoose";

export interface UserInterface {
    _id: mongoose.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    idSpotify: string;
}

export interface LoginInteface extends Pick<UserInterface, "email" | "password"> {
}

export interface RegisterInterface extends Pick<UserInterface, "username" | "password" | "email"> {
}