import { scriptLoader } from './utils';

describe('Utils', () => {
  describe('scriptLoader', () => {
    beforeEach(() => {
      document.body.innerHTML = `<script></script>`;
    });

    it('attaches a script tag', () => {
      scriptLoader(document, 'http://ga.com', { 'data-testid': 'script' });
      expect(document.body).toMatchSnapshot();
    });

    it('attaches a script tag with custom attributes', () => {
      scriptLoader(document, 'http://ga.com', { title: 'ga' });
      expect(document.body).toMatchSnapshot();
    });

    it('can replace defaults with custom attributes', () => {
      scriptLoader(document, 'http://ga.com', { async: false, defer: false, type: 'module' });
      expect(document.body).toMatchSnapshot();

      const script = document.querySelector('script[src="http://ga.com"]');
      expect(script).not.toBeNull();
      expect(script.async).toBeFalsy();
      expect(script.defer).toBeFalsy();
      expect(script.type).toBe('module');
    });

    it('can add data attributes', () => {
      scriptLoader(document, 'http://example.com', { data: { test: '1' } });

      const script = document.querySelector('script[src="http://example.com"]');
      expect(script).not.toBeNull();
      expect(script.dataset.test).toBe('1');
    });
  });
});
