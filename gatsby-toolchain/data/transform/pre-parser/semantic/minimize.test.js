const { addMinimizeForHeadings, addMinimizedIndent } = require("./minimize");

const h3Minimize = `h3(#minimizable-title)(minimize=Click to see how to minimize by title). Minimize on the title

Some content

h3. Next title`;
const h3MinimizeExpected = `h3(#minimizable-title). Minimize on the title

{{DIV_collapsible-wrapper}}
<input id='collapsible-heading1' class='minimize-checkbox toggle' type='checkbox'/>
<label for='collapsible-heading1' class='label-collapsible'>+ View More</label>
{{DIV_collapsible-content}}
{{DIV_collapsible-inner}}
Some content

{{DIV_collapsible-inner_END}}
<label for='collapsible-heading1' class='label-collapsible-close'>- View Less</label>{{DIV_collapsible-content_END}}{{DIV_collapsible-wrapper_END}}



h3. Next title`;

describe('Adds minimize tokens for headings with (minimize)d content', () => {
    it('Successfully adds minimize tokens as wrappers for headings in format h3(minimize).', () => {
        const result = addMinimizeForHeadings(h3Minimize);
        expect(result).toEqual(h3MinimizeExpected);
    });
});

const sectionMinimize = `minimize. Click to see how to minimize by block
  It is also possible to create a minimizable section with the *minimize. [Optional minimizable text]* line,
  with any following indented lines being included in the minimizable section. If no optional minimize button
  text is typed, it will default to *View More*.
`;
const sectionMinimizeExpected = `{{DIV_collapsible-wrapper}}
<input id='collapsible-indent0' class='minimize-checkbox toggle' type='checkbox'><label for='collapsible-indent0' class='label-collapsible'>+ Click to see how to minimize by block</label>{{DIV_collapsible-content}}
{{DIV_collapsible-inner}}
It is also possible to create a minimizable section with the *minimize. [Optional minimizable text]* line,
with any following indented lines being included in the minimizable section. If no optional minimize button
text is typed, it will default to *View More*.


{{DIV_collapsible-inner_END}}
<label for='collapsible-indent0' class='label-collapsible-close'>- View Less</label>{{DIV_collapsible-content_END}}{{DIV_collapsible-wrapper_END}}

`;

describe('Adds minimize tokens for sections with minimize.d content', () => {
    it('Successfully adds minimize tokens as wrappers for sections marked with minimize. and indentations', () => {
        const result = addMinimizedIndent(sectionMinimize);
        expect(result).toEqual(sectionMinimizeExpected);
    });
})

