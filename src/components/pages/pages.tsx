import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<Pages> { }

interface IState { }

export class Pages extends React.Component<IProps, IState> {

    public render() {
        // TODO: Demo All Redux Actions (Errors, Popups, ...)
        // TODO: Demo Deeper Page URLs
        // TODO: Update Paragraph Text
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.PAGES_LABEL });
        return (
            <div className="component-pages">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is the feature pages page.</p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Pages);
