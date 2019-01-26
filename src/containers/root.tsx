import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./app";
import Login from "../components/login/login";
import ForgotLogin from "../components/forgotLogin/forgotLogin";
import Home from "../components/home/home";
import Profile from "../components/profile/profile";
import Settings from "../components/settings/settings";
import Pages from "../components/pages/pages";
import PageErrors from "../components/pageErrors/pageErrors";
import PageHierarchy from "../components/pageHierarchy/pageHierarchy";
import PageHierarchyItem from "../components/pageHierarchy/pageHierarchyItem";
import PageHierarchySubItem from "../components/pageHierarchy/pageHierarchySubItem";
import PagePopups from "../components/pagePopups/pagePopups";
import About from "../components/about/about";
import Error404 from "../components/error404/error404";
import * as routes from "../constants/routes";
import reducers from "../reducers/index";
import { logErrorBrowser } from "../utils/logging";
import { isAuthenticated } from "../utils/session";

require("../stylesheets/main.scss");

/* tslint:disable:no-any */
declare const window: Window & { devToolsExtension: any; __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* tslint:enable:no-any */

export const store = createStore(reducers, (composeEnhancers(applyMiddleware(thunk))));

interface IProps extends React.ClassAttributes<Root> { }

interface IState { }

window.onerror = function(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) {
    logErrorBrowser(message, url, lineNumber, columnNumber, error);
};

export class Root extends React.Component<IProps, IState> {

    public render() {
        return (
            <div className="container-root">
                <Provider store={store}>
                    <HashRouter>
                        <Switch>
                            <Route
                                path={routes.ROOT_LINK}
                                exact={true}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<Redirect to={routes.HOME_LINK} />) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.LOGIN_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<Redirect to={routes.HOME_LINK} />) : (<Login loading={undefined} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.FORGOT_LOGIN_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<Redirect to={routes.HOME_LINK} />) : (<ForgotLogin />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.HOME_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><Home /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PROFILE_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><Profile user={undefined} /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.SETTINGS_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><Settings settings={undefined} /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PAGES_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><Pages /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PAGE_ERRORS_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><PageErrors /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PAGE_HIERARCHY_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><PageHierarchy /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PAGE_HIERARCHY_ITEM_LINK}
                                render={(props) => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><PageHierarchyItem item={props.match.params.item} /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PAGE_HIERARCHY_SUBITEM_LINK}
                                render={(props) => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><PageHierarchySubItem item={props.match.params.item} subItem={props.match.params.subItem} /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.PAGE_POPUPS_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><PagePopups /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
                                    );
                                }}
                            />
                            <Route
                                path={routes.ABOUT_LINK}
                                render={() => {
                                    return (
                                        isAuthenticated() ? (<App loading={undefined} error={undefined}><About /></App>) : (<Redirect to={routes.LOGIN_LINK} />)
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
