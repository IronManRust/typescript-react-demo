import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<PagePopups> { }

interface IState { }

export class PagePopups extends React.Component<IProps, IState> {

    public render() {
        // TODO: Update Paragraph Text / Demonstrate Popup Actions
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_POPUPS_LABEL });
        return (
            <div className="component-page-popups">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is the popups page.</p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(PagePopups);
