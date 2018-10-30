import * as React from "react";
import { connect } from "react-redux";
import Header from "../header/header";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<Settings> { }

interface IState { }

export class Settings extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.SETTINGS_LABEL });
        return (
            <div className="component-settings">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is the settings page.</p>
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(Settings);
