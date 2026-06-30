import * as Ably from 'ably';
import { PollOption, Direction, ControllerKind, SLOTS_BY_KIND } from './types';
import { CountDisplay, formatCount } from './format';

interface SlotStyle {
  glyph: string;
  color: string;
}

const SLOT_STYLES: Record<Direction, SlotStyle> = {
  up:    { glyph: '▲', color: '#ff5416' },
  right: { glyph: '▶', color: '#ff5416' },
  down:  { glyph: '▼', color: '#ff5416' },
  left:  { glyph: '◀', color: '#ff5416' },
};

export function slotGlyph(slot: Direction): string {
  return SLOT_STYLES[slot].glyph;
}

export interface ControllerRenderOpts {
  clickable?: boolean;
  onClick?: (optionId: string) => void;
  /** Mark this option as "your vote". With invertSelected this swaps the
   *  slot to black-on-white; without it, fills the slot with its colour. */
  selectedId?: string | null;
  /** Fill each button proportionally to its share of the leader. */
  showHeatmap?: boolean;
  /** Place a star badge on the option(s) with the most votes. */
  showLeaderBadge?: boolean;
  /** Render every populated slot in full colour by default. */
  defaultFilled?: boolean;
  /** Selected slot inverts to black-bg / white-text instead of taking its
   *  slot colour. Pairs naturally with defaultFilled. */
  invertSelected?: boolean;
  /** How to render the per-slot tally. Defaults to the raw count. */
  display?: CountDisplay;
}

// Renders the d-pad: four positional buttons fed from the same annotation
// summary as the bar chart. On the presenter this drives the heatmap (fill
// proportional to each slot's share) and the leader star badge.
export function renderController(
  kind: ControllerKind,
  container: HTMLElement,
  options: PollOption[],
  summary: Ably.SummaryUniqueValues | null,
  opts: ControllerRenderOpts = {},
): void {
  const slots = SLOTS_BY_KIND[kind];

  const optionBySlot = new Map<Direction, PollOption>();
  for (const o of options) {
    if (o.direction) optionBySlot.set(o.direction, o);
  }

  const counts = new Map<Direction, number>();
  let max = 0;
  let total = 0;
  for (const slot of slots) {
    const opt = optionBySlot.get(slot);
    const c = opt && summary ? (summary[opt.id]?.total ?? 0) : 0;
    counts.set(slot, c);
    if (c > max) max = c;
    total += c;
  }

  container.classList.add('controller', `controller-${kind}`);

  let buttons = container.querySelectorAll<HTMLElement>('.controller-button');
  const existingSlots = Array.from(buttons).map((b) => b.dataset.slot);
  const slotsMatch = existingSlots.length === slots.length && existingSlots.every((s, i) => s === slots[i]);
  if (!slotsMatch) {
    container.innerHTML = '';
    for (const slot of slots) {
      const el = document.createElement(opts.clickable ? 'button' : 'div');
      el.className = `controller-button slot-${slot}`;
      el.dataset.slot = slot;
      el.innerHTML = `
        <span class="controller-badge" aria-label="your vote">★</span>
        <span class="controller-glyph">${SLOT_STYLES[slot].glyph}</span>
        <span class="controller-label"></span>
        <span class="controller-count"></span>
      `;
      container.appendChild(el);
    }
    buttons = container.querySelectorAll<HTMLElement>('.controller-button');
  }

  for (const button of buttons) {
    const slot = button.dataset.slot as Direction;
    const opt = optionBySlot.get(slot);
    const count = counts.get(slot) ?? 0;
    const labelEl = button.querySelector<HTMLElement>('.controller-label')!;
    const countEl = button.querySelector<HTMLElement>('.controller-count')!;

    if (opt) {
      labelEl.textContent = opt.label;
      countEl.textContent = formatCount(count, total, opts.display ?? 'count');
      button.dataset.optionId = opt.id;
      button.classList.remove('slot-empty');
      button.style.setProperty('--slot-fill', SLOT_STYLES[slot].color);

      const isSelected = opts.selectedId === opt.id;
      const isInverted = !!opts.invertSelected && isSelected;
      button.classList.toggle('slot-inverted', isInverted);

      let intensity = 0;
      if (opts.showHeatmap) {
        // Quadratic so the leader pops harder against trailing options.
        const ratio = max > 0 ? count / max : 0;
        intensity = ratio * ratio;
      } else if (isInverted) {
        intensity = 0;  // .slot-inverted CSS handles the visual itself.
      } else if (isSelected || opts.defaultFilled) {
        intensity = 1;
      }
      button.style.setProperty('--slot-fill-intensity', String(intensity));

      const isLeader = opts.showLeaderBadge && max > 0 && count === max;
      button.classList.toggle('marked-leader', isLeader);
      if (opts.clickable && opts.onClick) {
        const handler = () => opts.onClick!(opt.id);
        const existing = (button as any)._controllerHandler;
        if (existing) button.removeEventListener('click', existing);
        (button as any)._controllerHandler = handler;
        button.addEventListener('click', handler);
        (button as HTMLButtonElement).disabled = false;
      }
    } else {
      labelEl.textContent = '';
      countEl.textContent = '';
      delete button.dataset.optionId;
      button.classList.add('slot-empty');
      button.classList.remove('marked-leader', 'slot-inverted');
      button.style.setProperty('--slot-fill-intensity', '0');
      if (opts.clickable) (button as HTMLButtonElement).disabled = true;
    }
  }
}
