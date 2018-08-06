import * as React from "react";

// TODO: Global Stylesheet
// TODO: Redux Setup
// TODO: React Routing

interface IProps extends React.ClassAttributes<Root> { }

interface IState { }

window.onerror = function(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) {
    // TODO: Log Errors
    console.log(message, { "url": url, "lineNumber": lineNumber, "columnNumber": columnNumber, "error": JSON.stringify(error) });
};

export class Root extends React.Component<IProps, IState> {

    public render() {
        return (
            <div className="container-root">
                <h1>Hello World!</h1>
            </div>
        );
    }

}

export default Root;
