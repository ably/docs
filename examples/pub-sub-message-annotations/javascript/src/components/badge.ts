// Components for displaying client IDs and counts from annotation summaries

export function createCountBadge(count: number, color: string, isRounded = true) {
  const badge = document.createElement('span');
  badge.className = `ml-2 inline-flex items-center px-2 py-0.5 text-xs font-medium bg-${color}-100 text-${color}-800`;
  badge.textContent = `${count}`;
  badge.classList.add(isRounded ? 'rounded-full' : 'rounded');
  return badge;
}

export function createBadge(name: string, color: string) {
  const badge = document.createElement('span');
  badge.className = `inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-${color}-100 text-${color}-800`;
  badge.textContent = name;
  return badge;
}

export function createBadgeWithCount(name: string, count: number, color: string) {
  const badgeGroup = document.createElement('div');
  badgeGroup.className = 'inline-flex rounded-full overflow-hidden text-xs font-medium shadow-sm';

  const clientIdPart = document.createElement('span');
  clientIdPart.className = `px-2 py-0.5 bg-${color}-100 text-${color}-800`;
  clientIdPart.textContent = name;

  const countPart = document.createElement('span');
  countPart.className = `px-1.5 py-0.5 bg-${color}-400 text-white`;
  countPart.textContent = `${count}`;

  badgeGroup.appendChild(clientIdPart);
  badgeGroup.appendChild(countPart);
  return badgeGroup;
}

export function createClientBadges(clients: string[], color: string) {
  const badges = document.createElement('div');
  badges.className = 'flex flex-wrap gap-1';
  for (const id of clients) {
    const badge = createBadge(id, color);
    badges.appendChild(badge);
  }
  return badges;
}

export function createClientBadgesWithCounts(clientIds: Record<string, number>, color: string) {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-2';

  for (const [clientId, count] of Object.entries(clientIds)) {
    const badge = createBadgeWithCount(clientId, count, color);
    container.appendChild(badge);
  }

  return container;
}
