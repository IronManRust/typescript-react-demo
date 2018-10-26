import { IErrorAction, ERROR_SET, ERROR_CLEAR } from "../constants/error";

export function errorSet(code: number, message: string, elementID: string | undefined): IErrorAction {
    return {
        "type": ERROR_SET,
        code,
        message,
        elementID
    };
}

export function errorClear(): IErrorAction {
    return {
        "type": ERROR_CLEAR,
        "code": 0,
        "message": "",
        "elementID": undefined
    };
}
