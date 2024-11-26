import Icon from '@ably/ui/core/Icon';
import Select from 'react-select';
import { languageData } from 'src/data/languages';
import { languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

type LanguageDropdownOptionProps = {
  data: {
    label: LanguageKey;
    value: string;
    version: number;
  };
};

const LanguageDropdownOption = (props: LanguageDropdownOptionProps) => (
  <div>
    <Icon name={`icon-tech-${props.data.label}`} />
    <span>{languageInfo[props.data.label].label}</span>
    <span className="bg-neutral-200 p-3">{props.data.version}</span>
  </div>
);

export const LanguageDropdown = () => {
  const activeProduct = 'pubsub';
  const languageVersions = languageData[activeProduct];

  const options = Object.entries(languageVersions).map(([lang, version]) => ({
    label: lang as LanguageKey,
    value: `${lang}-${version}`,
    version,
  }));

  return <Select options={options} components={{ Option: LanguageDropdownOption }} />;
};
