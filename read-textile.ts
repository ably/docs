import readline from 'readline';
import util from 'util';
import fs from 'fs';
import Turndown from 'turndown';
import * as Diff from 'diff';

import {
  textileToHtml,
  textileToCheerio,
  processTextile,
  fullyParseTextile,
} from './data/test-utilities/process-textile';
import { preParserSteps } from './data/cli-functionality/parser-steps/pre-parser';
import { textileWorkaroundSteps } from './data/cli-functionality/parser-steps/textile-workarounds';

const argsToRead = process.argv
  .slice(2)
  .filter((arg) => !arg.startsWith('--'))
  .map((arg) => {
    try {
      const content = fs.readFileSync(arg);
      return content.toString();
    } catch (e) {
      //Fine to ignore.
    }
    return arg;
  })
  .map((arg) => arg.replace(/\\n/g, '\n'));

const flags: Record<string, boolean | string> = process.argv
  .slice(2)
  .filter((arg) => arg.startsWith('--'))
  .reduce((acc, arg) => {
    const [key, value] = arg.replace(/^--/, '').split('=');
    return {
      ...acc,
      [key]: value ?? true,
    };
  }, {});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

const turndownService = new Turndown();
turndownService.keep(['div', 'span']);

const queryUser = async (query: string, outputHandler: (answer: string) => void) => {
  rl.question(query, outputHandler);
};

const executeSequentially = (queries: string[], outputHandlers: ((answer: string) => void)[]) => {
  queries.forEach(async (query, i) => await queryUser(query, outputHandlers[i]));
};

// TODO: concat postParser, htmlParser steps.
const steps = [...preParserSteps, ...textileWorkaroundSteps];

const logArgProcessingError = (name: string, arg: string, i: number) =>
  console.error(`\n\nError processing ${name} ${i + 1}:\n${arg}\n`);

const diffText = (oldText: string, newText: string) => {
  const diffResult = Diff.diffLines(oldText, newText);
  diffResult.forEach((diffPart) => {
    const color = diffPart.added ? '\x1b[32m' : diffPart.removed ? '\x1b[31m' : '\x1b[1;30m';
    console.log(`${color}${diffPart.value}\x1b[0m`);
  });
};

const initialQuery = ['How would you like to debug the textile? (h)tml, (m)arkdown, (s)tep by step or (a)dvanced?'];
const initialOutputHandler = [
  async (answer: string) => {
    switch (answer) {
      case 'h':
        argsToRead.forEach((arg, i) => {
          console.log('\nHTML mode\n');
          try {
            if (flags.diff) {
              diffText(arg, textileToHtml(arg));
            } else {
              console.log(`\n${textileToHtml(arg)}\n`);
            }
          } catch (e) {
            logArgProcessingError('argument', arg, i);
            console.error(e);
          }
        });
        process.exit();
        break;
      case 'm':
        argsToRead.forEach((arg, i) => {
          console.log('\nMarkdown mode\n');
          try {
            const markdown = turndownService.turndown(textileToHtml(arg));
            if (flags.diff) {
              diffText(arg, markdown);
            } else {
              console.log(`\n${markdown}\n`);
            }
          } catch (e) {
            logArgProcessingError('argument', arg, i);
            console.error(e);
          }
        });
        process.exit();
        break;
      case 's':
        console.log('\nStep by step mode - \n\x1b[33mwill only operate on first argument provided\x1b[0m\n\n');
        // eslint-disable-next-line no-case-declarations
        let result = argsToRead[0];
        // eslint-disable-next-line no-case-declarations
        const recursivelyReadSteps = async (i: number) => {
          if (i >= steps.length) {
            return;
          }
          const step = steps[i];
          try {
            console.log(`\nOutput on step ${i + 1}\n`);
            console.log(step.fn);
            if (step.description) {
              console.log(`\n\x1b[33m${step.description}\x1b[0m\n`);
            }

            if (flags.diff) {
              const nextResult = step.fn(result);
              diffText(result, nextResult);
              result = nextResult;
            } else {
              result = step.fn(result);
              console.log(`\x1b[32m${result}\x1b[0m\n`);
            }
            const possiblyQuit = await question('Press enter to proceed, q to quit: ');
            // @ts-ignore
            if (possiblyQuit === 'q') {
              process.exit();
            }
            await recursivelyReadSteps(i + 1);
          } catch (e) {
            logArgProcessingError('argument', result, 0);
            logArgProcessingError('step', step.description ?? step.fn.prototype?.name ?? '', i);
            console.error(e);
            return;
          }
          return result;
        };
        await recursivelyReadSteps(0);
        process.exit();
        break;
      case 'a':
        // eslint-disable-next-line no-case-declarations
        const selected = await question(
          '\nSelecting from advanced modes, (c)heerio rendered into html, (a)rray of cheerio values, (f)inal objects:',
        );
        switch (selected) {
          // @ts-ignore
          case 'c':
            argsToRead.forEach((arg, i) => {
              try {
                console.log(`\n${textileToCheerio(arg)}\n`);
              } catch (e) {
                logArgProcessingError('argument', arg, i);
                console.error(e);
              }
            });
            break;
          // @ts-ignore
          case 'a':
            argsToRead.forEach((arg, i) => {
              try {
                console.log('\n');
                console.log(processTextile(arg));
                console.log('\n');
              } catch {
                logArgProcessingError('argument', arg, i);
              }
            });
            break;
          // @ts-ignore
          case 'f':
            argsToRead.forEach((arg, i) => {
              try {
                console.log(`\n${JSON.stringify(fullyParseTextile(arg), null, ' ')}\n`);
              } catch {
                logArgProcessingError('argument', arg, i);
              }
            });
            break;
          default:
            process.exit();
            break;
        }
        process.exit();
        break;
      default:
        process.exit();
        break;
    }
  },
];

executeSequentially(initialQuery, initialOutputHandler);
