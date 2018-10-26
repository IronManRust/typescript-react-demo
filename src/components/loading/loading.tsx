import * as React from "react";
import { connect } from "react-redux";
import Loader from "react-loader";

require("./loading.scss");

interface IProps extends React.ClassAttributes<Loading> {
    enabled: boolean;
}

interface IState { }

export class Loading extends React.Component<IProps, IState> {

    public render() {
        return (
            <div className="component-loading">
                <Loader loaded={!this.props.enabled} />
                {this.props.enabled && <div className="overlay" />}
            </div>
        );
    }

}

const mapStateToProps = ({}, ownProps: IProps) => {
    return {
        "enabled": ownProps.enabled
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(Loading);
