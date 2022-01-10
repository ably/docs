const INDENTATION_REGEX = /^(\s+).*$/m;

const extractIndented = (text, name='Indentable', allowEmptyLines=false) => {
    const indentationResult = text.match(INDENTATION_REGEX);
    if(!indentationResult || !indentationResult[1]) {
        throw `${name} blocks must be followed by indentation. Offending block: '${text.slice(0,127)}'\n`;
    }
    
    const indentation = indentationResult[1];
    const indentationRegexString = `^${indentation}(.*)$`
    const indentationRegex = new RegExp(indentationRegexString, 'gm');
    const negativeIndentationRegexString = allowEmptyLines ? `^(?!${indentation}.*\\n)(?!\\s*\\n)` : `^(?!${indentation}.*)$`
    const negativeIndentationRegex = new RegExp(negativeIndentationRegexString, 'gm');
    
    const nonIndentedLineLocation = text.search(negativeIndentationRegex);

    if(nonIndentedLineLocation === -1) {
        throw `${name} block error, could not find ${negativeIndentationRegex.source} in ${text.slice(0,100)}`;
    }

    const onlyIndentedLines = text.slice(0,nonIndentedLineLocation).replace(indentationRegex, '$1');

    return { onlyIndentedLines, nonIndentedLineLocation };
}

module.exports = {
    extractIndented
}