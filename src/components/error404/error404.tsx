import * as React from "react";
import { connect } from "react-redux";

interface IProps extends React.ClassAttributes<Error404> { }

interface IState { }

export class Error404 extends React.Component<IProps, IState> {

    public render() {
        // TODO: Include Header And Content
        return (
            <div className="component-error404">
                <h1>Error404!</h1>
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Error404);
