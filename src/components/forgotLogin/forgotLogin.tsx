import * as React from "react";
import { connect } from "react-redux";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<ForgotLogin> { }

interface IState { }

export class ForgotLogin extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.FORGOT_LOGIN_LABEL });
        return (
            <div className="component-forgot-login">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is the forgot login page.</p>
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(ForgotLogin);
