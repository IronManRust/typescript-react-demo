import * as React from "react";
import { Button, ButtonToolbar, FormGroup, FormControl, FormControlProps } from "react-bootstrap";
import { connect } from "react-redux";
import { popupEnable, popupDisable, popupClear } from "../../actions/dialogs";
import { store } from "../../containers/root";
import Footer from "../footer/footer";
import Header from "../header/header";
import { IGlobalState } from "../../reducers/index";
import { IDialogsState } from "../../reducers/dialogs";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<PagePopups> {
    dialogs: IDialogsState | undefined;
}

interface IState {
    popupElementID: string;
}

export class PagePopups extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            "popupElementID": ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClickSubmitEnable = this.handleClickSubmitEnable.bind(this);
        this.handleClickSubmitDisable = this.handleClickSubmitDisable.bind(this);
        this.handleClickSubmitClear = this.handleClickSubmitClear.bind(this);
    }

    private handleChange(event: React.FormEvent<FormControlProps>) {
        if (typeof (event.currentTarget.value) === "string") {
            this.setState({
                "popupElementID": event.currentTarget.value
            });
        }
    }

    private handleClickSubmitEnable() {
        store.dispatch(popupEnable(this.state.popupElementID));
        this.setState({
            "popupElementID": ""
        });
    }

    private handleClickSubmitDisable() {
        store.dispatch(popupDisable(this.state.popupElementID));
        this.setState({
            "popupElementID": ""
        });
    }

    private handleClickSubmitClear() {
        store.dispatch(popupClear());
        this.setState({
            "popupElementID": ""
        });
    }

    protected renderButtons() {
        const enabledItem = this.state.popupElementID.length > 0;
        const enabledList = this.props.dialogs && this.props.dialogs.popupElementIDs && this.props.dialogs.popupElementIDs.length > 0;
        return (
            <div>
                <FormGroup>
                    <FormControl value={this.state.popupElementID} placeholder="ElementID of a popup to enable / disable" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button type="submit" bsStyle="success" onClick={this.handleClickSubmitEnable} disabled={!enabledItem}>Enable</Button>
                        <Button type="submit" bsStyle="danger" onClick={this.handleClickSubmitDisable} disabled={!enabledItem}>Disable</Button>
                        <Button type="submit" bsStyle="danger" onClick={this.handleClickSubmitClear} disabled={!enabledList}>Clear</Button>
                    </ButtonToolbar>
                </FormGroup>
            </div>
        );
    }

    private renderDisplay() {
        if (this.props.dialogs &&
            this.props.dialogs.popupElementIDs &&
            this.props.dialogs.popupElementIDs.length > 0) {
            return (
                <div>
                    <p>The following popup elementIDs are enabled:</p>
                    <ul>
                        {
                            this.props.dialogs.popupElementIDs.map((popupElementID, index) => {
                                return (
                                    <li key={index}>{popupElementID}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return (
                <p><em>There are no popup elementIDs enabled.</em></p>
            );
        }
    }

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_POPUPS_LABEL });
        return (
            <div className="component-page-popups">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This page demonstrates how to use the Redux store to enable and disable display elements, such as popup controls, on other parts of the application not accessible to a particular component's local state.</p>
                <p>Only the dispatch mechanism is shown, as no popup controls are actually listening to the Redux props.</p>
                {this.renderButtons()}
                {this.renderDisplay()}
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "dialogs": state.dialogs || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(PagePopups);
