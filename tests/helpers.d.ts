import { Commander } from '../typings';
/**
 * mock new app instance with a given action handler
 *
 * @param handler action handler
 */
export declare function mockApp(handler: any): Commander.Command;
/**
 * commander always start reading process arguments from index of 2
 * so, we need to mock it here to make test preparation a little cleaner
 *
 * @param args arguments to be mocked
 */
export declare function mockArgs(args: string[]): string[];
