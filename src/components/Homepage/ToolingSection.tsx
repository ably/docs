import type { ToolingSectionData, ToolingCardData } from 'src/data/content/types';
import { navigate } from '../Link';

const ToolingCard = ({ card }: { card: ToolingCardData }) => {
  return (
    <div
      className="p-4 bg-white dark:bg-neutral-1300 rounded-lg border border-neutral-300 dark:border-neutral-1000 flex flex-col cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-1200"
      onClick={() => {
        navigate(card.link);
      }}
    >
      <h4 className="ui-text-p1 font-bold text-neutral-1000 dark:text-neutral-300 mb-2">{card.title}</h4>
      <p className="text-neutral-800 dark:text-neutral-500 ui-text-p3">{card.description}</p>
    </div>
  );
};

export const ToolingSection = ({ section }: { section: ToolingSectionData }) => {
  if (!section) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {section.cards.map((card) => (
        <ToolingCard key={card.title} card={card} />
      ))}
    </div>
  );
};
