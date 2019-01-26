import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<Pages> { }

interface IState { }

export class Pages extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.PAGES_LABEL });
        return (
            <div className="component-pages">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is a list of feature pages that each illustrate a specific design or architectural pattern contained in this site.</p>
                <ListGroup>
                    <LinkContainer to={routes.PAGE_ERRORS_LINK}>
                        <ListGroupItem>{routes.PAGE_ERRORS_LABEL}</ListGroupItem>
                    </LinkContainer>
                    <LinkContainer to={routes.PAGE_HIERARCHY_LINK}>
                        <ListGroupItem>{routes.PAGE_HIERARCHY_LABEL}</ListGroupItem>
                    </LinkContainer>
                    <LinkContainer to={routes.PAGE_POPUPS_LINK}>
                        <ListGroupItem>{routes.PAGE_POPUPS_LABEL}</ListGroupItem>
                    </LinkContainer>
                </ListGroup>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Pages);
