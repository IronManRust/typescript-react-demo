import { IDialogsPopupAction, IDialogsModalAction, DIALOGS_POPUP_ENABLE, DIALOGS_POPUP_DISABLE, DIALOGS_POPUP_CLEAR, DIALOGS_MODAL_ENABLE, DIALOGS_MODAL_DISABLE, DIALOGS_MODAL_CLEAR } from "../constants/dialogs";

export function popupEnable(elementID: string): IDialogsPopupAction {
    return {
        "type": DIALOGS_POPUP_ENABLE,
        "elementID": elementID
    };
}

export function popupDisable(elementID: string): IDialogsPopupAction {
    return {
        "type": DIALOGS_POPUP_DISABLE,
        "elementID": elementID
    };
}

export function popupClear(): IDialogsPopupAction {
    return {
        "type": DIALOGS_POPUP_CLEAR,
        "elementID": ""
    };
}

export function modalEnable(elementID: string): IDialogsModalAction {
    return {
        "type": DIALOGS_MODAL_ENABLE,
        "elementID": elementID
    };
}

export function modalDisable(elementID: string): IDialogsModalAction {
    return {
        "type": DIALOGS_MODAL_DISABLE,
        "elementID": elementID
    };
}

export function modalClear(): IDialogsModalAction {
    return {
        "type": DIALOGS_MODAL_CLEAR,
        "elementID": ""
    };
}
