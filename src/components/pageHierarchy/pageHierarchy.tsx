import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

require("./pageHierarchyCommon.scss");

interface IProps extends React.ClassAttributes<PageHierarchy> { }

interface IState { }

export class PageHierarchy extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_HIERARCHY_LABEL });
        return (
            <div className="component-page-hierarchy">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p><img className="depth-chart" src={require("./pageHierarchy.png")} title="Depth Chart" alt="Depth Chart" /></p>
                <p>This page demonstrates how to navigate through a multiple-level depth hierarchy. This is the top level, and selecting one of the items below will navigate to the next deepest level.</p>
                <ListGroup>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                        return (
                            <LinkContainer to={routes.PAGE_HIERARCHY_ITEM_LINK.replace(":item", item.toString())} key={index}>
                                <ListGroupItem>{routes.PAGE_HIERARCHY_ITEM_LABEL.replace(":item", item.toString())}</ListGroupItem>
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

export default connect<{}, {}, IProps>(mapStateToProps)(PageHierarchy);
