"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const application_1 = require("../application");
const helpers_1 = require("./helpers");
describe('Application - OptionParser', () => {
    let parsedOptions;
    const graphqlFileGlob = './src/tests/graphql/**/*.graphql';
    const outputFile = './tmp/type-defs.ts';
    const appMock = helpers_1.mockApp((arg1, arg2, cmd) => {
        parsedOptions = application_1.parseOptions(arg1, arg2, cmd);
    });
    // reset parsedOptions before each test
    beforeEach(() => {
        parsedOptions = {};
    });
    it('should produce correct CompileOptions object when omit all optional options', () => {
        const args = helpers_1.mockArgs([graphqlFileGlob, outputFile]);
        const expectedOptions = { graphqlFileGlob, outputFile, skipTypeDefs: false };
        appMock.parse(args);
        chai_1.expect(parsedOptions).to.eqls(expectedOptions);
    });
    it('should recognize --skip-typedefs options', () => {
        const args = helpers_1.mockArgs([graphqlFileGlob, outputFile, '--skip-typedefs']);
        const expectedOptions = { graphqlFileGlob, outputFile, skipTypeDefs: true };
        appMock.parse(args);
        chai_1.expect(parsedOptions).to.eqls(expectedOptions);
    });
});
//# sourceMappingURL=application.test.js.map