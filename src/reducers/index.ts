import { combineReducers } from "redux";
import user, { IUserState } from "./user";
import loading, { ILoadingState } from "./loading";
import dialogs, { IDialogsState } from "./dialogs";
import error, { IErrorState } from "./error";

const reducers = combineReducers({
    user,
    loading,
    dialogs,
    error
});

export default reducers;

export interface IGlobalState {
    user: IUserState;
    loading: ILoadingState;
    dialogs: IDialogsState;
    error: IErrorState;
}
