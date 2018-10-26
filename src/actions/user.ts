import { IUserAction, USER_SET, USER_CLEAR } from "../constants/user";

export function userSet(id: string, token: string, email: string, firstName: string, lastName: string): IUserAction {
    return {
        "type": USER_SET,
        id,
        token,
        email,
        firstName,
        lastName
    };
}

export function userClear(): IUserAction {
    return {
        "type": USER_CLEAR,
        "id": "",
        "token": "",
        "email": "",
        "firstName": "",
        "lastName": ""
    };
}
