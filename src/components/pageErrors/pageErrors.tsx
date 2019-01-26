import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<PageErrors> { }

interface IState { }

export class PageErrors extends React.Component<IProps, IState> {

    public render() {
        // TODO: Update Paragraph Text / Demonstrate Error Actions
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_ERRORS_LABEL });
        return (
            <div className="component-page-errors">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is the errors page.</p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(PageErrors);
