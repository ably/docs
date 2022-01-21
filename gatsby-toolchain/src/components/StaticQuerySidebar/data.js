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

const range = (start, end) => Array(end - start).fill().map((_, i) => i + start);

const sidebarDataFromDocumentPaths = data => {
    const objects = data.map(({ node: { id, label, level, link, parent = { id: false } }}) => ({ id, label, level, link, parent }));
    const objectsByLevel = groupBy(objects, object => object.level);
    // Avoids possible GC issues caused by setting a variable with let. Premature optimization but a simple one.
    range(ROOT_LEVEL, MAX_LEVEL).forEach(currentLevel => {
        objectsByLevel[currentLevel] && objectsByLevel[currentLevel].map(object => {
            object.content = objectsByLevel[currentLevel+1] ?
                [{...object, label: 'Overview' }].concat(
                    objectsByLevel[currentLevel+1]
                        .filter(({ parent: { id } }) => id === object.id)
                ) :
                null;
            return object;
        });
    })
    return objectsByLevel[ROOT_LEVEL];
}

export { sidebarDataFromPageFurniture, sidebarDataFromDocumentPaths };