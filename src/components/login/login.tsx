import * as React from "react";
import { Alert, Button, ButtonToolbar, ControlLabel, FormGroup, FormControl, FormControlProps } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { IGlobalState } from "../../reducers/index";
import { ILoadingState } from "../../reducers/loading";
import * as routes from "../../constants/routes";
import { login } from "../../utils/session";
import Header from "../header/header";
import Loading from "../loading/loading";

interface IProps extends React.ClassAttributes<Login> {
    loading: ILoadingState | undefined;
}

interface IState {
    email: string;
    password: string;
    error: boolean;
    redirect: boolean;
}

export class Login extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            "email": "",
            "password": "",
            "error": false,
            "redirect": false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleDismissError = this.handleDismissError.bind(this);
    }

    private handleChangeEmail(event: React.FormEvent<FormControlProps>) {
        if (typeof (event.currentTarget.value) === "string") {
            this.setState({
                "email": event.currentTarget.value
            });
        }
    }

    private handleChangePassword(event: React.FormEvent<FormControlProps>) {
        if (typeof (event.currentTarget.value) === "string") {
            this.setState({
                "password": event.currentTarget.value
            });
        }
    }

    private handleKeyPress(event: React.KeyboardEvent<FormControlProps>) {
        if (event.key === "Enter") {
            this.handleClickLogin();
        }
    }

    private handleClickLogin() {
        login(this.state.email, this.state.password)
            .then((success) => {
                this.setState({
                    "error": !success,
                    "redirect": success
                });
            }).catch(() => {
                this.setState({
                    "error": true,
                    "redirect": false
                });
            });
    }

    private handleDismissError() {
        this.setState({
            "error": false,
            "redirect": false
        });
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
        if (this.state.redirect) {
            return (
                <Redirect to={routes.HOME_LINK} />
            );
        } else {
            return undefined;
        }
    }

    private renderError() {
        if (this.state.error) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismissError}>
                    <strong>Unable to log in.</strong>
                </Alert>
            );
        } else {
            return undefined;
        }
    }

    private renderForm() {
        if (this.state.redirect) {
            return undefined;
        } else {
            return (
                <div>
                    <Header user={undefined} breadcrumbs={[]} />
                    <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl type="email" value={this.state.email} placeholder="Email address" onChange={this.handleChangeEmail} onKeyPress={this.handleKeyPress} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword} onKeyPress={this.handleKeyPress} />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="primary" onClick={this.handleClickLogin}>Login</Button>
                        </ButtonToolbar>
                    </FormGroup>
                    <FormGroup>
                        <Link to={routes.FORGOT_LOGIN_LINK}>Forgot your login informaton?</Link>
                    </FormGroup>
                </div>
            );
        }
    }

    public render() {
        return (
            <div className="component-login">
                {this.renderLoading()}
                {this.renderRedirect()}
                {this.renderError()}
                {this.renderForm()}
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "loading": state.loading || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(Login);
