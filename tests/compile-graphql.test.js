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
const chai_1 = require("chai");
const fs = require("fs");
const rimraf = require("rimraf");
const compile_graphql_1 = require("../compile-graphql");
describe('Compiler', () => {
    const graphqlFileGlob = './src/tests/graphql/**/*.graphql';
    const falsyGraphqlFileGlob = './somewhere/else/**/*.graphql';
    const outputFile = './tmp/type-defs.ts';
    const outputFolder = './tmp';
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve, reject) => {
            rimraf(outputFolder, {}, () => {
                fs.mkdirSync(outputFolder);
                resolve();
            });
        });
    }));
    it('should compile the graphql file into a typescript file with the correct exports', () => __awaiter(this, void 0, void 0, function* () {
        const options = { outputFile, graphqlFileGlob };
        yield compile_graphql_1.compileGraphql(options);
        const files = yield fs.readdirSync(outputFolder);
        const tsSchema = fs.readFileSync(options.outputFile, 'utf8');
        chai_1.expect(files.length).to.eql(1);
        chai_1.expect(tsSchema.indexOf('export interface RootQuery')).to.not.eql(-1);
        chai_1.expect(tsSchema.indexOf('export interface User')).to.not.eql(-1);
        chai_1.expect(tsSchema.indexOf('export interface UserRootQueryArgs')).to.not.eql(-1);
        chai_1.expect(tsSchema.indexOf('export const typeDefs')).to.not.eql(-1);
    }));
    it('should throw an exception when no type definitions found in input file', () => {
        const options = { outputFile, graphqlFileGlob: falsyGraphqlFileGlob };
        return compile_graphql_1.compileGraphql(options)
            .then(() => {
            throw new Error('compileGraphql call not supposed to be success');
        })
            .catch((error) => {
            chai_1.expect(error.message).to.contains('No type definitions were found matching');
        });
    });
    it('should skip typeDefs declaration when skipTypeDefs is true', () => __awaiter(this, void 0, void 0, function* () {
        const options = { outputFile, graphqlFileGlob, skipTypeDefs: true };
        yield compile_graphql_1.compileGraphql(options);
        const files = yield fs.readdirSync(outputFolder);
        const tsSchema = fs.readFileSync(options.outputFile, 'utf8');
        chai_1.expect(files.length).to.eql(1);
        chai_1.expect(tsSchema).to.not.contains('export const typeDefs = ');
    }));
});
//# sourceMappingURL=compile-graphql.test.js.map