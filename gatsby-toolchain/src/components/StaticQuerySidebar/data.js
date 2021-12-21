import { groupBy } from 'lodash';
import { MAX_LEVEL, ROOT_LEVEL } from '../Sidebar/consts';

const sidebarDataFromPageFurniture = data => data.map(({ label, link, level = ROOT_LEVEL, contentString = false, contentArray = false }) => {
    const result = {
        label,
        link,
        level,
        content: contentArray ? sidebarDataFromPageFurniture(contentArray) : contentString
    }
    return result;
})

const sidebarDataFromDocumentPaths = data => {
    const objects = data.map(({ node: { id, label, level, link, parent = { id: false } }}) => ({ id, label, level, link, parent }));
    const objectsByLevel = groupBy(objects, object => object.level);
    let currentLevel = ROOT_LEVEL;
    // There is likely a way to do this in a more functional style, but I'm concerned that it may be less readable.
    while(currentLevel < MAX_LEVEL) {
        objectsByLevel[currentLevel] && objectsByLevel[currentLevel].map(object => {
            object.content = objectsByLevel[currentLevel+1] ?
                [{...object, label: 'Overview' }].concat(
                    objectsByLevel[currentLevel+1]
                        .filter(({ parent: { id } }) => id === object.id)
                ) :
                null;
            return object;
        });
        ++currentLevel;
    }
    return objectsByLevel[ROOT_LEVEL];
}

export { sidebarDataFromPageFurniture, sidebarDataFromDocumentPaths };