import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageLanguageContext } from 'src/contexts';
import { Pre } from './';

const PRE_TEST_DATA = [{ data: [{ data: 'useVars = false;', type: 'text' }], type: 'tag', name: 'code' }];

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
});
