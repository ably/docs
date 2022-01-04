const addLanguageSupportForGithubStyleCode = content => {
    /**
     * Full Regex for rapid testing on regex101.com etc.:
     * /^\`\`\`(?:\[([^\]]+)\])?(?:\(([^\)]+)\))?(.*?)^\`\`\`/gms
     * Please update this with any changes if and when they arise!
     */
    const langRegex = '\\[([^\\]]+)\\]';
    const codeEditorRegex = '\\(([^\\)]+)\\)';
    const langAndEditorRegex = `(?:${langRegex})?(?:${codeEditorRegex})?`;
    const fullGithubLanguageRegex = new RegExp(`^\\\`\\\`\\\`${langAndEditorRegex}(.*?)^\\\`\\\`\\\``, 'gms');
    const replaceLineBreaks = input => input.replace(/^\s*$/gm, '{{{github_br}}}')
    const replacer = (_match, languages, codeEditor, content) => {
        if(languages) {
            // TODO: strip_heredoc
            return replaceLineBreaks(`bc[${languages}]${codeEditor ? `(${codeEditor})` : ''}. ${content}`);
        }
        return replaceLineBreaks(`bc. ${content}`);
    }
    const textileLanguageFromGithubStyleLanguage = content.replace(fullGithubLanguageRegex, replacer);
    return textileLanguageFromGithubStyleLanguage;
};

module.exports = {
    addLanguageSupportForGithubStyleCode
}