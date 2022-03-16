import { convertCollapsibleInnerToHtml, convertCollapsibleContentToHtml, convertCollapsibleMarkupToHtml, getRegexStringForToken } from "./collapsible";

describe('getRegexStringForToken', () => {
    it('Creates a regex-valid string with a token interpolated', () => {
        const expected = '(?:<[\\w ]+>)*[\\s\\r\\n]*{{example}}(?:<[\\w ]+>)*[\\s\\r\\n]*(.*?)(?:</[\\w ]+>)*[\\s\\r\\n]*{{example_(?:<span class=\"caps\">)?END(?:<\\/span>)?}}(?:</[\\w ]+>)*[\\s\\r\\n]*';
        expect(getRegexStringForToken('example')).toEqual(expected);
    });
});

describe('Converts collapsible inner markup to HTML', () => {
    it('converts simple examples correctly', () => {
        const expected = `

<div class="collapsible-inner">
inner
</div>

`;
        expect(convertCollapsibleInnerToHtml(`{{DIV_collapsible-inner}}inner{{DIV_collapsible-inner_END}}`))
            .toEqual(expected);
    });
});

describe('Converts collapsible content markup to HTML', () => {
    it('converts simple examples correctly', () => {
        const expected = `

<div class=\"collapsible-content\">


<div class=\"collapsible-inner\">
inner
</div>


</div>

`;
        expect(convertCollapsibleContentToHtml(`{{DIV_collapsible-content}}
        {{DIV_collapsible-inner}}inner{{DIV_collapsible-inner_END}}
{{DIV_collapsible-content_END}}`))
            .toEqual(expected);
    });
});

describe('Converts collapsible wrapper markup to HTML', () => {
    it('converts simple examples correctly', () => {
        const expected = `

<div class=\"collapsible-wrapper\">


<div class=\"collapsible-content\">


<div class=\"collapsible-inner\">
inner
</div>


</div>


</div>

`;
        expect(convertCollapsibleMarkupToHtml(`{{DIV_collapsible-wrapper}}{{DIV_collapsible-content}}
        {{DIV_collapsible-inner}}inner{{DIV_collapsible-inner_END}}
{{DIV_collapsible-content_END}}{{DIV_collapsible-wrapper_END}}`))
            .toEqual(expected);
    });
});