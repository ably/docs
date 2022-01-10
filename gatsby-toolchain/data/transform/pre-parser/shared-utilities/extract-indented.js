const INDENTATION_REGEX = /^(\s+).*$/m;

const extractIndented = (text, name='Indentable', allowEmptyLines=false) => {
    /**
     * Find some amount of indentation followed by some amount of content
     */
    const indentationResult = text.match(INDENTATION_REGEX);
    if(!indentationResult || !indentationResult[1]) {
        throw `${name} blocks must be followed by indentation. Offending block: '${text.slice(0,127)}'\n`;
    }
    
    const indentation = indentationResult[1];
    /**
     * Find the same level of indentation we matched first in the text 
     */
    const indentationRegexString = `^${indentation}(.*)$`
    const indentationRegex = new RegExp(indentationRegexString, 'gm');
    /**
     * Find the next instance that doesn't match the same level of indentation we matched in the text
     * 
     * If allowEmptyLines is truthy, find the next instance that doesn't match the same level of indentation
     * we matched in the text AND isn't an empty line.
     */
    const negativeIndentationRegexString = allowEmptyLines ? `^(?!${indentation}.*\\n)(?!\\s*\\n)` : `^(?!${indentation}.*)$`
    const negativeIndentationRegex = new RegExp(negativeIndentationRegexString, 'gm');
    
    const nonIndentedLineLocation = text.search(negativeIndentationRegex);

    /**
     * If we can't find a non-indented line, that's likely an error in the regex; display this at build time
     */
    if(nonIndentedLineLocation === -1) {
        throw `${name} block regex error, could not find ${negativeIndentationRegex.source} in ${text.slice(0,100)}`;
    }

    const onlyIndentedLines = text.slice(0,nonIndentedLineLocation).replace(indentationRegex, '$1');

    return { onlyIndentedLines, nonIndentedLineLocation };
}

module.exports = {
    extractIndented
}