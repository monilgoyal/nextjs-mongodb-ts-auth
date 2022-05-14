import { UserType, User } from '../../src/models/user';
import dbConnect from '../dbConnect';
import { verifyPassword } from "./passwordUtils";

export interface LoginParams {
    email: string;
    password: string;
}

// Given some login params (email and password) 
// return the user if the password is valid
// or null if it's not.
export async function login(params: LoginParams): Promise<UserType | null> {
    await dbConnect()
    const user = await User.findOne({ email: params.email });


    if (!user) return null;

    if (await verifyPassword(user.password.toString(), params.password)) {
        // Make sure all our lib methods obfuscate the password
        user.password = "";

        return user;
    }

    return null;
}