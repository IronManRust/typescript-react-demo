import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

require("./pageHierarchyCommon.scss");

interface IProps extends React.ClassAttributes<PageHierarchySubItem> {
    item: number;
    subItem: string;
}

interface IState { }

export class PageHierarchySubItem extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": routes.PAGE_HIERARCHY_LINK, "label": routes.PAGE_HIERARCHY_LABEL });
        breadcrumbs.push({ "link": routes.PAGE_HIERARCHY_ITEM_LINK.replace(":item", this.props.item.toString()), "label": routes.PAGE_HIERARCHY_ITEM_LABEL.replace(":item", this.props.item.toString()) });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_HIERARCHY_SUBITEM_LABEL.replace(":item", this.props.item.toString()).replace(":subItem", this.props.subItem) });
        return (
            <div className="component-page-hierarchy-sub-item">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p><img className="depth-chart" src={require("./pageHierarchySubItem.png")} title="Depth Chart" alt="Depth Chart" /></p>
                <p>This page demonstrates how to navigate through a multiple-level depth hierarchy. This is the third level, and for demonstration purposes the deepest level possible.</p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(PageHierarchySubItem);
