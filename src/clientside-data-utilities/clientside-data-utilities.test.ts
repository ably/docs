/* eslint-disable jest/expect-expect */
import { assert, property, lorem, nat } from 'fast-check';
import { attribsContainClass } from '.';

const arbitrariesForAttribsContainClassTest = [
  lorem({ maxCount: 1 }), // The class to find
  lorem(), // The full className
  nat(2), // Where to place the class within the className
] as const;

const checkDesiredClassNamePresence =
  (shouldBePresent: boolean) => (cssClass: string, className: string, position: number) => {
    const attribs = {
      className: shouldBePresent ? className : className.replace(cssClass, `#${cssClass}`),
    };
    if (position === 0) {
      attribs.className = `${cssClass}${shouldBePresent ? ' ' : ''}${attribs.className}`;
    } else if (position === 2) {
      attribs.className = `${attribs.className}${shouldBePresent ? ' ' : ''}${cssClass}`;
    } else {
      attribs.className = `${attribs.className}${shouldBePresent ? ' ' : ''}${cssClass}${shouldBePresent ? ' ' : ''}${
        attribs.className
      }`;
    }
    expect(attribsContainClass(cssClass, attribs)).toBe(shouldBePresent);
  };

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
    assert(property(...arbitrariesForAttribsContainClassTest, checkDesiredClassNamePresence(true)));
  });

  it('Never returns true if the desired className is in any position in a className, but is not separated with spaces', () => {
    assert(property(...arbitrariesForAttribsContainClassTest, checkDesiredClassNamePresence(false)));
  });
});
