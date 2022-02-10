import { isArray } from "lodash";
import HtmlDataTypes from "../types/html";

const TYPES_TO_ADD_TO_CONTENT_MENU = [ HtmlDataTypes.h2, HtmlDataTypes.h3 ];
const TYPES_TO_LEVEL_MAP ={
    [HtmlDataTypes.h2]: 2,
    [HtmlDataTypes.h3]: 3
};

const idFromName = name => name.replace(/([a-z0-9])([A-Z]+)/g,'$1-$2').replace(/\s+/g, '-').toLowerCase();

const getTextFromPage = ({ data = '' }, text = []) => {
    if(isArray(data)) {
        const count = data.length;
        for(let i = 0; i < count; ++i) {
            const dataObject = data[i];
            text = getTextFromPage(dataObject, text);
        }
        return text;
    }
    text.push(data);
    return text;
};

const createContentMenuDataFromPage = (page, contentMenuData = []) => {
    const {
        data = '',
        attribs: {
            id
        } = {
            id: null
        },
        type
    } = page;
    if(isArray(data)) {
        const count = data.length;
        for(let i = 0; i < count; ++i) {
            const dataObject = data[i];
            contentMenuData = createContentMenuDataFromPage(dataObject, contentMenuData);
        }
    }

    if(TYPES_TO_ADD_TO_CONTENT_MENU.includes(type)) {
        const name = getTextFromPage({ data }).join('');
        let newID = id;
        if(!id) {
            newID = idFromName(name);
            page.id = newID;
        }
        const contentMenuItem = {
            name,
            id: newID,
            level: TYPES_TO_LEVEL_MAP[type]
        };
        contentMenuData.push(contentMenuItem);
    }

    return contentMenuData;
};

export { idFromName, getTextFromPage };
export default createContentMenuDataFromPage;