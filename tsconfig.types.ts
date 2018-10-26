/* tslint:disable:no-any */

// Basic Types

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.xml" {
    const value: any;
    export default value;
}

// NPM Packages

declare module "fixed-width-string" {
    const fixedWidthString: (str: string | undefined, width: number, options?: {}) => string;
    export default fixedWidthString;
}

declare module "react-cookie" {
    export const load: (key: string, options: {}) => string;
    export const save: (key: string, value: string, options: {}) => void;
    export const remove: (key: string, options: {}) => void;
}

/* tslint:enable:no-any */
