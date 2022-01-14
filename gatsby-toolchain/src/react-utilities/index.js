import { compose } from "lodash/fp";

const classToClassName = attribs => {
    if(!attribs || !attribs.class) {
        return attribs;
    }
    attribs.className = attribs.class;
    delete attribs.class;
    return attribs;
};

const filterAttribsForReact = compose(
    classToClassName
);

export {
    filterAttribsForReact
};