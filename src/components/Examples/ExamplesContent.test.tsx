import React from 'react';
import { render, screen, fireEvent, waitFor, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExamplesContent from './ExamplesContent';
import examples, { Example } from '../../data/examples';
import { ImageProps } from '../Image';

jest.mock('gatsby-plugin-image', () => {
  return {
    StaticImage: jest.fn(({ alt }) => <img alt={alt} />),
  };
});

jest.mock('./ExamplesGrid', () => {
  return jest.fn(({ examples }) => (
    <div>
      {examples.map((example: Example) => (
        <div key={example.name}>{example.name}</div>
      ))}
    </div>
  ));
});

jest.mock('./ExamplesNoResults', () => {
  return jest.fn(() => <div>No results found</div>);
});

describe('ExamplesContent', () => {
  const exampleImages = [{ src: 'image1.png' }, { src: 'image2.png' }] as ImageProps[];

  it('renders the ExamplesContent component', () => {
    render(<ExamplesContent exampleImages={exampleImages} />);
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(
      screen.getByText(
        'From avatar stacks to live cursors, learn how deliver live chat, multiplayer collaboration features, and more.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the ExamplesGrid with filtered examples', () => {
    render(<ExamplesContent exampleImages={exampleImages} />);
    examples.examples.forEach((example) => {
      expect(screen.getByText(example.name)).toBeInTheDocument();
    });
  });

  it('filters examples based on search input (no results)', () => {
    render(<ExamplesContent exampleImages={exampleImages} />);
    const searchInput = screen.getByPlaceholderText('Find an example');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Member location')).not.toBeInTheDocument();
    expect(screen.queryByText('Avatar stack')).not.toBeInTheDocument();
  });

  it('filters examples based on search input (with results)', () => {
    render(<ExamplesContent exampleImages={exampleImages} />);
    const searchInput = screen.getByPlaceholderText('Find an example');
    fireEvent.change(searchInput, { target: { value: 'avatar' } });
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    expect(screen.queryByText('Member location')).not.toBeInTheDocument();
    expect(screen.getByText('Avatar stack')).toBeInTheDocument();
  });

  it('filters examples based on product filter selection', () => {
    // Make the screen wider than the default of 1024px as desktop filtering only works >= 1040px
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1600 });
    window.dispatchEvent(new Event('resize'));

    render(<ExamplesContent exampleImages={exampleImages} />);
    const productFilterInput = screen.getByTestId('product-spaces');
    fireEvent.click(productFilterInput);

    expect(screen.queryByText('Avatar stack')).not.toBeInTheDocument();
    expect(screen.getByText('Member location')).toBeInTheDocument();
  });
});
