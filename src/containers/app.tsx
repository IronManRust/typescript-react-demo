import * as React from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as status from "statuses";
import { IGlobalState } from "../reducers/index";
import { ILoadingState } from "../reducers/loading";
import { IErrorState } from "../reducers/error";
import { store } from "../containers/root";
import { errorClear } from "../actions/error";
import * as routes from "../constants/routes";
import Interstitial from "../components/interstitial/interstitial";
import Loading from "../components/loading/loading";
import { logErrorState } from "../utils/logging";

interface IProps extends React.ClassAttributes<App> {
    loading: ILoadingState | undefined;
    error: IErrorState | undefined;
}

interface IState {
    enableInterstitials: boolean;
}

export class App extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            "enableInterstitials": false
        };

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    private notificationDelay = 2000;

    public componentWillMount() {
        if (this.props.error &&
            this.props.error.code &&
            this.props.error.code >= 500 &&
            this.props.error.message) {
            // The error code is unexpected, so we should log it.
            logErrorState(this.props.error.code, this.props.error.message, this.props.error.elementID);
        }
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.error &&
            nextProps.error.code &&
            nextProps.error.code >= 500 &&
            nextProps.error.message) {
            // The error code is unexpected, so we should log it.
            logErrorState(nextProps.error.code, nextProps.error.message, nextProps.error.elementID);
        }
    }

    public componentDidMount() {
        setTimeout(() => {
            this.setState({
                "enableInterstitials": true
            });
        }, this.notificationDelay);
    }

    protected handleDismiss() {
        store.dispatch(errorClear());
    }

    private renderLoading() {
        if (this.props.loading) {
            return (
                <Loading enabled={this.props.loading.enabled} />
            );
        } else {
            return undefined;
        }
    }

    private renderRedirect() {
        if (this.props.error &&
            this.props.error.code &&
            this.props.error.code === status.Unauthorized) {
            return (
                <Redirect to={routes.LOGIN_LINK} />
            );
        } else {
            return undefined;
        }
    }

    private renderError() {
        if (this.props.error &&
            this.props.error.code &&
            this.props.error.message) {
            // The error has at least a valid code and message.
            if (!this.props.error.elementID) {
                // The error does not belong to a specific element, so it's a global error and we should show it at the top.
                return (
                    <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <strong>Error {this.props.error.code}</strong> - {this.props.error.message}
                    </Alert>
                );
            } else {
                // The error belongs to a specific element, so the invoking component should handle displaying it.
                return undefined;
            }
        } else {
            // The error is missing either a valid code or message.
            return undefined;
        }
    }

    private renderInterstitials() {
        if (this.state.enableInterstitials) {
            return (
                // There is currently only a single interstitial page listed, but multiple can be added here.
                <div>
                    <Interstitial settings={undefined} />
                </div>
            );
        } else {
            return undefined;
        }
    }

    public render() {
        return (
            <div className="container-app">
                {this.renderLoading()}
                {this.renderRedirect()}
                {this.renderError()}
                {this.renderInterstitials()}
                {this.props.children}
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "loading": state.loading || undefined,
        "error": state.error || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(App);
