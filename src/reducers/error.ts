import * as error from "../constants/error";
import { fromJS } from "immutable";

export interface IErrorState {
    code: number;
    message: string;
    elementID: string | undefined;
}

type ErrorAction = error.IErrorAction | error.IOtherAction;

const INITIAL_STATE: IErrorState = fromJS({
    "code": 0,
    "message": "",
    "elementID": undefined
});

export default function reducer(state: IErrorState = INITIAL_STATE, action: ErrorAction = error.otherAction): IErrorState {
    switch (action.type) {
        case error.ERROR_SET:
        case error.ERROR_CLEAR:
            return Object.assign({}, state, { "code": action.code, "message": action.message, "elementID": action.elementID });
        default:
            return state;
    }
}
