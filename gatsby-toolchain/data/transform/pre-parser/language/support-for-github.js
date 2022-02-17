const minIndent = string => {
	const indents = string.match(/^[ \t]*(?=\S)/gm);
	if (!indents) {
		return 0;
	}
	return indents.reduce((acc, curr) => Math.min(acc, curr.length), Infinity);
};

const stripHeredoc = string => {
    const min = minIndent(string);
    const regexString = `^[ \\t]{${min}}`;
    const regex = new RegExp(regexString, 'gm');
    return string.replace(regex, '');
}


const addLanguageSupportForGithubStyleCode = content => {
    /**
     * Full Regex for rapid testing on regex101.com etc.:
     * /^\`\`\`(?:\[([^\]]+)\])?(?:\(([^\)]+)\))?(.*?)^\`\`\`/gms
     * Please update this with any changes if and when they arise!
     */
    const langRegex = '\\[([^\\]]+)\\]'; // e.g. [javascript], [    ], [jsall, ruby]
    const codeEditorRegex = '\\(([^\\)]+)\\)'; // e.g. (code-editor), (    ), (!@£$)
    // optinally match anything like [javascript](code-editor:realtime/channel-publish)
    const langAndEditorRegex = `(?:${langRegex})?(?:${codeEditorRegex})?`;
    /**
     * Wrap the regex strings so they'll match
     * ```
     *  {optional regex}
     *  (any content)
     * ```
     */
    const fullGithubLanguageRegex = new RegExp(`^\\\`\\\`\\\`${langAndEditorRegex}(.*?)^\\\`\\\`\\\``, 'gms');
    const replaceLineBreaks = input => input.replace(/^\s*$/gm, '{{{github_br}}}');
    const replacer = (_match, languages, codeEditor, content) => {
        if(languages) {
            return replaceLineBreaks(`bc[${languages}]${codeEditor ? `(${codeEditor})` : ''}. ${stripHeredoc(content)}`);
        }
        return replaceLineBreaks(`bc. ${stripHeredoc(content)}`);
    }
    const textileLanguageFromGithubStyleLanguage = content.replace(fullGithubLanguageRegex, replacer);
    return textileLanguageFromGithubStyleLanguage;
};

module.exports = {
    minIndent,
    stripHeredoc,
    addLanguageSupportForGithubStyleCode
}