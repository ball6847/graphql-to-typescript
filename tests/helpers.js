"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../application");
/**
 * mock new app instance with a given action handler
 *
 * @param handler action handler
 */
function mockApp(handler) {
    return application_1.application().action(handler);
}
exports.mockApp = mockApp;
/**
 * commander always start reading process arguments from index of 2
 * so, we need to mock it here to make test preparation a little cleaner
 *
 * @param args arguments to be mocked
 */
function mockArgs(args) {
    return ['', '', ...args];
}
exports.mockArgs = mockArgs;
//# sourceMappingURL=helpers.js.map