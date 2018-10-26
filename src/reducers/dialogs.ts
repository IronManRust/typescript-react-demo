import * as dialogs from "../constants/dialogs";
import { fromJS } from "immutable";

export interface IDialogsState {
    popupElementIDs: string[];
    modalElementIDs: string[];
}

type DialogsAction = dialogs.IDialogsPopupAction | dialogs.IDialogsModalAction | dialogs.IOtherAction;

const INITIAL_STATE: IDialogsState = fromJS({
    "popupElementIDs": [],
    "modalElementIDs": []
});

export default function reducer(state: IDialogsState = INITIAL_STATE, action: DialogsAction = dialogs.otherAction): IDialogsState {
    switch (action.type) {
        case dialogs.DIALOGS_POPUP_ENABLE:
            return Object.assign({}, state, {
                "popupElementIDs": state.popupElementIDs ? state.popupElementIDs.concat(action.elementID) : [action.elementID],
                "modalElementIDs": state.modalElementIDs
            });
        case dialogs.DIALOGS_POPUP_DISABLE:
            return Object.assign({}, state, {
                "popupElementIDs": state.popupElementIDs ? state.popupElementIDs.filter(function(elementID) { return elementID !== action.elementID; }) : [],
                "modalElementIDs": state.modalElementIDs
            });
        case dialogs.DIALOGS_POPUP_CLEAR:
            return Object.assign({}, state, {
                "popupElementIDs": [],
                "modalElementIDs": state.modalElementIDs
            });
        case dialogs.DIALOGS_MODAL_ENABLE:
            return Object.assign({}, state, {
                "popupElementIDs": state.popupElementIDs,
                "modalElementIDs": state.modalElementIDs ? state.modalElementIDs.concat(action.elementID) : [action.elementID]
            });
        case dialogs.DIALOGS_MODAL_DISABLE:
            return Object.assign({}, state, {
                "popupElementIDs": state.popupElementIDs,
                "modalElementIDs": state.modalElementIDs ? state.modalElementIDs.filter(function(elementID) { return elementID !== action.elementID; }) : []
            });
        case dialogs.DIALOGS_MODAL_CLEAR:
            return Object.assign({}, state, {
                "popupElementIDs": state.popupElementIDs,
                "modalElementIDs": []
            });
        default:
            return state;
    }
}
