import * as React from "react";
import { Panel } from "react-bootstrap";
import { connect } from "react-redux";
import ExternalLink from "../externalLink/externalLink";
import * as routesExternal from "../../constants/routesExternal";

require("./footer.scss");

interface IProps extends React.ClassAttributes<Footer> { }

interface IState { }

export class Footer extends React.Component<IProps, IState> {

    public render() {
        return (
            <div className="component-footer">
                <Panel>
                    <Panel.Body>Created by <ExternalLink href={routesExternal.GITHUB_LINK} newTab={true}>{routesExternal.GITHUB_LABEL}</ExternalLink> | Copyright © {(new Date()).getFullYear()}</Panel.Body>
                </Panel>
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Footer);
