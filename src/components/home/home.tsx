import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<Home> { }

interface IState { }

export class Home extends React.Component<IProps, IState> {

    public render() {
        return (
            <div className="component-home">
                <Header user={undefined} breadcrumbs={[]} />
                <p>This is the home page. It illustrates a standard navigation pattern, including:</p>
                <ul>
                    <li>A header with a home link, breadcrumb section and drop-down menu</li>
                    <li>A footer with attribution information</li>
                    <li>Page content, complete with links</li>
                    <li>Responsive styling</li>
                </ul>
                <ListGroup>
                    <LinkContainer to={routes.PAGES_LINK}>
                        <ListGroupItem>{routes.PAGES_LABEL}</ListGroupItem>
                    </LinkContainer>
                    <LinkContainer to={routes.ABOUT_LINK}>
                        <ListGroupItem>{routes.ABOUT_LABEL}</ListGroupItem>
                    </LinkContainer>
                    <LinkContainer to="/invalid">
                        <ListGroupItem>Who knows ...</ListGroupItem>
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

export default connect<{}, {}, IProps>(mapStateToProps)(Home);
