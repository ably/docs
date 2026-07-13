import React, { useState, useEffect, Children, isValidElement, useRef, useCallback, useMemo } from 'react';
import Code from 'src/components/ui/Code';
import type { LineHighlightType } from 'src/components/ui/Code';
import cn from 'src/utilities/cn';
import { parseLineHighlights } from 'src/utilities/syntax-highlighter';
import Icon from 'src/components/Icon';
import { getLanguageInfo, stripSdkType, SDK_PREFIXES, SDKType } from './CodeSnippet/languages';
import LanguageSelector from './CodeSnippet/LanguageSelector';
import ApiKeySelector from './CodeSnippet/ApiKeySelector';
import PlainCodeView from './CodeSnippet/PlainCodeView';
import CopyButton from './CodeSnippet/CopyButton';
import SegmentedControl from 'src/components/ui/SegmentedControl';
import { CommandLineIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export type { SDKType };

export type ApiKeysItem = {
  app: string;
  keys: { name: string; key: string }[];
};

export type CodeSnippetProps = {
  /**
   * If true, hides the language selector row completely
   */
  fixed?: boolean;
  /**
   * If true, renders a macOS-style window header with buttons and title
   */
  headerRow?: boolean;
  /**
   * Title to display in the header row (when headerRow is true)
   */
  title?: string;
  /**
   * Children elements with lang attribute
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Default language to display. If not found in available languages, first available is used.
   * If found in languages but no matching snippet exists, a message is displayed.
   */
  lang: string | null;
  /**
   * Callback fired when the active language changes
   */
  onChange?: (language: string, sdk?: SDKType) => void;
  /**
   * List of API keys to display in a dropdown
   */
  apiKeys?: ApiKeysItem[];
  /**
   * Default SDK type to use for the code snippet
   */
  sdk?: SDKType;
  /**
   * Whether to show line numbers in code snippets
   */
  showCodeLines?: boolean;
  /**
   * Defines the order in which languages should be displayed.
   * Languages not in this array will be shown after those that are included.
   */
  languageOrdering?: string[];
  /**
   * Whether to wrap code content instead of scrolling
   */
  wrapCode?: boolean;
};

const substituteApiKey = (content: string, apiKey: string, mask = true): string => {
  return content.replace(/\{\{API_KEY\}\}/g, mask ? `${apiKey.split(':')[0]}:*****` : apiKey);
};

/**
 * CodeSnippet component that displays code with language switching capability
 */
const CodeSnippet: React.FC<CodeSnippetProps> = ({
  fixed = false,
  headerRow = false,
  title = 'Code',
  children,
  className,
  lang,
  onChange,
  apiKeys,
  sdk,
  showCodeLines = true,
  languageOrdering,
  wrapCode = false,
}) => {
  const codeRef = useRef<HTMLDivElement>(null);

  const [selectedApiKey, setSelectedApiKey] = useState<string>(() => apiKeys?.[0]?.keys?.[0]?.key ?? '');
  const [prevApiKeys, setPrevApiKeys] = useState(apiKeys);
  if (prevApiKeys !== apiKeys) {
    setPrevApiKeys(apiKeys);
    if (!selectedApiKey && apiKeys && apiKeys.length > 0) {
      setSelectedApiKey(apiKeys[0].keys?.[0]?.key ?? '');
    }
  }

  useEffect(() => {
    const element = codeRef.current;
    if (!element) {
      return;
    }

    // Detects the key masking via substituteApiKey (i.e. "abcde:*****") and replaces it with the actual API key
    const unmaskRenderedApiKey = (content: string, apiKey: string): string => {
      return content.replace(/(['"]?)([^:'"]+):\*{5}\1/g, `$1${apiKey}$1`);
    };

    const handleCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        return;
      }

      const selectedText = selection.toString();
      if (!selectedText) {
        return;
      }

      const range = selection.getRangeAt(0);
      if (!element.contains(range.commonAncestorContainer)) {
        return;
      }

      const modifiedText = unmaskRenderedApiKey(selectedText, selectedApiKey);

      event.clipboardData?.setData('text/plain', modifiedText);
      event.preventDefault();
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [selectedApiKey]);

  const extractLanguageFromCode = useCallback((codeElement: React.ReactElement | null): string | null => {
    if (!codeElement || !codeElement.props.className) {
      return null;
    }

    const classNames = codeElement.props.className.split(' ');
    const langClass = classNames.find((cls: string) => cls.startsWith('language-'));
    if (!langClass) {
      return null;
    }

    return langClass.substring(9); // Remove "language-" prefix
  }, []);

  // Helper to find the code element within pre's children (handles both single element and array)
  const findCodeElement = useCallback((preChildren: React.ReactNode): React.ReactElement | null => {
    if (isValidElement(preChildren)) {
      return preChildren;
    }
    if (Array.isArray(preChildren)) {
      const codeEl = preChildren.find((c) => isValidElement(c));
      return codeEl && isValidElement(codeEl) ? codeEl : null;
    }
    return null;
  }, []);

  const { codeData, languages, sdkTypes, isSinglePlainCommand } = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const languages: string[] = [];
    const sdkTypes = new Set<SDKType>();
    const codeData: {
      language: string;
      content: string;
      lineHighlights: Record<number, LineHighlightType>;
    }[] = [];

    const isSinglePlainCommand =
      childrenArray.length === 1 &&
      ['language-shell', 'language-text'].some((lang) => {
        if (!isValidElement(childrenArray[0])) {
          return false;
        }
        const codeEl = findCodeElement(childrenArray[0].props.children);
        return codeEl?.props.className?.includes(lang);
      });

    childrenArray.forEach((child) => {
      if (!isValidElement(child)) {
        return;
      }

      const preElement = child;
      const codeElement = findCodeElement(preElement.props.children);

      if (!codeElement) {
        return;
      }

      const rawLanguage = extractLanguageFromCode(codeElement);

      if (!rawLanguage) {
        return;
      }

      const meta: string | undefined = codeElement.props?.['data-meta'];
      const { lang: codeLanguage, highlights: lineHighlights } = parseLineHighlights(rawLanguage, meta);

      for (const prefix of SDK_PREFIXES) {
        if (codeLanguage.startsWith(`${prefix}_`)) {
          sdkTypes.add(prefix);
          break;
        }
      }

      if (!languages.includes(codeLanguage)) {
        languages.push(codeLanguage);
      }

      const codeContent = codeElement.props.children;
      codeData.push({
        language: codeLanguage,
        content: codeContent,
        lineHighlights,
      });
    });

    return {
      codeData,
      languages,
      sdkTypes,
      isSinglePlainCommand,
    };
  }, [children, extractLanguageFromCode, findCodeElement]);

  // Resolve which SDK type to filter by. If the snippet only contains one SDK type
  // and it doesn't match the current selector, fall back to the only available type.
  // Returns undefined when no SDK prop is provided (e.g. plain code blocks without SDK prefixes).
  const resolvedSdk: SDKType | undefined = useMemo(() => {
    if (sdkTypes.size === 1 && sdk && !sdkTypes.has(sdk)) {
      return Array.from(sdkTypes)[0];
    }
    return sdk;
  }, [sdk, sdkTypes]);

  // Only show SDK selector for realtime/rest types, not for client/agent (which are controlled by page-level selector)
  const showSDKSelector = sdkTypes.has('realtime') || sdkTypes.has('rest');

  const filteredLanguages = useMemo(() => {
    const filtered =
      !resolvedSdk || !showSDKSelector
        ? [...languages]
        : languages.filter((lang) => lang.startsWith(`${resolvedSdk}_`));

    if (languageOrdering && languageOrdering.length > 0) {
      filtered.sort((a, b) => {
        const aBase = stripSdkType(a);
        const bBase = stripSdkType(b);

        const aIndex = languageOrdering.indexOf(aBase);
        const bIndex = languageOrdering.indexOf(bBase);

        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }
        if (aIndex !== -1) {
          return -1;
        }
        if (bIndex !== -1) {
          return 1;
        }
        return 0;
      });
    }

    return filtered;
  }, [resolvedSdk, showSDKSelector, languages, languageOrdering]);

  const activeLanguage = useMemo(() => {
    // For client/agent SDK types (controlled by page-level selector), construct the full language
    if (resolvedSdk === 'client' || resolvedSdk === 'agent') {
      const fullLang = `${resolvedSdk}_${lang}`;
      // Verify this language exists in available languages
      if (languages.includes(fullLang)) {
        return fullLang;
      }
      // Fall back to first language with this prefix
      const prefixMatch = languages.find((l) => l.startsWith(`${resolvedSdk}_`));
      if (prefixMatch) {
        return prefixMatch;
      }
    }

    // For realtime/rest SDK types
    if (resolvedSdk && sdkTypes.has(resolvedSdk)) {
      return `${resolvedSdk}_${lang}`;
    }

    if (lang) {
      return lang;
    }

    if (filteredLanguages.length > 0) {
      return filteredLanguages[0];
    }

    return languages[0];
  }, [resolvedSdk, sdkTypes, lang, filteredLanguages, languages]);

  const requiresApiKeySubstitution = useMemo(() => {
    const containsPlaceholder = codeData.some((code) => code?.content.includes('{{API_KEY}}'));

    return containsPlaceholder && !!apiKeys && apiKeys.length > 0 && !!selectedApiKey;
  }, [codeData, apiKeys, selectedApiKey]);

  const [isHovering, setIsHovering] = useState(false);

  const hasOnlyJsonSnippet = useMemo(() => languages.length === 1 && languages[0] === 'json', [languages]);

  const processedChildren = useMemo(() => {
    if (!activeLanguage) {
      return [];
    }

    const targetLanguage = hasOnlyJsonSnippet ? 'json' : activeLanguage;

    return codeData
      .filter((code) => {
        return code?.language === targetLanguage;
      })
      .map((code) => {
        if (!code) {
          return null;
        }

        const cleanLang = hasOnlyJsonSnippet ? 'json' : code.language;
        const langInfo = getLanguageInfo(cleanLang ?? '');

        if (typeof code.content === 'string' || typeof code.content === 'number' || typeof code.content === 'boolean') {
          let processedContent = String(code.content);
          if (requiresApiKeySubstitution) {
            processedContent = substituteApiKey(processedContent, selectedApiKey);
          }

          if (!langInfo.syntaxHighlighterKey || !cleanLang) {
            return null;
          }

          return (
            <Code
              key={code.language}
              language={langInfo.syntaxHighlighterKey || cleanLang}
              snippet={processedContent}
              additionalCSS="!bg-neutral-000 text-neutral-1300 dark:!bg-neutral-1300 dark:text-neutral-200 px-6 py-4"
              showLines={showCodeLines}
              wrap={wrapCode}
              lineHighlights={Object.keys(code.lineHighlights).length > 0 ? code.lineHighlights : undefined}
            />
          );
        }

        return null;
      });
  }, [
    activeLanguage,
    hasOnlyJsonSnippet,
    codeData,
    requiresApiKeySubstitution,
    showCodeLines,
    wrapCode,
    selectedApiKey,
  ]);

  const hasSnippetForActiveLanguage = useMemo(() => {
    if (!activeLanguage) {
      return false;
    }
    if (hasOnlyJsonSnippet) {
      return true;
    }

    return codeData.some((code) => {
      return code?.language === activeLanguage;
    });
  }, [activeLanguage, hasOnlyJsonSnippet, codeData]);

  const handleSDKTypeChange = useCallback(
    (type: SDKType) => {
      const nextLang = stripSdkType(
        languages.find((l) => l === `${type}_${stripSdkType(activeLanguage)}`) ??
          languages.find((l) => l.startsWith(`${type}_`)) ??
          activeLanguage,
      );

      if (onChange && nextLang) {
        onChange(stripSdkType(activeLanguage), type);
      }
    },
    [activeLanguage, languages, onChange],
  );

  const handleLanguageChange = useCallback(
    (language: string) => {
      if (onChange) {
        onChange(stripSdkType(language), resolvedSdk);
      }
    },
    [onChange, resolvedSdk],
  );

  const noSnippetMessage = useMemo(() => {
    if (!activeLanguage) {
      return null;
    }

    const activeLanguageInfo = getLanguageInfo(activeLanguage);

    return (
      <div className="px-16 py-6 ui-text-body2 text-neutral-800 dark:text-neutral-400 text-center flex flex-col gap-3 items-center">
        <ExclamationTriangleIcon className="size-[24px] text-yellow-600 dark:text-yellow-400" aria-hidden />
        <p className="ui-text-p3 text-neutral-700 dark:text-neutral-600">
          You&apos;re currently viewing the {activeLanguageInfo.label} docs. There either isn&apos;t a{' '}
          {activeLanguageInfo.label} code sample for this example, or this feature isn&apos;t supported in{' '}
          {activeLanguageInfo.label}. Switch language to view this example in a different language, or check which SDKs
          support this feature.
        </p>
      </div>
    );
  }, [activeLanguage]);

  const showLanguageSelector = !fixed && filteredLanguages.length > 0;
  const showFullSelector = filteredLanguages.length > 1;
  // Show a read-only language label when fixed (controlled by external selector)
  const showFixedLanguageLabel = fixed && activeLanguage;

  const renderLanguageLabel = (langKey: string, onClick?: () => void) => (
    <div
      className={cn(
        'border-b border-neutral-300 dark:border-neutral-1000 h-[2.125rem] inline-flex items-center px-3 w-full',
        { 'rounded-t-lg': !headerRow },
      )}
    >
      <div className={cn('inline-flex items-center', onClick && 'cursor-pointer')} {...(onClick && { onClick })}>
        <Icon name={getLanguageInfo(langKey).icon} size="16px" additionalCSS="mr-2" />
        <span className="ui-text-label4 font-semibold text-neutral-800 dark:text-neutral-500 select-none">
          {getLanguageInfo(langKey).label}
        </span>
      </div>
    </div>
  );

  const renderContent = useMemo(() => {
    if (!activeLanguage) {
      return null;
    }

    if (hasSnippetForActiveLanguage) {
      return processedChildren;
    }

    return noSnippetMessage;
  }, [activeLanguage, hasSnippetForActiveLanguage, processedChildren, noSnippetMessage]);

  // Render special case for plain commands (shell or text)
  if (isSinglePlainCommand) {
    const plainChild = codeData[0];
    if (plainChild) {
      const codeContent = plainChild.content;
      const language = plainChild.language;

      if (!language || !codeContent) {
        return null;
      }

      let processedContent = String(codeContent);
      if (requiresApiKeySubstitution) {
        processedContent = substituteApiKey(processedContent, selectedApiKey);
      }

      return (
        <PlainCodeView
          content={processedContent}
          className={className}
          language={language}
          icon={language === 'shell' ? <CommandLineIcon aria-hidden /> : null}
        />
      );
    }
  }

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-1200 border border-neutral-300 dark:border-neutral-1000 min-h-[3.375rem]',
        className,
      )}
    >
      {headerRow && (
        <div className="h-[2.375rem] bg-neutral-200 dark:bg-neutral-1100 border-b border-neutral-300 dark:border-neutral-1000 flex items-center py-1 px-3 rounded-t-lg">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="flex-1 text-center ui-text-p3 font-semibold text-neutral-1300 dark:text-neutral-000">
            {title}
          </div>

          <div className="w-12"></div>
        </div>
      )}

      {showSDKSelector && (
        <div
          className={cn(
            'p-2 border-b border-neutral-300 dark:border-neutral-1000',
            sdkTypes.size === 1 && 'p-1',
            headerRow ? '' : 'rounded-t-lg',
          )}
        >
          <div className="flex gap-1 justify-start">
            {['realtime', 'rest'].map(
              (type) =>
                sdkTypes.has(type as SDKType) && (
                  <SegmentedControl
                    key={type}
                    onClick={() => handleSDKTypeChange(type as SDKType)}
                    size="xs"
                    active={resolvedSdk === type}
                    className={cn(
                      'text-[11px] font-semibold px-2 py-1 h-auto',
                      sdkTypes.size === 1 &&
                        'pointer-events-none bg-neutral-100 dark:bg-neutral-1200 !text-neutral-800 !dark:text-neutral-500',
                      sdkTypes.size > 1 &&
                        resolvedSdk !== type &&
                        'bg-neutral-100 dark:bg-neutral-1200 hover:bg-neutral-200 dark:hover:bg-neutral-1100 active:bg-neutral-400 dark:active:bg-neutral-900',
                      sdkTypes.size > 1 && resolvedSdk === type && 'bg-neutral-000 dark:bg-neutral-1100',
                    )}
                  >
                    {type === 'realtime' ? 'Realtime' : 'REST'}
                  </SegmentedControl>
                ),
            )}
          </div>
        </div>
      )}

      {showFixedLanguageLabel && renderLanguageLabel(activeLanguage)}

      {showLanguageSelector &&
        (showFullSelector ? (
          <LanguageSelector
            languages={filteredLanguages}
            activeLanguage={activeLanguage}
            onLanguageChange={handleLanguageChange}
          />
        ) : (
          renderLanguageLabel(filteredLanguages[0], () => handleLanguageChange(filteredLanguages[0]))
        ))}
      <div
        ref={codeRef}
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
      >
        {renderContent}
        {isHovering && activeLanguage && hasSnippetForActiveLanguage && (
          <CopyButton
            onCopy={() => {
              const text = codeData.find((code) => code.language === activeLanguage)?.content;
              if (text) {
                navigator.clipboard.writeText(substituteApiKey(text, selectedApiKey, false));
              }
            }}
          />
        )}
      </div>
      {requiresApiKeySubstitution && (
        <ApiKeySelector apiKeys={apiKeys} selectedApiKey={selectedApiKey} onApiKeyChange={setSelectedApiKey} />
      )}
    </div>
  );
};

export default CodeSnippet;
