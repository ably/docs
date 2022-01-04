const addLanguageSupportForGithubStyleCode = content => {
    /**
     * Full Regex for rapid testing on regex101.com etc.:
     * /^\`\`\`(?:\[([^\]]+)\])?(?:\(([^\)]+)\))?([^`]*)^\`\`\`/gm
     * Please update this with any changes if and when they arise!
     */
    console.log('processing');
    const langRegex = '\\[([^\\]]+)\\]';
    const codeEditorRegex = '\\(([^\)]+)\\)';
    const langAndEditorRegex = `(?:${langRegex})?(?:${codeEditorRegex})?`;
    const fullGithubLanguageRegex = new RegExp(`^\\\`\\\`\\\`${langAndEditorRegex}([^\`]*)^\\\`\\\`\\\``, 'gm');
    const replacer = (_match, languages, codeEditor, content) => {
        if(languages) {
            // TODO: strip_heredoc
            return `bc[${languages}]${codeEditor ? `(${codeEditor})` : ''}. ${content}`;
        }
        return `bc. ${content}`;
    }
    const textileLanguageFromGithubStyleLanguage = content.replace(fullGithubLanguageRegex, replacer);
    return textileLanguageFromGithubStyleLanguage.replace(/^s*$/m, '{{{github_br}}}');
};

module.exports = {
    addLanguageSupportForGithubStyleCode
}