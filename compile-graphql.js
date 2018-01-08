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
const fs = require("fs");
const glob = require("glob");
const graphql_1 = require("graphql");
const graphql_code_generator_1 = require("graphql-code-generator");
const graphql_tools_1 = require("graphql-tools");
exports.compileGraphql = (options) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        glob(options.graphqlFileGlob, {}, (er, files) => __awaiter(this, void 0, void 0, function* () {
            try {
                const output = [];
                const typeDefs = [];
                for (let file of files) {
                    typeDefs.push(fs.readFileSync(file, 'utf8'));
                }
                if (typeDefs.length === 0) {
                    throw new Error(`No type definitions were found matching: ${options.graphqlFileGlob}`);
                }
                if (!options.skipTypeDefs) {
                    output.push(`export const typeDefs = ${JSON.stringify(typeDefs)};`);
                }
                const schema = graphql_tools_1.makeExecutableSchema({ typeDefs });
                const [introspectionResult, template] = yield Promise.all([
                    graphql_1.graphql(schema, graphql_1.introspectionQuery),
                    graphql_code_generator_1.getTemplateGenerator('typescript')
                ]);
                const introspection = introspectionResult.data;
                const transformOptions = {
                    introspection,
                    documents: [],
                    template: template,
                    outPath: './',
                    isDev: false,
                    noSchema: false,
                    noDocuments: true
                };
                const outFiles = yield graphql_code_generator_1.Transform(transformOptions);
                for (let file of outFiles) {
                    output.push(file.content);
                }
                fs.writeFileSync(options.outputFile, output.join('\n'));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    });
});
//# sourceMappingURL=compile-graphql.js.map