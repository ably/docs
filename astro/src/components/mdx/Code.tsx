import type { PropsWithChildren } from 'react';
import { useStore } from '@nanostores/react';
import Icon from '@ably/ui/core/Icon';
import { $language } from '../../stores/language';

// Best-effort language → @ably/ui icon + label. Matches the map
// `@ably/ui/core/CodeSnippet/languages.ts` uses. Extend as pages surface
// new languages in the slice.
const LANG_META: Record<string, { label: string; icon: string }> = {
  javascript: { label: 'JavaScript', icon: 'icon-tech-javascript' },
  nodejs: { label: 'Node.js', icon: 'icon-tech-nodejs' },
  react: { label: 'React', icon: 'icon-tech-react' },
  python: { label: 'Python', icon: 'icon-tech-python' },
  ruby: { label: 'Ruby', icon: 'icon-tech-ruby' },
  java: { label: 'Java', icon: 'icon-tech-java' },
  go: { label: 'Go', icon: 'icon-tech-go' },
  php: { label: 'PHP', icon: 'icon-tech-php' },
  csharp: { label: 'C#', icon: 'icon-tech-csharp' },
  swift: { label: 'Swift', icon: 'icon-tech-swift' },
  kotlin: { label: 'Kotlin', icon: 'icon-tech-kotlin' },
  flutter: { label: 'Flutter', icon: 'icon-tech-flutter' },
  objc: { label: 'Objective-C', icon: 'icon-tech-objectivec' },
  html: { label: 'HTML', icon: 'icon-tech-web' },
  shell: { label: 'Shell', icon: 'icon-gui-command-line-outline' },
  bash: { label: 'Shell', icon: 'icon-gui-command-line-outline' },
  json: { label: 'JSON', icon: 'icon-tech-json' },
};

/**
 * Visual wrapper matching the @ably/ui CodeSnippet look: rounded border,
 * language row header with icon + label.
 *
 * Astro compiles fenced code blocks into an opaque <StaticHtml> wrapper
 * that CodeSnippet can't walk to detect the language, so we can't plug
 * the real component in directly. Instead we wrap Shiki's output and
 * label it from the active language nanostore.
 *
 * Extract-from-children-class remains a TODO — it would correctly label
 * utility snippets (HTML, shell) that don't match the active SDK language.
 * Doing that requires a remark/rehype plugin that surfaces the fenced-
 * block language as a prop on the outer <Code> before Astro's StaticHtml-
 * ification runs. Deferred.
 */
interface CodeProps {
  'data-lang'?: string;
}

const Code = ({ children, 'data-lang': fencedLang }: PropsWithChildren<CodeProps>) => {
  const active = useStore($language);
  // remarkCodeLang surfaces the fenced-block language as `data-lang`. Prefer it
  // when the snippet is a utility or a language that differs from the active
  // SDK — it matches the real Ably docs behaviour where "HTML" shows on an
  // html snippet even while the page's SDK language is JavaScript.
  const key = fencedLang ?? active;
  const meta = LANG_META[key] ?? LANG_META[active] ?? { label: 'Code', icon: 'icon-gui-code-doc' };

  return (
    <div className="rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-1200 border border-neutral-300 dark:border-neutral-1000 min-h-[3.375rem] mb-5 not-prose">
      <div className="border-b border-neutral-300 dark:border-neutral-1000 h-[2.125rem] inline-flex items-center px-3 w-full">
        <Icon name={meta.icon} size="16px" additionalCSS="mr-2" />
        <span className="ui-text-p3 font-semibold text-neutral-1300 dark:text-neutral-000">
          {meta.label}
        </span>
      </div>
      <div className="px-6 py-4 text-[0.875rem] leading-relaxed bg-neutral-000 dark:bg-neutral-1300 overflow-x-auto [&_pre]:bg-transparent [&_pre]:m-0 [&_code]:font-mono">
        {children}
      </div>
    </div>
  );
};

export default Code;
