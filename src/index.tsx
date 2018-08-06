import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "./containers/root";

require("./index.html");
require("./favicon.ico");
require("./web.config");

const root = document.getElementById("root");

// TODO: Configuration File Lookup
// TODO: Console Information Display

ReactDOM.render(<Root />, root);
