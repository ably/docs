import styled from 'styled-components';
import React from 'react';
import { fonts, spacing } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';

const StyledH1 = ({ props, children }) => <h1 {...props} className='ui-text-h4'>{children}</h1>;

const H1 = LinkableHtmlBlock(StyledH1);

export default H1;
