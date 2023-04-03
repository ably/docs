// import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { HtmlComponentProps } from '../../html-component-props';
import Html from '../Html';
import styled from 'styled-components';
import { colors } from '../../../styles';
import Icon from '@ably/ui/core/Icon';
import { isArray } from 'lodash';
import HtmlDataTypes from '../../../../data/types/html';

/**
 * This is required because Tailwind v2 does not offer a good way to style one side of a border.
 * The closest to what design requires here is:
 * rounded-lg bg-{#FAFAFB} ring-2 ring-{#d9d9da} ring-inset border-l-8 border-{#08ff13} e p-4
 bg-{#08ff13} w-8 left-0 cursor-default
 */

const LeftsideElement = styled.span`
  width: 8px;
  border-radius: 0.5em 0 0 0.5em;
  left: 0;
  cursor: default;
  grid-row-start: 1;
  grid-row-end: span 2;
  grid-column-start: 1;
  grid-column-end: 1;
  height: 100%;
`;

const NoteElement = styled(LeftsideElement)`
  background-color: #4af7ff;
`;
const PitfallElement = styled(LeftsideElement)`
  background-color: #ff5416;
`;
const FurtherReadingElement = styled(LeftsideElement)`
  background-color: #08fe13;
`;

const TipTitleElement = styled.strong`
  margin-left: var(--spacing-12);
  margin-top: var(--spacing-12);
  padding: var(--spacing-16);
  grid-column-start: 1;
  grid-row-start: 1;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.1em;
  line-height: 18px;
`;

const InlineContentContainer = styled.div`
  grid-row: 2;
  grid-column: 1;
  margin-left: var(--spacing-16);
  padding-left: var(--spacing-16);
  padding-right: var(--spacing-16);
  padding-bottom: ${(props: { paddingBottom: string | false }) => (props.paddingBottom ? props.paddingBottom : '24px')};

  margin-bottom: var(--spacing-8);
`;

const InlineGridParagraph = styled.aside`
  display: inline-grid;
  border-radius: 0.5em;
  background-color: ${colors.containers.three};
  border-width: 1px;
  border-color: #d9d9da;
  grid-template-rows: auto auto;
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 23px;
  padding: 0;
  width: 100%;
`;

const Aside = ({ data, attribs }: HtmlComponentProps<'div'>) => {
  let paddingBottom: string | false = false;
  if (isArray(data) && data[data.length - 1].name === HtmlDataTypes.ul) {
    paddingBottom = '0';
  }
  return (
    <InlineGridParagraph className={`${attribs?.className}`}>
      {attribs && attribs[`data-type`] === `pitfall` ? (
        <>
          <PitfallElement>&nbsp;</PitfallElement>
          <TipTitleElement>
            <Icon name="icon-gui-warning" size="1rem" additionalCSS="mr-12" />
            <span className="mb-48">Pitfall</span>
          </TipTitleElement>
        </>
      ) : attribs && attribs[`data-type`] === `further-reading` ? (
        <>
          <FurtherReadingElement>&nbsp;</FurtherReadingElement>
          <TipTitleElement>
            <Icon name="icon-gui-resources" size="1rem" additionalCSS="mr-12" />
            <span className="mb-48">Further Reading</span>
          </TipTitleElement>
        </>
      ) : (
        <>
          <NoteElement>&nbsp;</NoteElement>
          <TipTitleElement>
            <Icon name="icon-gui-document-generic" size="1rem" additionalCSS="mr-12" />
            <span className="mb-48">Note</span>
          </TipTitleElement>
        </>
      )}

      <InlineContentContainer paddingBottom={paddingBottom} className={`inline`}>
        <Html data={data} />
      </InlineContentContainer>
    </InlineGridParagraph>
  );
};

export default Aside;
