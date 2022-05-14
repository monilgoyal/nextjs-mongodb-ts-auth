import { UserType, User } from "../src/models/user";
import dbConnect from "./dbConnect";
// import prisma from "lib/prisma";
import { encryptPassword } from "../lib/auth/passwordUtils";
import pick from "lodash/pick";

export interface UserParams {
    email: string;
    name: string;
    password: string;
}

// Given some params, create a user on the database,
// storing the encrypted password.
export async function createUser(params: UserParams): Promise<UserType> {
    await dbConnect()
    const filteredParams = pick(params, ["email", "name", "password"]);
    console.log(filteredParams)
    const password = await encryptPassword(filteredParams.password);
    console.log(await User.find())
    const user = await User.create({ ...filteredParams, password });
    // console.log(user)

    // Make sure all our lib methods obfuscate the password
    user.password = "";

    return user;
}