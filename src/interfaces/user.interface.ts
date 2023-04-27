export interface UserInterface {
    _id?: string;
    username: string;
    password: string;
    email: string;
    idSpotify: string;
}

export interface LoginInteface extends Pick<UserInterface, "email" | "password"> {
}