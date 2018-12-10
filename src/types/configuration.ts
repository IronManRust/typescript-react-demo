export interface IConfiguration {
    environment: string;
    domain: string;
}

export namespace IConfiguration {

    export function getEmptyConfiguration(): IConfiguration {
        return {
            "environment": "",
            "domain": ""
        };
    }

}
