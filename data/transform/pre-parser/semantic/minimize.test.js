const { addMinimizeForHeadings, addMinimizedIndent } = require("./minimize");

const h3Minimize = `h3(#minimizable-title)(minimize=Click to see how to minimize by title). Minimize on the title

Some content

h3. Next title`;
const h3MinimizeNoTitle = `h3(#minimizable-title)(minimize). Minimize on the title

Some content no title

h3. Next title`;
const h3MinimizeExpected = `h3(#minimizable-title). Minimize on the title

<details><summary>Click to see how to minimize by title</summary><div>Some content</div></details>


h3. Next title`;
const h3MinimizeExpectedViewMore = `h3(#minimizable-title). Minimize on the title

<details><summary>View More</summary><div>Some content no title</div></details>


h3. Next title`;

describe('Adds minimize tokens for headings with (minimize)d content', () => {

    it('Successfully adds minimize tokens as wrappers for headings in format h3(minimize).', () => {
        const result = addMinimizeForHeadings(h3Minimize);
        expect(result).toEqual(h3MinimizeExpected);
    });

    it('Successfully adds minimize tokens as wrappers for headings in format h3(minimize) with no title.', () => {
        const result = addMinimizeForHeadings(h3MinimizeNoTitle);
        expect(result).toEqual(h3MinimizeExpectedViewMore);
    });
});

const sectionMinimize = `minimize. Click to see how to minimize by block
  It is also possible to create a minimizable section with the *minimize. [Optional minimizable text]* line, with any following indented lines being included in the minimizable section. If no optional minimize button text is typed, it will default to *View More*.

h3. Next title`;
const sectionMinimizeNoTitle = `minimize.
  It is also possible to create a minimizable section with the *minimize. [Optional minimizable text]* line, with any following indented lines being included in the minimizable section. If no optional minimize button text is typed, it will default to *View More*.

h3. Next title`;
const sectionMinimizeExpected = `<details><summary>Click to see how to minimize by block</summary><div>It is also possible to create a minimizable section with the *minimize. [Optional minimizable text]* line, with any following indented lines being included in the minimizable section. If no optional minimize button text is typed, it will default to *View More*.</div></details>


h3. Next title`;
const sectionMinimizeExpectedNoTitle = `<details><summary>View More</summary><div>It is also possible to create a minimizable section with the *minimize. [Optional minimizable text]* line, with any following indented lines being included in the minimizable section. If no optional minimize button text is typed, it will default to *View More*.</div></details>


h3. Next title`;

describe('Adds minimize tokens for sections with minimize.d content', () => {
    it('Successfully adds minimize tokens as wrappers for sections marked with minimize. and indentations', () => {
        const result = addMinimizedIndent(sectionMinimize);
        expect(result).toEqual(sectionMinimizeExpected);
    });
    it('Successfully adds minimize tokens as wrappers for sections marked with minimize. (with no title) and indentations', () => {
        const result = addMinimizedIndent(sectionMinimizeNoTitle);
        expect(result).toEqual(sectionMinimizeExpectedNoTitle);
    });
})

