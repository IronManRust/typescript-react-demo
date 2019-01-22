import * as React from "react";
import { connect } from "react-redux";
import ExternalLink from "../externalLink/externalLink";
import Footer from "../footer/footer";
import Header from "../header/header";
import * as routes from "../../constants/routes";
import * as routesExternal from "../../constants/routesExternal";

interface IProps extends React.ClassAttributes<About> { }

interface IState { }

export class About extends React.Component<IProps, IState> {

    public render() {
        const breadcrumbs = [];
        breadcrumbs.push({ "link": undefined, "label": routes.ABOUT_LABEL });
        return (
            <div className="component-about">
                <Header user={undefined} breadcrumbs={breadcrumbs} />
                <p>This is a reference demo, written in TypeScript, that illustrates features and design patterns applicable to a more substantial React-based application. It is not meant to be a fully-functional website, but instead provide examples of how to properly use technologies and tooling including:</p>
                <ul>
                    <li><strong>UI state management:</strong> <ExternalLink href={routesExternal.GITHUB_REACT_LINK} newTab={true}>{routesExternal.GITHUB_REACT_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_REDUX_LINK} newTab={true}>{routesExternal.GITHUB_REDUX_LABEL}</ExternalLink></li>
                    <li><strong>Transpiling:</strong> <ExternalLink href={routesExternal.GITHUB_TYPESCRIPT_LINK} newTab={true}>{routesExternal.GITHUB_TYPESCRIPT_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_SASS_LINK} newTab={true}>{routesExternal.GITHUB_SASS_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_BABEL_LINK} newTab={true}>{routesExternal.GITHUB_BABEL_LABEL}</ExternalLink></li>
                    <li><strong>Bundling:</strong> <ExternalLink href={routesExternal.GITHUB_WEBPACK_LINK} newTab={true}>{routesExternal.GITHUB_WEBPACK_LABEL}</ExternalLink></li>
                    <li><strong>Markup templates:</strong> <ExternalLink href={routesExternal.GITHUB_BOOTSTRAP_LINK} newTab={true}>{routesExternal.GITHUB_BOOTSTRAP_LABEL}</ExternalLink></li>
                    <li><strong>Linting:</strong> <ExternalLink href={routesExternal.GITHUB_ESLINT_LINK} newTab={true}>{routesExternal.GITHUB_ESLINT_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_TSLINT_LINK} newTab={true}>{routesExternal.GITHUB_TSLINT_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_HTMLHINT_LINK} newTab={true}>{routesExternal.GITHUB_HTMLHINT_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_JSONLINT_LINK} newTab={true}>{routesExternal.GITHUB_JSONLINT_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_MARKDOWNLINT_LINK} newTab={true}>{routesExternal.GITHUB_MARKDOWNLINT_LABEL}</ExternalLink></li>
                    <li><strong>Testing:</strong> <ExternalLink href={routesExternal.GITHUB_MOCHA_LINK} newTab={true}>{routesExternal.GITHUB_MOCHA_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_CHAI_LINK} newTab={true}>{routesExternal.GITHUB_CHAI_LABEL}</ExternalLink> / <ExternalLink href={routesExternal.GITHUB_ENZYME_LINK} newTab={true}>{routesExternal.GITHUB_ENZYME_LABEL}</ExternalLink></li>
                    <li><strong>Code coverage:</strong> <ExternalLink href={routesExternal.GITHUB_ISTANBUL_LINK} newTab={true}>{routesExternal.GITHUB_ISTANBUL_LABEL}</ExternalLink></li>
                    <li><strong>Automatic documentation:</strong> <ExternalLink href={routesExternal.GITHUB_TYPEDOC_LINK} newTab={true}>{routesExternal.GITHUB_TYPEDOC_LABEL}</ExternalLink></li>
                </ul>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = ({}, {}) => {
    return {};
};

export default connect<{}, {}, IProps>(mapStateToProps)(About);
