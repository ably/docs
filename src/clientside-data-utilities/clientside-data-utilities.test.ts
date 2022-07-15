import { assert, property, lorem, nat } from 'fast-check';
import { attribsContainClass } from '.';

describe('Ensures that attribs object contains the expected className', () => {
  it('Ensures that tip is present in a className', () => {
    expect(
      attribsContainClass('tip', {
        className: 'tip',
      }),
    ).toBe(true);
  });
  it('Returns false when tip is not in a className', () => {
    expect(attribsContainClass('tip', { className: 'no class present' })).toBe(false);
  });

  it('Always returns true if a desired className is in any position in a className, separated with spaces', () => {
    assert(
      property(
        lorem({ maxCount: 1 }), // The class to find
        lorem(), // The full className
        nat(2), // Where to place the class within the className
        (cssClass, className, position) => {
          const attribs = {
            className,
          };
          if (position === 0) {
            attribs.className = `${cssClass} ${attribs.className}`;
          } else if (position === 2) {
            attribs.className = `${attribs.className} ${cssClass}`;
          } else {
            attribs.className = `${attribs.className} ${cssClass} ${attribs.className}`;
          }
          expect(attribsContainClass(cssClass, attribs)).toBe(true);
        },
      ),
    );
  });

  it('Never returns true if the desired className is in any position in a className, but is not separated with spaces', () => {
    assert(
      property(
        lorem({ maxCount: 1 }), // The class to find
        lorem(), // The full className
        nat(2), // Where to place the class within the className
        (cssClass, className, position) => {
          const attribs = {
            className: className.replaceAll(cssClass, `#${cssClass}`),
          };
          if (position === 0) {
            attribs.className = `${cssClass}${attribs.className}`;
          } else if (position === 2) {
            attribs.className = `${attribs.className}${cssClass}`;
          } else {
            attribs.className = `${attribs.className}${cssClass}${attribs.className}`;
          }
          expect(attribsContainClass(cssClass, attribs)).toBe(false);
        },
      ),
    );
  });
});
