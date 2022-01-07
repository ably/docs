//TODO: Split this into constants & more focused files for functions
const CURRENT_VERSION = '1.2';
const CURRENT_SPEC_VERSION = '1.2';

// TODO: Gatsby should extract these folders by detecting the folder structures programmatically
const VERSIONED_FOLDERS = [
    'client-lib-development-guide',
    'general',
    'sse',
    'realtime',
    'rest',
    'rest-api',
    'shared',
    'types',
    'core-features'
];

// Cache declarations
let [VersionFromRelativeUrlCache,EnsureRelativeUrlMatchesCurrentVersionCache] = {};

const rootFolderRegexString = rootFolder => new RegExp(`^/${rootFolder}/versions/v([\d\.]+)`);

const isRelativeUrlVersioned = url => !!versionFromRelativeUrl(url);
/** Split a URL into three parts
* - complete path
* - root_folder (such as /realtime or /rest)
* - relative_path
*/
const splitRelativeUrl = relative_url => Array.from(relative_url.match(/^\/([^/#]+)(.*?)$/));

const nonVersionedPath = path => {
    // g should be safe to remove, keeping for maximum agreement with Ruby code.
    path.replace(/\/versions\/v([\d\.]+)/g, '');
}

const currentVersionForFolder = folder => folder === 'client-lib-development-guide' ? CURRENT_SPEC_VERSION : CURRENT_VERSION;

const versionFromRelativeUrl = (url, currentDefault = false) => {
    const cached = VersionFromRelativeUrlCache[`${url}:${currentDefault}`];
    if(!!cached) {
        return cached;
    }
    VERSIONED_FOLDERS.forEach(rootFolder => {
        const matched = url.match(rootFolderRegexString(rootFolder));
        if(matched && matched[1]) {
            return matched[1];
        }
    });
    const [_, rootFolder, _] = splitRelativeUrl(nonVersionedPath(url));
    if(currentDefault) {
        return currentVersionForFolder(rootFolder);
    }
    // Breaking with Ruby to return explicit false rather than falsy undefined.
    return false;
}

const ensureRelativeUrlMatchesCurrentVersion = (currentPath, relativeUrl) => {
    const cached = EnsureRelativeUrlMatchesCurrentVersionCache[`${currentPath}:${relativeUrl}`];
    if(!!cached) {
        return cached;
    }
    const currentPathVersion = versionFromRelativeUrl(currentPath);
    const shouldRewriteLinks = currentPathVersion &&
        isRelativeUrlVersioned(currentPath);
    // 'Version exists for path' must be checked by Gatsby/linking React Component at time of rewrite check.
    return !!shouldRewriteLinks ? pathForVersion(currentPathVersion, relativeUrl) : relativeUrl;
}

