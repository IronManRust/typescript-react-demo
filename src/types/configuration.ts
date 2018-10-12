export interface IConfiguration {
    environment: string;
}

export namespace IConfiguration {

    export function getEmptyConfiguration(): IConfiguration {
        return {
            "environment": ""
        };
    }

}
