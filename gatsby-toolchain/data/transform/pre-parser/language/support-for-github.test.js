import { addLanguageSupportForGithubStyleCode, minIndent, stripHeredoc } from "./support-for-github";

const minIndentExample = `
            One
        Two
    Three`;

const githubCodeExample = `\`\`\`[javascript]
            One

        Two

    Three
\`\`\``

describe('Minimum indentation', () => {
    it('Should return the minimum indentation level of a string', () => {
        expect(minIndent(minIndentExample)).toBe(4);
    });
});

describe('Strip minimum indentation', () => {
    it('Should return the string with reduced indentation levels', () => {
        expect(stripHeredoc(minIndentExample)).toEqual(`
        One
    Two
Three`)
    });
});

describe('Add language support for GitHub style code', () => {
    it('Should replace line breaks with {{github_br}} & backticks with bc. blocks', () => {
        expect(addLanguageSupportForGithubStyleCode(githubCodeExample)).toEqual(`bc[javascript]. 
        One
{{{github_br}}}
    Two
{{{github_br}}}
Three
{{{github_br}}}`);
    });
});