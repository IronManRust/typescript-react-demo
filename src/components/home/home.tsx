import * as React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";

interface IProps extends React.ClassAttributes<Home> { }

interface IState { }

export class Home extends React.Component<IProps, IState> {

    public render() {
        return (
            <div className="component-home">
                <Header user={undefined} breadcrumbs={[]} />
                <p>This is the home page.</p>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Home);
