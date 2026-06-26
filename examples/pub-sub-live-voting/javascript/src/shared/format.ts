export type CountDisplay = 'count' | 'percent' | 'both';

export function formatCount(count: number, total: number, mode: CountDisplay): string {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  switch (mode) {
    case 'count':
      return String(count);
    case 'percent':
      return `${pct}%`;
    case 'both':
      return `${count} (${pct}%)`;
  }
}
