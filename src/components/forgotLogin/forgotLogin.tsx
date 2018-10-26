import * as React from "react";
import { connect } from "react-redux";

interface IProps extends React.ClassAttributes<ForgotLogin> { }

interface IState { }

export class ForgotLogin extends React.Component<IProps, IState> {

    public render() {
        // TODO: Include Header And Content
        return (
            <div className="component-forgot-login">
                <h1>Forgot Login!</h1>
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(ForgotLogin);
