import * as cookie from "react-cookie";
import * as status from "statuses";
import * as superagent from "superagent";
import uuid from "uuid/v4";
import { userSet, userClear } from "../actions/user";
import { settingSet, settingsClear } from "../actions/settings";
import { loadingEnable, loadingDisable } from "../actions/loading";
import { popupClear, modalClear } from "../actions/dialogs";
import { errorSet, errorClear } from "../actions/error";
import { store } from "../containers/root";
import { ILink } from "../types/link";
import { ISetting } from "../types/setting";

// The following placeholder data stands in for data that in an actual application would be provided by a remote API response.
const placeholderID = uuid();
const placeholderToken = uuid();
export const placeholderEmail = "email@example.com";
export const placeholderPassword = "password";
const placeholderFirstName = "John";
const placeholderLastName = "Smith";
const placeholderSettings: ISetting[] = [];
placeholderSettings.push({ "Type": "String", "Key": "String1", "Value": "ABC" });
placeholderSettings.push({ "Type": "String", "Key": "String2", "Value": "XYZ" });
placeholderSettings.push({ "Type": "Number", "Key": "Number1", "Value": "123" });
placeholderSettings.push({ "Type": "Number", "Key": "Number2", "Value": "789" });
placeholderSettings.push({ "Type": "Date", "Key": "Date1", "Value": "1/1/1970" });
placeholderSettings.push({ "Type": "Date", "Key": "Date2", "Value": "12/31/1999" });
placeholderSettings.push({ "Type": "Boolean", "Key": "Boolean1", "Value": "True" });
placeholderSettings.push({ "Type": "Boolean", "Key": "Boolean2", "Value": "False" });
const placeholderTimeoutDelay = 2000;

const cookieNameToken = "token";
const cookieNameAuthenticating = "authenticating";

const unauthorizedRejectionCode = 401;
const unauthorizedRejectionMessage = status[unauthorizedRejectionCode] || "";

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
            // The following placeholder code simulates what an actual application would normally determine based on interactions with a remote API.
            setTimeout(() => {
                if ((email === placeholderEmail && password === placeholderPassword) || (cookieRead(cookieNameToken))) {
                    cookieWrite(cookieNameToken, placeholderToken);
                    storeClearFull();
                    store.dispatch(userSet(placeholderID, placeholderToken, placeholderEmail, placeholderFirstName, placeholderLastName));
                    for (const placeholderSetting of placeholderSettings) {
                        store.dispatch(settingSet(placeholderSetting));
                    }
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
            // The following placeholder code simulates what an actual application would normally determine based on interactions with a remote API.
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

function isSuccessCode(value: number) {
    return value.toString().substr(0, 1) === "2";
}

export async function getData<T extends string | object | [] | undefined>(link: ILink) {
    store.dispatch(loadingEnable());
    const promise = new Promise<T>((resolve: (result: T) => void, reject: (rejection: IRejection) => void) => {
        try {
            superagent
                .get(link.HREF)
                .withCredentials()
                .end(function handleCallback(error, response) {
                    if (!error &&
                        response &&
                        response.status &&
                        isSuccessCode(response.status)) {
                        store.dispatch(loadingDisable());
                        resolve(response.body || response.text || undefined);
                    } else if (response && response.status === unauthorizedRejectionCode) {
                        cookieWrite(cookieNameToken, undefined);
                        console.log("Authenication Failure");
                        storeClearFull();
                        store.dispatch(errorSet(unauthorizedRejectionCode, unauthorizedRejectionMessage, undefined));
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    } else {
                        store.dispatch(loadingDisable());
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    }
                });
        } catch (exception) {
            store.dispatch(loadingDisable());
            reject({ "code": defaultRejectionCode, "message": JSON.stringify(exception), "details": undefined });
        }
    });
    return promise;
}

export async function putData<T extends string | object | [] | undefined, U extends string | object | [] | undefined>(link: ILink, data: T) {
    store.dispatch(loadingEnable());
    const promise = new Promise<U>((resolve: (result: U) => void, reject: (rejection: IRejection) => void) => {
        try {
            superagent
                .put(link.HREF)
                .withCredentials()
                .send(data)
                .end(function handleCallback(error, response) {
                    if (!error &&
                        response &&
                        response.status &&
                        isSuccessCode(response.status)) {
                        store.dispatch(loadingDisable());
                        resolve(response.body || response.text || undefined);
                    } else if (response && response.status === unauthorizedRejectionCode) {
                        cookieWrite(cookieNameToken, undefined);
                        console.log("Authenication Failure");
                        storeClearFull();
                        store.dispatch(errorSet(unauthorizedRejectionCode, unauthorizedRejectionMessage, undefined));
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    } else {
                        store.dispatch(loadingDisable());
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    }
                });
        } catch (exception) {
            store.dispatch(loadingDisable());
            reject({ "code": defaultRejectionCode, "message": JSON.stringify(exception), "details": undefined });
        }
    });
    return promise;
}

export async function postData<T extends string | object | [] | undefined, U extends string | object | [] | undefined>(link: ILink, data: T) {
    store.dispatch(loadingEnable());
    const promise = new Promise<U>((resolve: (result: U) => void, reject: (rejection: IRejection) => void) => {
        try {
            superagent
                .post(link.HREF)
                .withCredentials()
                .send(data)
                .end(function handleCallback(error, response) {
                    if (!error &&
                        response &&
                        response.status &&
                        isSuccessCode(response.status)) {
                        store.dispatch(loadingDisable());
                        resolve(response.body || response.text || undefined);
                    } else if (response && response.status === unauthorizedRejectionCode) {
                        cookieWrite(cookieNameToken, undefined);
                        console.log("Authenication Failure");
                        storeClearFull();
                        store.dispatch(errorSet(unauthorizedRejectionCode, unauthorizedRejectionMessage, undefined));
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    } else {
                        store.dispatch(loadingDisable());
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    }
                });
        } catch (exception) {
            store.dispatch(loadingDisable());
            reject({ "code": defaultRejectionCode, "message": JSON.stringify(exception), "details": undefined });
        }
    });
    return promise;
}

export async function deleteData(link: ILink) {
    store.dispatch(loadingEnable());
    const promise = new Promise<void>((resolve: () => void, reject: (rejection: IRejection) => void) => {
        try {
            superagent
                .del(link.HREF)
                .withCredentials()
                .end(function handleCallback(error, response) {
                    if (!error &&
                        response &&
                        response.status &&
                        isSuccessCode(response.status)) {
                        store.dispatch(loadingDisable());
                        resolve();
                    } else if (response && response.status === unauthorizedRejectionCode) {
                        cookieWrite(cookieNameToken, undefined);
                        console.log("Authenication Failure");
                        storeClearFull();
                        store.dispatch(errorSet(unauthorizedRejectionCode, unauthorizedRejectionMessage, undefined));
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    } else {
                        store.dispatch(loadingDisable());
                        reject({ "code": error && error.status ? error.status : defaultRejectionCode, "message": error && error.message ? error.message : defaultRejectionMessage, "details": error && error.response && error.response.body && error.response.body.Details ? error.response.body.Details : undefined });
                    }
                });
        } catch (exception) {
            store.dispatch(loadingDisable());
            reject({ "code": defaultRejectionCode, "message": JSON.stringify(exception), "details": undefined });
        }
    });
    return promise;
}

function storeClearFull() {
    storeClearPartial(true, true, true, true, true);
}

function storeClearPartial(user: boolean, settings: boolean, loading: boolean, dialogs: boolean, error: boolean) {
    if (user) {
        store.dispatch(userClear());
    }
    if (settings) {
        store.dispatch(settingsClear());
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
