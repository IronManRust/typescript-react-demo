export type ERROR_SET = "ERROR_SET";
export const ERROR_SET: ERROR_SET = "ERROR_SET";
export type ERROR_CLEAR = "ERROR_CLEAR";
export const ERROR_CLEAR: ERROR_CLEAR = "ERROR_CLEAR";

export interface IErrorAction {
    type: ERROR_SET | ERROR_CLEAR;
    code: number;
    message: string;
    elementID: string | undefined;
}

export interface IOtherAction {
    type: "";
}

export const otherAction: IOtherAction = { "type": "" };
