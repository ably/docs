import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageLanguageContext } from 'src/contexts';
import { Pre } from './';

const DATA_ARRAY_TEST = [{ data: 'useVars = false;', type: 'text' }];
const PRE_TEST_SINGLE_DATA = { data: DATA_ARRAY_TEST, type: 'tag', name: 'code' };
const PRE_TEST_DATA = [PRE_TEST_SINGLE_DATA];
const PRE_REALTIME_JS_TEST_DATA = [
  {
    attribs: { lang: 'realtime_javascript' },
    ...PRE_TEST_SINGLE_DATA,
  },
];
const PRE_REST_JS_TEST_DATA = [
  {
    attribs: { lang: 'rest_javascript' },
    ...PRE_TEST_SINGLE_DATA,
  },
];

const PRE_REALTIME_CSHARP_TEST_DATA = [
  {
    attribs: { lang: 'realtime_csharp' },
    ...PRE_TEST_SINGLE_DATA,
  },
];

const PRE_REST_CSHARP_TEST_DATA = [
  {
    attribs: { lang: 'rest_csharp' },
    ...PRE_TEST_SINGLE_DATA,
  },
];

describe('<Pre />', () => {
  it('should successfully render Code elements with language', () => {
    const { container } = render(
      <Pre
        data={PRE_TEST_DATA}
        language="javascript"
        languages={['javascript', 'csharp']}
        altData={{
          javascript: PRE_TEST_DATA,
          csharp: [{ data: [{ data: 'bool useVars = false;', type: 'text' }], type: 'tag', name: 'code' }],
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render tip wrapper if language is unavailable', () => {
    render(
      <PageLanguageContext.Provider value="javascript">
        <Pre
          data={PRE_TEST_DATA}
          language="javascript"
          languages={['python', 'csharp']}
          altData={{
            python: [{ data: 'useVars = false;', type: 'text' }],
            csharp: [{ data: 'bool useVars = false;', type: 'text' }],
          }}
        />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByText('we don’t yet have a relevant code sample', { exact: false })).toBeInTheDocument();
  });

  it('should render code block when no languages are passed', () => {
    const { container } = render(<Pre data={PRE_TEST_DATA} language="javascript" languages={undefined} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should successfully render code elements with both Rest and Realtime languages', () => {
    const { container } = render(
      <Pre
        data={PRE_REALTIME_JS_TEST_DATA}
        language="javascript"
        languages={['realtime_javascript', 'realtime_csharp', 'rest_javascript', 'rest_csharp']}
        altData={{
          realtime_javascript: PRE_REALTIME_JS_TEST_DATA,
          realtime_csharp: PRE_REALTIME_CSHARP_TEST_DATA,
          rest_javascript: PRE_REST_JS_TEST_DATA,
          rest_csharp: PRE_REST_CSHARP_TEST_DATA,
        }}
        isSDKInterface={true}
        realtimeAltData={{
          realtime_javascript: PRE_REALTIME_JS_TEST_DATA,
          realtime_csharp: PRE_REALTIME_CSHARP_TEST_DATA,
        }}
        restAltData={{
          rest_javascript: PRE_REST_JS_TEST_DATA,
          rest_csharp: PRE_REST_CSHARP_TEST_DATA,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should successfully render code elements with  only Realtime languages', () => {
    const { container } = render(
      <Pre
        data={PRE_REALTIME_CSHARP_TEST_DATA}
        language="csharp"
        languages={['realtime_javascript', 'realtime_csharp']}
        altData={{
          realtime_javascript: PRE_REALTIME_JS_TEST_DATA,
          realtime_csharp: PRE_REALTIME_CSHARP_TEST_DATA,
        }}
        isSDKInterface={true}
        realtimeAltData={{
          realtime_javascript: PRE_REALTIME_JS_TEST_DATA,
          realtime_csharp: PRE_REALTIME_CSHARP_TEST_DATA,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should successfully render code elements with  only Rest languages', () => {
    const { container } = render(
      <Pre
        data={PRE_REST_JS_TEST_DATA}
        language="csharp"
        languages={['rest_javascript', 'rest_csharp']}
        altData={{
          realtime_javascript: PRE_REST_JS_TEST_DATA,
          realtime_csharp: PRE_REST_CSHARP_TEST_DATA,
        }}
        isSDKInterface={true}
        restAltData={{
          rest_javascript: PRE_REST_JS_TEST_DATA,
          rest_csharp: PRE_REST_CSHARP_TEST_DATA,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
