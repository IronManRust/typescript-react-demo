import { IConfiguration } from "../types/configuration";
import config from "./config.json";

export function configuration(): IConfiguration {
    const environment = process.env.NODE_ENV;
    if (environment) {
        return config[environment] || IConfiguration.getEmptyConfiguration();
    } else {
        return IConfiguration.getEmptyConfiguration();
    }
}
