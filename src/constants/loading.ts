export type LOADING_ENABLE = "LOADING_ENABLE";
export const LOADING_ENABLE: LOADING_ENABLE = "LOADING_ENABLE";
export type LOADING_DISABLE = "LOADING_DISABLE";
export const LOADING_DISABLE: LOADING_DISABLE = "LOADING_DISABLE";

export interface ILoadingAction {
    type: LOADING_ENABLE | LOADING_DISABLE;
}

export interface IOtherAction {
    type: "";
}

export const otherAction: IOtherAction = { "type": "" };
