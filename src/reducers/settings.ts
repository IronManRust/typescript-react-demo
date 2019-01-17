import * as settings from "../constants/settings";
import { fromJS } from "immutable";
import { ISetting } from "../types/setting";

export interface ISettingsState {
    values: ISetting[];
}

type SettingsAction = settings.ISettingsAction | settings.IOtherAction;

const INITIAL_STATE: ISettingsState = fromJS({
    "values": []
});

function getValues(state: ISettingsState, setting: ISetting | undefined, includeSetting: boolean) {
    const values: ISetting[] = [];
    if (state && state.values && state.values.length > 0) {
        for (const value of state.values) {
            if (value && setting && value.Key !== setting.Key) {
                values.push(value);
            }
        }
    }
    if (includeSetting && setting) {
        values.push(setting);
    }
    return values;
}

export default function reducer(state: ISettingsState = INITIAL_STATE, action: SettingsAction = settings.otherAction): ISettingsState {
    switch (action.type) {
        case settings.SETTING_SET:
            return Object.assign({}, state, { "values": getValues(state, action.setting, true) });
        case settings.SETTING_REMOVE:
            return Object.assign({}, state, { "values": getValues(state, action.setting, false) });
        case settings.SETTINGS_CLEAR:
            return Object.assign({}, state, { "values": [] });
        default:
            return state;
    }
}
