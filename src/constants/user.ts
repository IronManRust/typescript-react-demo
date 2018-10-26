export type USER_SET = "USER_SET";
export const USER_SET: USER_SET = "USER_SET";
export type USER_CLEAR = "USER_CLEAR";
export const USER_CLEAR: USER_CLEAR = "USER_CLEAR";

export interface IUserAction {
    type: USER_SET | USER_CLEAR;
    id: string;
    token: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface IOtherAction {
    type: "";
}

export const otherAction: IOtherAction = { "type": "" };
