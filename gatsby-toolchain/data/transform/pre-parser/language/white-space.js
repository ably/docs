const trimWhiteSpaceBetweenLanguageElements = content => content.replace(/\<\/(div|span)\>\s+\<\1\slang=["']([^"']+)["']>/g, '</$1><$1 lang="$2">');

module.exports = {
    trimWhiteSpaceBetweenLanguageElements
}