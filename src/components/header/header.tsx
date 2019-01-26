import * as React from "react";
import { Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as routes from "../../constants/routes";
import { logout } from "../../utils/session";
import { IGlobalState } from "../../reducers/index";
import { IUserState } from "../../reducers/user";
import { IBreadcrumb } from "../../types/breadcrumb";

require("./header.scss");

interface IProps extends React.ClassAttributes<Header> {
    user: IUserState | undefined;
    breadcrumbs: IBreadcrumb[];
}

interface IState {
    "redirect": boolean;
}

export class Header extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            "redirect": false
        };

        this.onSelectLogout = this.onSelectLogout.bind(this);
    }

    protected onSelectLogout() {
        logout()
            .then((success) => {
                this.setState({
                    "redirect": success
                });
            }).catch(() => {
                this.setState({
                    "redirect": false
                });
            });
    }

    private renderRedirect() {
        if (this.state.redirect) {
            return (
                <Redirect to={routes.LOGIN_LINK} />
            );
        } else {
            return undefined;
        }
    }

    private renderBreadcrumbs() {
        return (
            <Nav>
            {
                this.props.breadcrumbs.map((breadcrumb, index) => {
                    if (breadcrumb.link) {
                        return (
                            <NavItem key={index} href={`#${breadcrumb.link}`}>{breadcrumb.label}</NavItem>
                        );
                    } else {
                        return (
                            <NavItem key={index} disabled={true}>{breadcrumb.label}</NavItem>
                        );
                    }
                })
            }
            </Nav>
        );
    }

    private renderMenu() {
        if (this.props.user &&
            this.props.user.id) {
            return (
                <Nav pullRight={true}>
                    <NavDropdown id="component-header-menu" title={<div className="user"><Glyphicon glyph="user" /> {this.props.user.firstName}</div>}>
                        <MenuItem href={`#${routes.PROFILE_LINK}`}>{routes.PROFILE_LABEL}</MenuItem>
                        <MenuItem href={`#${routes.SETTINGS_LINK}`}>{routes.SETTINGS_LABEL}</MenuItem>
                        <MenuItem divider={true} />
                        <MenuItem onSelect={this.onSelectLogout}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight={true}>
                    <NavItem href={`#${routes.LOGIN_LINK}`}>{routes.LOGIN_LABEL}</NavItem>
                </Nav>
            );
        }
    }

    public render() {
        return (
            <div className="component-header">
                {this.renderRedirect()}
                <Navbar fluid={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Navbar.Link href={`#${routes.ROOT_LINK}`}><img className="logo" src={require("./header.png")} title="Logo" alt="Logo" /> {routes.ROOT_LABEL}</Navbar.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {this.renderBreadcrumbs()}
                        {this.renderMenu()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "user": state.user || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(Header);
