import type { PropsWithChildren } from 'react';

type Variant = 'note' | 'important' | 'further-reading' | 'warning' | 'usp' | 'neutral';

type AsideProps = PropsWithChildren<{
  'data-type'?: Variant;
  className?: string;
}>;

const config: Record<Variant, { border: string; bg: string; title: string }> = {
  neutral: { border: 'border-l-neutral-500', bg: 'bg-neutral-100', title: 'Category' },
  note: { border: 'border-l-blue-500', bg: 'bg-blue-100', title: 'Note' },
  'further-reading': { border: 'border-l-green-500', bg: 'bg-green-100', title: 'Further reading' },
  important: { border: 'border-l-yellow-500', bg: 'bg-yellow-100', title: 'Important' },
  warning: { border: 'border-l-yellow-500', bg: 'bg-yellow-100', title: 'Warning' },
  usp: { border: 'border-l-orange-600', bg: '', title: '' },
};

// PoC stub — the real Admonition lives at src/components/Layout/mdx/Admonition.tsx
// in the Gatsby tree. Reusing it directly is a Phase 3 task (requires a Vite
// alias into the parent src/ and a stubbed UserContext for the Code path).
const Aside = ({ 'data-type': dataType = 'note', className = '', children }: AsideProps) => {
  const { border, bg, title } = config[dataType] ?? config.note;
  return (
    <aside
      data-type={dataType}
      className={`border-l-4 ${border} ${bg} px-6 py-4 my-4 rounded-r-lg text-neutral-1000 ${className}`.trim()}
    >
      {title && <strong className="font-bold mr-2">{title}:</strong>}
      <div className="inline [&>p:first-child]:inline [&>p:last-child]:inline">{children}</div>
    </aside>
  );
};

export default Aside;
