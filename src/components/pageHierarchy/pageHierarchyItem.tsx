import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

require("./pageHierarchyCommon.scss");

interface IProps extends React.ClassAttributes<PageHierarchyItem> {
    item: number;
}

interface IState { }

export class PageHierarchyItem extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": routes.PAGE_HIERARCHY_LINK, "label": routes.PAGE_HIERARCHY_LABEL });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_HIERARCHY_ITEM_LABEL.replace(":item", this.props.item.toString()) });
        return (
            <div className="component-page-hierarchy-item">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p><img className="depth-chart" src={require("./pageHierarchyItem.png")} title="Depth Chart" alt="Depth Chart" /></p>
                <p>This page demonstrates how to navigate through a multiple-level depth hierarchy. This is the second level, and selecting one of the items below will navigate to the next deepest level.</p>
                <ListGroup>
                {
                    ["A", "B", "C", "D", "E", "F", "G"].map((subItem, index) => {
                        return (
                            <LinkContainer to={routes.PAGE_HIERARCHY_SUBITEM_LINK.replace(":item", this.props.item.toString()).replace(":subItem", subItem)} key={index}>
                                <ListGroupItem>{routes.PAGE_HIERARCHY_SUBITEM_LABEL.replace(":item", this.props.item.toString()).replace(":subItem", subItem)}</ListGroupItem>
                            </LinkContainer>
                        );
                    })
                }
                </ListGroup>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(PageHierarchyItem);
