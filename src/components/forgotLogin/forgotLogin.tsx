import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
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
                <p>This is the forgot login page. It is an example of a page you can navigate to without being authenticated. That said, everything you need to know to login is on the login page ...</p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(ForgotLogin);
