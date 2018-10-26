import * as React from "react";
import { connect } from "react-redux";

interface IProps extends React.ClassAttributes<Home> { }

interface IState { }

export class Home extends React.Component<IProps, IState> {

    public render() {
        // TODO: Include Header And Content
        return (
            <div className="component-home">
                <h1>Home!</h1>
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Home);
