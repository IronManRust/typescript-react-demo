require("babel-core/register")();

const {
    JSDOM
} = require("jsdom");

const config = require("./src/utils/config.json");

let domain = "www.example.com";
switch (process.env.NODE_ENV) {
    case "local":
        domain = config.local.domain;
        break;
    case "development":
        domain = config.development.domain;
        break;
    case "qa":
        domain = config.qa.domain;
        break;
    case "stage":
        domain = config.stage.domain;
        break;
    case "production":
        domain = config.production.domain;
        break;
    default:
        // Do Nothing
        break;
}

const jsdom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
    "url": `https://${domain}`
});

global.window = jsdom.window;
global.document = jsdom.window.document;

Object.keys(window).forEach((property) => {
    if (typeof global[property] === "undefined") {
        global[property] = window[property];
    }
});

global.navigator = {
    "userAgent": "node.js"
};
