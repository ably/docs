import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { createDropdownButtonMenuHtmlId, DropdownButtonAndMenu } from './DropdownButton';
import { ResourcesDropDownData } from './resource-data';
import { escape } from 'lodash/fp';
import { DropdownData, DropdownDataIdentifier } from '../types';
import { APIReferencesDropdownData } from './api-references';
import { kebabCase } from 'lodash';
import '@testing-library/jest-dom/extend-expect';

const getDefinitelyOneElementByTagName = (containerElement: HTMLElement, tagName: string) => {
  const allMatchingElements = containerElement.getElementsByTagName(tagName);
  expect(allMatchingElements).toHaveLength(1);
  return allMatchingElements[0];
};

const expectDropdownToShowData = (container: HTMLElement, expectedData: DropdownData) => {
  expectAsideIdIsPresent(container, expectedData, true);
  const menuItems = container.querySelectorAll('li');
  menuItems.forEach((menuItem, index) => {
    const resourceContent = expectedData.contents[index];

    expect(getDefinitelyOneElementByTagName(menuItem, 'p').innerHTML).toBe(resourceContent.description);
    const aElement = getDefinitelyOneElementByTagName(menuItem, 'a');
    expect(aElement.innerHTML).toMatch(new RegExp(`^${escape(resourceContent.link.text)}?`));
    expect(aElement.getAttribute('href')).toBe(resourceContent.link.href);
  });

  expect(menuItems).toHaveLength(expectedData.contents.length);
};

const expectNoDropdownToShowNoData = (container: HTMLElement, expectedData: DropdownData) => {
  expectAsideIdIsPresent(container, expectedData, false);
  expect(container.querySelectorAll('li')).toHaveLength(0);
};

const expectAsideIdIsPresent = (container: HTMLElement, expectedData: DropdownData, isPresent: boolean) => {
  const menuItems = container.querySelectorAll(`#${kebabCase(expectedData.summaryTitle)}`);
  expect(menuItems).toHaveLength(isPresent ? 1 : 0);
};

const createDropDownButtonAndMenuElement = (isOpen: boolean, dropDownDataId: DropdownDataIdentifier) => {
  const onActivatedFn = jest.fn();
  const onMouseOverFn = jest.fn();
  const onMouseOutFn = jest.fn();
  const component = render(
    <DropdownButtonAndMenu
      isOpen={isOpen}
      dropdownDataID={dropDownDataId}
      onActivated={onActivatedFn}
      onMouseOver={onMouseOverFn}
      onMouseOut={onMouseOutFn}
    />,
  );
  return { component, onActivatedFn, onMouseOutFn, onMouseOverFn };
};

const expectFunctionCalledOnceWithIdentifier = (fn: jest.Mock, identifier: DropdownDataIdentifier) => {
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenNthCalledWith(1, identifier);
};

test('DropdownButton and Menu ID generation', () => {
  const result = createDropdownButtonMenuHtmlId('API References');
  const expected = 'api-references-button-menu';
  expect(result).toEqual(expected);
});

test('Expect menu open to show items', () => {
  const { component } = createDropDownButtonAndMenuElement(true, 'Resources');
  expectDropdownToShowData(component.container, ResourcesDropDownData);
});

test('Expect menu open to different items and no button click', () => {
  const { component, onActivatedFn } = createDropDownButtonAndMenuElement(true, 'API References');
  expectDropdownToShowData(component.container, APIReferencesDropdownData);
  expect(onActivatedFn).toHaveBeenCalledTimes(0);
});

test('Expect menu close to not show items', () => {
  const { component } = createDropDownButtonAndMenuElement(false, 'Resources');
  expectNoDropdownToShowNoData(component.container, ResourcesDropDownData);
});

test('Button click calls activated event with correct ID', () => {
  const { onActivatedFn } = createDropDownButtonAndMenuElement(false, 'Resources');
  fireEvent.click(screen.getByRole('button'));

  expectFunctionCalledOnceWithIdentifier(onActivatedFn, 'Resources');
});

test('Other keypresses dont activate event', () => {
  const { onActivatedFn } = createDropDownButtonAndMenuElement(true, 'Resources');
  const buttonElement = screen.getByRole('button');
  ['A', 'c', 'g', 'x'].forEach((key) => fireEvent.keyUp(buttonElement, { key }));

  expect(onActivatedFn).toHaveBeenCalledTimes(0);
});

test('Mouse over triggers mouse-over event', () => {
  const { onMouseOverFn } = createDropDownButtonAndMenuElement(false, 'Resources');
  const buttonElement = screen.getByRole('button');
  fireEvent.mouseOver(buttonElement);
  expect(onMouseOverFn).toHaveBeenCalledTimes(1);
});

test('Mouse out of menu triggers mouse-out event', () => {
  const testDropdownDataID = 'Resources';
  const testDropdownDataHtmlID = `#${createDropdownButtonMenuHtmlId(testDropdownDataID)}`;
  const { component, onMouseOutFn } = createDropDownButtonAndMenuElement(false, testDropdownDataID);

  const buttonContainerElement = component.container.querySelector(testDropdownDataHtmlID);
  if (buttonContainerElement) {
    fireEvent.mouseLeave(buttonContainerElement);
  }
  expect(onMouseOutFn).toHaveBeenCalledTimes(1);
});

test('Tab highlights first element in dropdown menu', () => {
  const { component, onActivatedFn } = createDropDownButtonAndMenuElement(true, 'Resources');
  const containerElement = component.container;
  const buttonElement = screen.getByRole('button');
  const firstMenuLink = component.container.getElementsByTagName('li')[0];

  const keydownTabEvent = new KeyboardEvent('keydown', { key: 'tab' });

  containerElement.dispatchEvent(keydownTabEvent);
  setTimeout(() => expect(buttonElement).toHaveFocus(), 0); // Source: https://morgan.cugerone.com/blog/quick-tip-how-to-assert-active-element-after-tab-keydown-event-in-jest/

  containerElement.dispatchEvent(keydownTabEvent);
  setTimeout(() => {
    expect(buttonElement).not.toHaveFocus();
    expect(firstMenuLink).toHaveFocus();
  }, 0);

  expect(onActivatedFn).toHaveBeenCalledTimes(0);
});
