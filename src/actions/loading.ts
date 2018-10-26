import { ILoadingAction, LOADING_ENABLE, LOADING_DISABLE } from "../constants/loading";

export function loadingEnable(): ILoadingAction {
    return {
        "type": LOADING_ENABLE
    };
}

export function loadingDisable(): ILoadingAction {
    return {
        "type": LOADING_DISABLE
    };
}
