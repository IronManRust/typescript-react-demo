import { combineReducers } from "redux";
import user, { IUserState } from "./user";
import settings, { ISettingsState } from "./settings";
import loading, { ILoadingState } from "./loading";
import dialogs, { IDialogsState } from "./dialogs";
import error, { IErrorState } from "./error";

const reducers = combineReducers({
    user,
    settings,
    loading,
    dialogs,
    error
});

export default reducers;

export interface IGlobalState {
    user: IUserState;
    settings: ISettingsState;
    loading: ILoadingState;
    dialogs: IDialogsState;
    error: IErrorState;
}
