import styled from 'styled-components';
import { primary, text } from '../../styles/colors';

/** cf. Ably website repo
 * app/assets/javascripts/modules/documentation/htmlTemplates.js
 * app/assets/stylesheets/components/_c.menu.scss
*/
const Menu = styled.menu`
	position: relative;
	list-style: none;
	margin-bottom: 0px;
    padding-left: 0;

    .c-menu__item {
		position: relative;
		white-space: nowrap;
		word-break: initial;
	}
`;

const HorizontalMenu = styled(Menu)`
	position: relative;
	display: flex;
	padding:0;
	margin: 0;
	overflow-y: hidden;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	white-space: nowrap;

	.c-menu__item {
		padding: 0 10px;
	}

	.c-menu__trigger {
		cursor: pointer;
		display: block;
		position: relative;
		user-select: none;
	}
`;

const HorizontalCodeMenu = styled(HorizontalMenu)`
    background-color: ${primary.charcoal};
	align-items: center;

    color: ${text.linkInverse};
	.c-menu__item,
	.c-menu__trigger{
		letter-spacing: -0.1px;
	}
	.c-menu__item{
		font-size: 13px;
        line-height: 30px;
	}

	.c-menu__trigger{
		font-size: inherit;
		font-family: 'Inconsolata', monospace;
		background: none;
		padding: 0;
		color: ${text.aux};


		&:hover,
		&.active,
		&.is-active{
			color: ${text.linkHoverAlternateMuted};
		}
	}

	.c-menu__label{
		font-size: 12px;
        line-height: 30px;
		font-weight: 700;
        padding: --spacing(8)
	}
`;

export {
    HorizontalMenu,
    HorizontalCodeMenu
}