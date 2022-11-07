import { SidebarData } from 'src/components';
import { DropdownData, DropdownDataIdentifier } from '../../../Dropdown';
import { dropdownData } from '../../../Dropdown/Button';
import { ArticleType } from '../../../../../../contexts/article-type-context';
import { ARTICLE_TYPES } from '../../../../../../../data/transform/constants';

const ADHOC_SIDEBAR_INCLUSIONS: DropdownDataIdentifier[] = ['API References', 'Resources'];

const API_ADHOC_SIDEBAR_INCLUSIONS: DropdownDataIdentifier[] = ['Resources'];

const mapDropdownDataToSidebarData = (dropdownData: DropdownData): SidebarData => ({
  label: dropdownData.summaryTitle,
  link: dropdownData.summaryLink?.href ?? '',
  content: dropdownData.contents.map((dropdownContent) => ({
    label: dropdownContent.link.text,
    link: dropdownContent.link.href,
  })),
  dropdownData: dropdownData,
});

export const addAdhocSidebarItems = (data: SidebarData[], articleType: ArticleType) => {
  const adHocSidebarInclusions =
    articleType === ARTICLE_TYPES.apiReference ? API_ADHOC_SIDEBAR_INCLUSIONS : ADHOC_SIDEBAR_INCLUSIONS;
  const dropdownDataItems = adHocSidebarInclusions.map(
    (dropdownDataID) => dropdownDataID && dropdownData[dropdownDataID],
  );

  const sidebarItems = dropdownDataItems.map(mapDropdownDataToSidebarData);
  const withReplacements = data.concat(sidebarItems);
  return withReplacements;
};
