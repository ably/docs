import { render, screen } from '@testing-library/react';

import Paragraph from '.';
import HtmlDataTypes from '../../../../../data/types/html';

describe('Different data provided to paragraph elements results in successful rendering of different components', () => {
  const paragraphWithTip = {
    data: 'Lorem ipsum',
    attribs: {
      className: 'tip',
    },
  };

  it('Successfully renders paragraph with tip', () => {
    render(<Paragraph {...paragraphWithTip} />);

    const paragraphElement = screen.getByText('Lorem ipsum');
    expect(paragraphElement).toBeInTheDocument();
    const tipTitleElement = screen.getByText('Tip');
    expect(tipTitleElement).toBeInTheDocument();
  });

  const paragraphWithTipAndChildren = {
    data: [
      {
        data: 'Lorem ipsum',
        type: HtmlDataTypes.tag,
        name: HtmlDataTypes.strong,
      },
    ],
    attribs: {
      className: 'tip',
    },
  };

  it('Successfully renders paragraph with tip and strong tag child', () => {
    render(<Paragraph {...paragraphWithTipAndChildren} />);

    const strongElement = screen.getByText('Lorem ipsum');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement.tagName).toBe('STRONG');

    const tipTitleElement = screen.getByText('Tip');
    expect(tipTitleElement).toBeInTheDocument();
  });

  const paragraph = {
    data: 'Lorem ipsum',
    attribs: {},
  };

  const paragraphWithDefinition = {
    data: 'Lorem ipsum',
    attribs: {
      className: 'definition',
    },
  };
  it('Renders a normal paragraph', () => {
    render(<Paragraph {...paragraph} />);
    const paragraphElement = screen.getByText('Lorem ipsum');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe('P');

    const tipElement = screen.queryByText('Tip');
    expect(tipElement).not.toBeInTheDocument();
  });

  it('Renders a paragraph with definition', () => {
    render(<Paragraph {...paragraphWithDefinition} />);
    const paragraphElement = screen.getByText('Lorem ipsum');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe('P');
    expect(paragraphElement.className).toContain('text-code');

    const tipElement = screen.queryByText('Tip');
    expect(tipElement).not.toBeInTheDocument();
  });
});
