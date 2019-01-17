import { ISetting } from "../types/setting";

export type SETTING_SET = "SETTING_SET";
export const SETTING_SET: SETTING_SET = "SETTING_SET";
export type SETTING_REMOVE = "SETTING_REMOVE";
export const SETTING_REMOVE: SETTING_REMOVE = "SETTING_REMOVE";
export type SETTINGS_CLEAR = "SETTINGS_CLEAR";
export const SETTINGS_CLEAR: SETTINGS_CLEAR = "SETTINGS_CLEAR";

export interface ISettingsAction {
    type: SETTING_SET | SETTING_REMOVE | SETTINGS_CLEAR;
    setting: ISetting | undefined;
}

export interface IOtherAction {
    type: "";
}

export const otherAction: IOtherAction = { "type": "" };
