import * as user from "../constants/user";
import { fromJS } from "immutable";

export interface IUserState {
    id: string;
    token: string;
    email: string;
    firstName: string;
    lastName: string;
}

type UserAction = user.IUserAction | user.IOtherAction;

const INITIAL_STATE: IUserState = fromJS({
    "id": "",
    "token": "",
    "email": "",
    "firstName": "",
    "lastName": ""
});

export default function reducer(state: IUserState = INITIAL_STATE, action: UserAction = user.otherAction): IUserState {
    switch (action.type) {
        case user.USER_SET:
        case user.USER_CLEAR:
            return Object.assign({}, state, {
                "id": action.id,
                "token": action.token,
                "email": action.email,
                "firstName": action.firstName,
                "lastName": action.lastName
            });
        default:
            return state;
    }
}
