import * as React from "react";
import * as ReactDOM from "react-dom";
import fixedWidthString from "fixed-width-string";
import { Root } from "./containers/root";
import { configuration } from "./utils/config";

require("./index.html");
require("./favicon.ico");
require("./web.config");

require("../node_modules/bootstrap/dist/css/bootstrap.min.css");

const config = configuration();

// TODO: Redirect Non-Root URLs

const maxWidth = 11; // The maximum width of any displayable value.
const outputEN = fixedWidthString(config.environment, maxWidth);

console.log(String.raw`+--------------------------------------------------------------------------------------------------------------------+`);
console.log(String.raw`|                                                                                                                    |`);
console.log(String.raw`|  _______                _____           _       _       _____                 _       _____                        |`);
console.log(String.raw`| |__   __|              / ____|         (_)     | |     |  __ \               | |     |  __ \                       |`);
console.log(String.raw`|    | |_   _ _ __   ___| (___   ___ _ __ _ _ __ | |_    | |__) |___  __ _  ___| |_    | |  | | ___ _ __ ___   ___   |`);
console.log(String.raw`|    | | | | | '_ \ / _ \\___ \ / __| '__| | '_ \| __|   |  _  // _ \/ _' |/ __| __|   | |  | |/ _ \ '_ ' _ \ / _ \  |`);
console.log(String.raw`|    | | |_| | |_) |  __/____) | (__| |  | | |_) | |_    | | \ \  __/ (_| | (__| |_    | |__| |  __/ | | | | | (_) | |`);
console.log(String.raw`|    |_|\__, | .__/ \___|_____/ \___|_|  |_| .__/ \__|   |_|  \_\___|\__,_|\___|\__|   |_____/ \___|_| |_| |_|\___/  |`);
console.log(String.raw`|        __/ | |                           | |                                                                       |`);
console.log(String.raw`|       |___/|_|                           |_|                                                                       |`);
console.log(String.raw`|                                                                                                                    |`);
console.log(String.raw`|                                              Environment: ${outputEN}                                              |`);
console.log(String.raw`|                                                                                                                    |`);
console.log(String.raw`+--------------------------------------------------------------------------------------------------------------------+`);

ReactDOM.render(<Root />, document.getElementById("root"));
