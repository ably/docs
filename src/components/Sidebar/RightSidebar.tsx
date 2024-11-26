import Icon from '@ably/ui/core/Icon';
import { useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { languageData } from 'src/data/languages';
import { languageInfo } from 'src/data/languages';
import { sidebarAlignmentClasses } from './utils';
import cn from 'clsx';

const LanguageDropdownOption = (props) => (
  <components.Option {...props}>
    <div>
      <Icon name={`icon-tech-${props.data.label}`} />
      <span>{languageInfo[props.data.label].label}</span>
      <span className="bg-neutral-200 p-3">{props.data.version}</span>
    </div>
  </components.Option>
);

const LanguageDropdown = () => {
  const activeProduct = 'pubsub';
  const languageVersions = languageData[activeProduct];

  const options = Object.entries(languageVersions).map(([lang, version]) => ({
    label: lang,
    value: `${lang}-${version}`,
    version,
  }));

  return <Select options={options} components={{ Option: LanguageDropdownOption }} />;
};

export const RightSidebar = () => {
  const [headers, setHeaders] = useState([]);
  const [activeHeader, setActiveHeader] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    const headerElements = document.querySelectorAll('h2, h3');
    setHeaders(
      Array.from(headerElements).map((header) => ({ type: header.tagName, label: header.textContent, id: header.id })),
    );

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeader(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-50% 0% -50% 0%',
      threshold: 0,
    });

    headerElements.forEach((header) => {
      observer.current.observe(header);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={sidebarAlignmentClasses}>
      <LanguageDropdown />
      <div>
        <p className="ui-text-overline2 text-neutral-700">On this page</p>
        <div>
          {headers.map((header) => (
            <div
              key={header.id}
              className={cn({ 'font-bold': header.id === activeHeader }, { 'ml-8': header.type === 'H3' })}
            >
              {header.label}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <Icon name="icon-social-github" /> Edit on Github <Icon name="icon-gui-external-link" />
        </div>
        <div>
          <Icon name="icon-gui-hand" /> Request changes <Icon name="icon-gui-external-link" />
        </div>
      </div>
    </div>
  );
};
