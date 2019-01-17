import * as React from "react";
import { Alert, Button, ButtonToolbar, FormGroup, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { settingSet } from "../../actions/settings";
import { store } from "../../containers/root";
import { IGlobalState } from "../../reducers/index";
import { ISettingsState } from "../../reducers/settings";
import { getSetting } from "../../utils/setting";

interface IProps extends React.ClassAttributes<Interstitial> {
    settings: ISettingsState | undefined;
}

interface IState {
    show: boolean;
    result: boolean | undefined;
}

export class Interstitial extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            "show": false,
            "result": undefined
        };

        this.handleClickSubmitAccept = this.handleClickSubmitAccept.bind(this);
        this.handleClickSubmitDecline = this.handleClickSubmitDecline.bind(this);
    }

    private settingKey = "InterstitialPrompt";

    public componentWillMount() {
        if (this.props.settings) {
            const setting = getSetting(this.props.settings.values, this.settingKey);
            if (setting === undefined) {
                this.setState({
                    "show": true,
                    "result": undefined
                });
            }
        } else {
            this.setState({
                "show": true,
                "result": undefined
            });
        }
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.settings) {
            const setting = getSetting(nextProps.settings.values, this.settingKey);
            if (setting === undefined) {
                this.setState({
                    "show": true,
                    "result": undefined
                });
            }
        } else {
            this.setState({
                "show": true,
                "result": undefined
            });
        }
    }

    protected handleClickSubmitAccept() {
        this.handleClickSubmit(true);
    }

    protected handleClickSubmitDecline() {
        this.handleClickSubmit(false);
    }

    private handleClickSubmit(result: boolean) {
        store.dispatch(settingSet({ "Type": "Boolean", "Key": this.settingKey, "Value": result ? "True" : "False" }));
        this.setState({
            "show": true,
            "result": result
        });
        setTimeout(() => {
            this.setState({
                "show": false,
                "result": undefined
            });
        }, 2000);
    }

    protected renderHeader() {
        return (
            <Modal.Header>
                <Modal.Title>Interstitial prompt</Modal.Title>
            </Modal.Header>
        );
    }

    protected renderBody() {
        return (
            <Modal.Body>
                {this.renderBodyAccept()}
                {this.renderBodyDecline()}
                {this.renderBodyText()}
            </Modal.Body>
        );
    }

    private renderBodyAccept() {
        if (this.state.result === true) {
            return (
                <Alert bsStyle="success">
                    <strong>Accepted!</strong>
                    <div>The prompt has been accepted.</div>
                </Alert>
            );
        } else {
            return undefined;
        }
    }

    private renderBodyDecline() {
        if (this.state.result === false) {
            return (
                <Alert bsStyle="danger">
                    <strong>Declined!</strong>
                    <div>The prompt has been declined.</div>
                </Alert>
            );
        } else {
            return undefined;
        }
    }

    private renderBodyText() {
        if (this.state.result === undefined) {
            return (
                <p>This is the interstitial prompt.</p>
            );
        } else {
            return undefined;
        }
    }

    private renderFooter() {
        if (this.state.result === undefined) {
            return (
                <Modal.Footer>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="success" onClick={this.handleClickSubmitAccept}>Accept prompt</Button>
                            <Button type="submit" bsStyle="danger" onClick={this.handleClickSubmitDecline}>Decline prompt</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Modal.Footer>
            );
        } else {
            return undefined;
        }
    }

    public render() {
        return (
            <div className="component-interstitial">
                <Modal show={this.state.show} onHide={() => { /* Do Nothing */ }}>
                    {this.renderHeader()}
                    {this.renderBody()}
                    {this.renderFooter()}
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "settings": state.settings || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(Interstitial);
