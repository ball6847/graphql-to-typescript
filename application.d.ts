import { CompileOptions } from './interfaces';
import { Commander } from './typings';
/**
 * Application Factory
 *
 * calling this factory will always generate new application instance (useful for testing)
 */
export declare function application(): Commander.Command;
/**
 * Action Handler
 *
 * @param graphqlFileGlob
 * @param outputFile
 * @param command
 */
export declare function handler(graphqlFileGlob: any, outputFile: any, command: any): Promise<void>;
/**
 * Options Parser
 *
 * @param graphqlFileGlob
 * @param outputFile
 * @param command
 */
export declare function parseOptions(graphqlFileGlob: any, outputFile: any, command: any): CompileOptions;
