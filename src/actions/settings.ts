import { ISettingsAction, SETTING_SET, SETTING_REMOVE, SETTINGS_CLEAR } from "../constants/settings";
import { ISetting } from "../types/setting";

export function settingSet(setting: ISetting): ISettingsAction {
    return {
        "type": SETTING_SET,
        setting
    };
}

export function settingRemove(setting: ISetting): ISettingsAction {
    return {
        "type": SETTING_REMOVE,
        setting
    };
}

export function settingsClear(): ISettingsAction {
    return {
        "type": SETTINGS_CLEAR,
        "setting": undefined
    };
}
