export interface ISetting {
    Type: "String" | "Number" | "Date" | "Boolean";
    Key: string;
    Value: string;
}

export namespace ISetting {

    export const settingTypes = [
        "String",
        "Number",
        "Date",
        "Boolean"
    ];

}
