import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mq, spacing } from '../../styles';

// Source: Ably/Voltaire src/components/table-of-contents/title.js
const Title = styled.p`
    ${fonts.efficientBody}

    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 2px;

    border-bottom: 1px solid ${colors.containers.one};
    color: ${colors.text.aux};

    padding: ${spacing.small.value + 6 + spacing.small.unit} ${spacing.small.value + 2 + spacing.small.unit};
    margin: 0;

    background-color: white;
    position: relative;
    z-index: 3;

    ${mq.minWidth.medium} {
        background-color: transparent;
    }
`;

const SidebarTitle = ({ title }) => <Title>{title}</Title>;

export default SidebarTitle;