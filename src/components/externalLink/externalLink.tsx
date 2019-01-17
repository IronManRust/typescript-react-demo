import * as React from "react";
import { connect } from "react-redux";

interface IProps extends React.ClassAttributes<ExternalLink> {
    href: string;
    newTab: boolean;
}

interface IState { }

export class ExternalLink extends React.Component<IProps, IState> {

    private renderLink() {
        if (this.props.newTab) {
            return (
                <a href={this.props.href} target="_blank" rel="noreferrer">
                    {this.props.children}
                </a>
            );
        } else {
            return (
                <a href={this.props.href}>
                    {this.props.children}
                </a>
            );
        }
    }

    public render() {
        return (
            <span className="component-external-link">
                {this.renderLink()}
            </span>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(ExternalLink);
