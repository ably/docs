import { sample, pickBy } from "lodash";
import HtmlDataTypes from "../data/types/html"
import * as fc from 'fast-check';

const randomlyRecursiveNestHtml = (string, tags = [], originalString = string) => {
     // Should be valid to nest arbitrarily deep
    const tag = sample(pickBy(HtmlDataTypes, value => ['div','section'].includes(value)));
    const result = `<${tag}>${string}</${tag}>`;
    const tagResult = [tag].concat(tags);
    if(Math.random() > 0.2) {
        return randomlyRecursiveNestHtml(result, tagResult, originalString);
    }
    return { result, tagResult, innerText: originalString };
}

const htmlString = fc.lorem()
    .map(randomlyRecursiveNestHtml);

export default htmlString;