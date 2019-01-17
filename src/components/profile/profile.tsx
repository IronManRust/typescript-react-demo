import * as React from "react";
import { Alert, Button, ButtonToolbar, ControlLabel, FormGroup, FormControl, FormControlProps } from "react-bootstrap";
import { connect } from "react-redux";
import { userSet } from "../../actions/user";
import { store } from "../../containers/root";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";
import { IGlobalState } from "../../reducers/index";
import { IUserState } from "../../reducers/user";

interface IProps extends React.ClassAttributes<Profile> {
    user: IUserState | undefined;
}

interface IState {
    "mode": "display" | "edit";
    "status": "none" | "success" | "error";
    "firstName": string;
    "lastName": string;
    "email": string;
}

export class Profile extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            "mode": "display",
            "status": "none",
            "firstName": "",
            "lastName": "",
            "email": ""
        };

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getValidationStateInput = this.getValidationStateInput.bind(this);
        this.isUpdateDisabled = this.isUpdateDisabled.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleDismissStatus = this.handleDismissStatus.bind(this);
    }

    private handleChangeFirstName(event: React.FormEvent<FormControlProps>) {
        if (typeof (event.currentTarget.value) === "string") {
            this.setState({
                "firstName": event.currentTarget.value
            });
        }
    }

    private handleChangeLastName(event: React.FormEvent<FormControlProps>) {
        if (typeof (event.currentTarget.value) === "string") {
            this.setState({
                "lastName": event.currentTarget.value
            });
        }
    }

    private handleChangeEmail(event: React.FormEvent<FormControlProps>) {
        if (typeof (event.currentTarget.value) === "string") {
            this.setState({
                "email": event.currentTarget.value
            });
        }
    }

    private handleKeyPress(event: React.KeyboardEvent<FormControlProps>) {
        if (event.key === "Enter" && !this.isUpdateDisabled()) {
            this.handleClickUpdate();
        }
    }

    protected getValidationStateInput(value: string) {
        return value.length > 0 ? undefined : "error";
    }

    private isUpdateDisabled() {
        return this.state.firstName.length === 0
            || this.state.lastName.length === 0
            || this.state.email.length === 0;
    }

    private handleClickEdit() {
        this.setState({
            "mode": "edit",
            "status": "none",
            "firstName": this.props.user && this.props.user.firstName ? this.props.user.firstName : "",
            "lastName": this.props.user && this.props.user.lastName ? this.props.user.lastName : "",
            "email": this.props.user && this.props.user.email ? this.props.user.email : ""
        });
    }

    private handleClickUpdate() {
        if (this.props.user &&
            this.props.user.id &&
            this.props.user.token) {
            store.dispatch(userSet(this.props.user.id, this.props.user.token, this.state.email, this.state.firstName, this.state.lastName));
            this.setState({
                "mode": "display",
                "status": "success",
                "firstName": "",
                "lastName": "",
                "email": ""
            });
        } else {
            this.setState({
                "mode": "display",
                "status": "error",
                "firstName": "",
                "lastName": "",
                "email": ""
            });
        }
    }

    private handleClickCancel() {
        this.setState({
            "mode": "display",
            "status": "none",
            "firstName": "",
            "lastName": "",
            "email": ""
        });
    }

    private handleDismissStatus() {
        this.setState({
            "status": "none"
        });
    }

    private renderStatus() {
        if (this.state.status === "success") {
            return (
                <Alert bsStyle="success" onDismiss={this.handleDismissStatus}>
                    <strong>Successfully updated profile.</strong>
                </Alert>
            );
        }
        if (this.state.status === "error") {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismissStatus}>
                    <strong>Unable to update profile. Please try again later.</strong>
                </Alert>
            );
        }
        return undefined;
    }

    private renderDisplay() {
        if (this.state.mode === "display") {
            return (
                <div>
                    <FormGroup>
                        <ControlLabel>First name</ControlLabel>
                        <FormControl.Static>{this.props.user && this.props.user.firstName ? this.props.user.firstName : ""}</FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Last name</ControlLabel>
                        <FormControl.Static>{this.props.user && this.props.user.lastName ? this.props.user.lastName : ""}</FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl.Static>{this.props.user && this.props.user.email ? this.props.user.email : ""}</FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="primary" onClick={this.handleClickEdit}>Edit</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </div>
            );
        } else {
            return undefined;
        }
    }

    private renderEdit() {
        if (this.state.mode === "edit") {
            return (
                <div>
                    <FormGroup validationState={this.getValidationStateInput(this.state.firstName)}>
                        <ControlLabel>First name</ControlLabel>
                        <FormControl type="text" value={this.state.firstName} placeholder="First name" onChange={this.handleChangeFirstName} onKeyPress={this.handleKeyPress} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={this.getValidationStateInput(this.state.lastName)}>
                        <ControlLabel>Last name</ControlLabel>
                        <FormControl type="text" value={this.state.lastName} placeholder="Last name" onChange={this.handleChangeLastName} onKeyPress={this.handleKeyPress} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={this.getValidationStateInput(this.state.email)}>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl type="email" value={this.state.email} placeholder="Email address" onChange={this.handleChangeEmail} onKeyPress={this.handleKeyPress} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="primary" disabled={this.isUpdateDisabled()} onClick={this.handleClickUpdate}>Update</Button>
                            <Button type="submit" onClick={this.handleClickCancel}>Cancel</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </div>
            );
        } else {
            return undefined;
        }
    }

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.PROFILE_LABEL });
        return (
            <div className="component-profile">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                {this.renderStatus()}
                {this.renderDisplay()}
                {this.renderEdit()}
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "user": state.user || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(Profile);
