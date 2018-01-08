"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const commander_1 = require("commander");
const compile_graphql_1 = require("./compile-graphql");
/**
 * Application Factory
 *
 * calling this factory will always generate new application instance (useful for testing)
 */
function application() {
    const application = new commander_1.Command();
    application
        .arguments('<graphqlFileGlob> <outputFile>')
        .option('--skip-typedefs', 'skip writing typeDefs declaration to output files');
    return application;
}
exports.application = application;
/**
 * Action Handler
 *
 * @param graphqlFileGlob
 * @param outputFile
 * @param command
 */
function handler(graphqlFileGlob, outputFile, command) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = parseOptions(graphqlFileGlob, outputFile, command);
            yield compile_graphql_1.compileGraphql(options);
            // tslint:disable-next-line:no-console
            console.log(chalk.bold.green('Graphql output files compiled'));
        }
        catch (e) {
            console.error(chalk.bold.red(e));
        }
    });
}
exports.handler = handler;
/**
 * Options Parser
 *
 * @param graphqlFileGlob
 * @param outputFile
 * @param command
 */
function parseOptions(graphqlFileGlob, outputFile, command) {
    const options = {
        graphqlFileGlob,
        outputFile,
        skipTypeDefs: !!command.skipTypedefs
    };
    return options;
}
exports.parseOptions = parseOptions;
//# sourceMappingURL=application.js.map