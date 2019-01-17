import { ISetting } from "../types/setting";

export function getSetting(settings: ISetting[], key: string): ISetting | undefined {
    if (settings) {
        for (const setting of settings) {
            if (setting && setting.Key === key) {
                return setting;
            }
        }
    }
    return undefined;
}
