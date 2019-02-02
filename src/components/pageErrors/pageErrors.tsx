import * as React from "react";
import { Alert, Button, ButtonToolbar, FormGroup, Table } from "react-bootstrap";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import { errorSet, errorClear } from "../../actions/error";
import { store } from "../../containers/root";
import { IGlobalState } from "../../reducers/index";
import { IErrorState } from "../../reducers/error";
import * as routes from "../../constants/routes";

interface IProps extends React.ClassAttributes<PageErrors> {
    error: IErrorState | undefined;
}

interface IState { }

export class PageErrors extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.handleClickErrorSet = this.handleClickErrorSet.bind(this);
        this.handleClickErrorClear = this.handleClickErrorClear.bind(this);
    }

    protected handleClickErrorSet(elementID: string | undefined) {
        if (elementID) {
            store.dispatch(errorSet(400, `There was an error on '${elementID}'`, elementID));
        } else {
            store.dispatch(errorSet(400, "There was a global error", undefined));
        }
    }

    protected handleClickErrorClear() {
        store.dispatch(errorClear());
    }

    private renderButtons() {
        return (
            <FormGroup>
                <ButtonToolbar>
                    {
                        [undefined, 1, 2, 3, 4, 5].map((item, index) => {
                            if (item) {
                                return (
                                    <Button key={index} type="submit" bsStyle="danger" onClick={() => { this.handleClickErrorSet(`error-display-${item}-status`); }}>
                                        #{item}
                                    </Button>
                                );
                            } else {
                                return (
                                    <Button key={index} type="submit" bsStyle="danger" onClick={() => { this.handleClickErrorSet(undefined); }}>
                                        Global
                                    </Button>
                                );
                            }
                        })
                    }
                    <Button type="submit" bsStyle="success" onClick={this.handleClickErrorClear}>
                        Clear
                    </Button>
                </ButtonToolbar>
            </FormGroup>
        );
    }

    protected renderDisplay() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Element value</th>
                        <th>Element status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{this.renderDisplayElementValue(`error-display-${item}-value`, `Element #${item}`)}</td>
                                <td>{this.renderDisplayElementStatus(`error-display-${item}-status`)}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        );
    }

    protected renderDisplayElementValue(elementID: string, body: string) {
        return (
            <Alert id={elementID} bsStyle="info">
                {body}
            </Alert>
        );
    }

    private renderDisplayElementStatus(elementID: string) {
        if (this.props.error && this.props.error.elementID === elementID) {
            return (
                <Alert id={elementID} bsStyle="danger">
                    <strong>Error</strong>
                </Alert>
            );
        } else {
            return (
                <Alert id={elementID} bsStyle="success">
                    <strong>OK</strong>
                </Alert>
            );
        }
    }

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": routes.PAGES_LINK, "label": routes.PAGES_LABEL });
        breadcrumbs.push({ "link": undefined, "label": routes.PAGE_ERRORS_LABEL });
        return (
            <div className="component-page-errors">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This page demonstrates how to generate errors, tied to either a specific element, or global in scope.</p>
                {this.renderButtons()}
                {this.renderDisplay()}
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = (state: IGlobalState, {}) => {
    return {
        "error": state.error || undefined
    };
};

export default connect<{}, {}, IProps>(mapStateToProps)(PageErrors);
