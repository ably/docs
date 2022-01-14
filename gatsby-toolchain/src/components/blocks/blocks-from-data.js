import React from "react"
import componentMap, { IS_TEXT } from "../component-map"
import Html from "./Html";

const blocksFromData = data => data.map(({ attribs, data, name }, i) => {
    // console.log(componentMap(name) === IS_TEXT, data);
    const Block = componentMap(name) ?? Html;
    return <Block key={i} attribs={ attribs } data={ data }/>
});

export default blocksFromData;