import { compose } from "lodash/fp";

const classToClassName = attribs => {
    if(!attribs || !attribs.class) {
        return attribs;
    }
    attribs.className = attribs.class;
    delete attribs.class;
    return attribs;
};

const keyFromID = attribs => {
    if(!attribs || !attribs.id) {
        return attribs;
    }
    attribs.key = attribs.id;
    return attribs;
}

const filterAttribsForReact = compose(
    classToClassName,
    keyFromID
);

export {
    filterAttribsForReact
};