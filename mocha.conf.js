require("babel-core/register")();

const {
    JSDOM
} = require("jsdom");

// TODO: Update Example URL
const jsdom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
    "url": "https://www.example.com"
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
