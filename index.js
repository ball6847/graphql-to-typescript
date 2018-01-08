#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const compile_graphql_1 = require("./compile-graphql");
exports.compileGraphql = compile_graphql_1.compileGraphql;
const app = application_1.application();
app.action(application_1.handler).parse(process.argv);
if (!app.args.length) {
    app.help();
}
//# sourceMappingURL=index.js.map