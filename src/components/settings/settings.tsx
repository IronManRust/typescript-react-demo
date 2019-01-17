import * as React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";
import { IGlobalState } from "../../reducers/index";
import { ISettingsState } from "../../reducers/settings";

interface IProps extends React.ClassAttributes<Settings> {
    settings: ISettingsState | undefined;
}

interface IState { }

export class Settings extends React.Component<IProps, IState> {

    private renderSettings() {
        if (this.props.settings &&
            this.props.settings.values &&
            this.props.settings.values.length > 0) {
            return (
                <Table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.settings.values.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.Type}</td>
                                    <td>{value.Key}</td>
                                    <td>{value.Value}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            );
        } else {
            return (
                <p>There are no settings.</p>
            );
        }
    }

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.SETTINGS_LABEL });
        return (
            <div className="component-settings">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is the settings page.</p>
                {this.renderSettings()}
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "settings": state.settings || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(Settings);
