import * as Ably from 'ably';
import { PollOption } from './types';
import { CountDisplay, formatCount } from './format';

const COLORS = ['#ff5416', '#1a1a1a', '#6b6b6b', '#ffa07a', '#c9c5bd', '#ff7b47'];

// Renders a horizontal bar per option from an annotation summary. The summary
// is Ably's server-side rollup of every `vote:unique.v1` annotation on the
// poll message — `summary[optionId].total` is the live vote count for that
// option, computed for us, not by tallying events on the client.
export function renderChart(
  container: HTMLElement,
  options: PollOption[],
  summary: Ably.SummaryUniqueValues | null,
  display: CountDisplay = 'count',
): void {
  const totalVotes = options.reduce(
    (sum, opt) => sum + (summary?.[opt.id]?.total ?? 0),
    0,
  );

  // Reuse existing rows if structure matches, otherwise rebuild
  const existingRows = container.querySelectorAll('.chart-row');
  if (existingRows.length !== options.length) {
    container.innerHTML = '';
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const count = summary?.[opt.id]?.total ?? 0;
      const pct = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

      const row = document.createElement('div');
      row.className = 'chart-row';
      row.dataset.optionId = opt.id;
      row.innerHTML = `
        <span class="chart-label">${opt.label}</span>
        <div class="chart-bar-track">
          <div class="chart-bar-fill" style="width: ${pct}%; background: ${COLORS[i % COLORS.length]}"></div>
        </div>
        <span class="chart-count">${formatCount(count, totalVotes, display)}</span>
      `;
      container.appendChild(row);
    }
  } else {
    // Update in place for smooth transitions
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const row = existingRows[i] as HTMLElement;
      const count = summary?.[opt.id]?.total ?? 0;
      const pct = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

      row.dataset.optionId = opt.id;
      const labelEl = row.querySelector('.chart-label') as HTMLElement;
      labelEl.textContent = opt.label;
      const fill = row.querySelector('.chart-bar-fill') as HTMLElement;
      fill.style.width = `${pct}%`;
      const countEl = row.querySelector('.chart-count') as HTMLElement;
      countEl.textContent = formatCount(count, totalVotes, display);
    }
  }
}
