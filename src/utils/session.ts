import * as cookie from "react-cookie";
import * as status from "statuses";
import uuid from "uuid/v4";
import { userSet, userClear } from "../actions/user";
import { loadingEnable, loadingDisable } from "../actions/loading";
import { popupClear, modalClear } from "../actions/dialogs";
import { errorClear } from "../actions/error";
import { store } from "../containers/root";

// TODO: Repalce Placeholder Data With API Responses
const placeholderID = uuid();
const placeholderToken = uuid();
const placeholderEmail = "email@example.com";
const placeholderPassword = "password";
const placeholderFirstName = "John";
const placeholderLastName = "Smith";
const placeholderTimeoutDelay = 2000;

const cookieNameToken = "token";
const cookieNameAuthenticating = "authenticating";

const defaultRejectionCode = 500;
const defaultRejectionMessage = status[defaultRejectionCode] || "";

interface IRejection {
    code: number;
    message: string;
    details: string | undefined;
}

export function isAuthenticated() {
    if (store.getState().user &&
        store.getState().user.id &&
        store.getState().user.id !== "") {
        return true;
    } else {
        const token = cookieRead(cookieNameToken);
        if (token && token !== "") {
            if (!cookieRead(cookieNameAuthenticating)) {
                cookieWrite(cookieNameAuthenticating, "true");
                login(undefined, undefined)
                    .then(() => {
                        cookieWrite(cookieNameAuthenticating, undefined);
                    }).catch(() => {
                        cookieWrite(cookieNameAuthenticating, undefined);
                    });
            }
            return true;
        } else {
            return false;
        }
    }
}

export async function login(email: string | undefined, password: string | undefined) {
    store.dispatch(loadingEnable());
    const promise = new Promise<boolean>((resolve: (success: boolean) => void, reject: (rejection: IRejection) => void) => {
        try {
            // TODO: Actually Talk To API
            setTimeout(() => {
                if ((email === placeholderEmail && password === placeholderPassword) || (cookieRead(cookieNameToken))) {
                    cookieWrite(cookieNameToken, placeholderToken);
                    storeClearFull();
                    store.dispatch(userSet(placeholderID, placeholderToken, placeholderEmail, placeholderFirstName, placeholderLastName));
                    resolve(true);
                } else {
                    cookieWrite(cookieNameToken, undefined);
                    storeClearFull();
                    resolve(false);
                }
            }, placeholderTimeoutDelay);
        } catch (exception) {
            cookieWrite(cookieNameToken, undefined);
            storeClearFull();
            reject({ "code": defaultRejectionCode, "message": defaultRejectionMessage, "details": JSON.stringify(exception) });
        }
    });
    return promise;
}

export async function logout() {
    store.dispatch(loadingEnable());
    const promise = new Promise<boolean>((resolve: (success: boolean) => void, reject: (rejection: IRejection) => void) => {
        try {
            // TODO: Actually Talk To API
            setTimeout(() => {
                cookieWrite(cookieNameToken, undefined);
                storeClearFull();
                resolve(true);
            }, placeholderTimeoutDelay);
        } catch (exception) {
            cookieWrite(cookieNameToken, undefined);
            storeClearFull();
            reject({ "code": defaultRejectionCode, "message": defaultRejectionMessage, "details": JSON.stringify(exception) });
        }
    });
    return promise;
}

function cookieRead(cookieName: string) {
    return cookie.load(cookieName, {});
}

function cookieWrite(cookieName: string, value: string | undefined) {
    if (value) {
        cookie.save(cookieName, value, {});
    } else {
        cookie.remove(cookieName, {});
    }
}

function storeClearFull() {
    storeClearPartial(true, true, true, true);
}

function storeClearPartial(user: boolean, loading: boolean, dialogs: boolean, error: boolean) {
    if (user) {
        store.dispatch(userClear());
    }
    if (loading) {
        store.dispatch(loadingDisable());
    }
    if (dialogs) {
        store.dispatch(popupClear());
        store.dispatch(modalClear());
    }
    if (error) {
        store.dispatch(errorClear());
    }
}
