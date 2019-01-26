export function logErrorBrowser(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) {
    console.log("Browser Error", { "message": message, "url": url, "lineNumber": lineNumber, "columnNumber": columnNumber, "error": JSON.stringify(error) });
    // Perform any additional logging to a remote API here.
}

export function logErrorState(code: number, message: string, elementID: string | undefined) {
    console.log("State Error", { "code": code, "message": message, "elementID": elementID });
    // Perform any additional logging to a remote API here.
}
