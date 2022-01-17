import HtmlDataTypes from "../../data/types/html";
import componentMap, { IS_TEXT } from "./component-map";
import Paragraph from "./blocks/paragraphs";

// This test verges on testing third-party libraries, but lodash-fp is poorly documented so it has been included.
describe("Component map retrieves values expected", () => {
    test('value not present', () => {
        expect(componentMap('value not present')).toEqual(IS_TEXT)
    });
    test('paragraph', () => {
        expect(componentMap(HtmlDataTypes.p)).toEqual(Paragraph);
    })
});