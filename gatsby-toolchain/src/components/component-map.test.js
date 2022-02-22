import HtmlDataTypes from '../../data/types/html';
import componentMap, { IS_TEXT } from './component-map';

// This test verges on testing third-party libraries, but lodash-fp is poorly documented so it has been included.
describe('Component map retrieves values expected', () => {
  it('value not present', () => {
    expect(componentMap('value not present')).toBe(IS_TEXT);
  });
  it('paragraph', () => {
    expect(componentMap(HtmlDataTypes.p)).not.toBe(IS_TEXT);
  });
});
