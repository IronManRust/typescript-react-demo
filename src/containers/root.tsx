import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./app";
import Login from "../components/login/login";
import ForgotLogin from "../components/forgotLogin/forgotLogin";
import Home from "../components/home/home";
import Error404 from "../components/error404/error404";
import * as routes from "../constants/routes";
import reducers from "../reducers/index";
import { isAuthenticated } from "../utils/session";

/* tslint:disable:no-any */
declare const window: Window & { devToolsExtension: any; __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* tslint:enable:no-any */

export const store = createStore(reducers, (composeEnhancers(applyMiddleware(thunk))));

interface IProps extends React.ClassAttributes<Root> { }

interface IState { }

window.onerror = function(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) {
    console.log(message, { "url": url, "lineNumber": lineNumber, "columnNumber": columnNumber, "error": JSON.stringify(error) });
    // TODO: Remote Logging
};

export class Root extends React.Component<IProps, IState> {

    public render() {
        // TODO: Additional Page Components
        return (
            <div className="container-root">
                <Provider store={store}>
                    <HashRouter>
                        <Switch>
                            <Route
                                path={routes.ROOT}
                                exact={true}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<Redirect to={routes.HOME} />) : (<Redirect to={routes.LOGIN} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.LOGIN}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<Redirect to={routes.HOME} />) : (<Login loading={undefined} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.FORGOT_LOGIN}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<Redirect to={routes.HOME} />) : (<ForgotLogin />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.HOME}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App user={undefined} loading={undefined} dialogs={undefined} error={undefined}><Home /></App>) : (<Redirect to={routes.LOGIN} />)
                                    );
                                }}
                            />
                            <Route
                                render={() => {
                                    return (
                                        <Error404 />
                                    );
                                }}
                            />
                        </Switch>
                    </HashRouter>
                </Provider>
            </div>
        );
    }

}

export default Root;
