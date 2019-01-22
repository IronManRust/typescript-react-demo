import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

require("./error404.scss");

interface IProps extends React.ClassAttributes<Error404> { }

interface IState { }

export class Error404 extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.ERROR_404_LABEL });
        return (
            <div className="component-error404">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <h1>That was unexpected ...</h1>
                <p>We can't seem to find the page you're looking for.</p>
                <p><img className="oops" src={require("./error404.png")} title="Oops" alt="Oops" /></p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Error404);
