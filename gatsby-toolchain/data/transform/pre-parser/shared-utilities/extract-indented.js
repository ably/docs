const INDENTATION_REGEX = /^(\s+).*$/m;

const extractIndented = (text, name='Indentable') => {
    const indentationResult = text.match(INDENTATION_REGEX);
    if(!indentationResult || !indentationResult[1]) {
        throw `${name} blocks must be followed by indentation. Offending block: '${text.slice(0,127)}'\n`;
    }
    
    const indentation = indentationResult[1];
    const indentationRegexString = `^${indentation}(.*)$`
    const indentationRegex = new RegExp(indentationRegexString, 'gm');
    const negativeIndentationRegexString = `^(?!${indentation}).*$`;
    const negativeIndentationRegex = new RegExp(negativeIndentationRegexString, 'gm');
    
    const nonIndentedLineLocation = text.search(negativeIndentationRegex);

    const onlyIndentedLines = text.slice(0,nonIndentedLineLocation).replace(indentationRegex, '$1');

    return { onlyIndentedLines, nonIndentedLineLocation };
}

module.exports = {
    extractIndented
}