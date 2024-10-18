import Spaces, { Space, type SpaceMember } from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

type Member = Omit<SpaceMember, 'profileData' | 'location'> & {
  profileData: {
    memberName: string;
    memberColor: string;
  };
  location: {
    row?: number;
    col?: number;
  };
};

type Location = {
  row?: number;
  col?: number;
};

let space: Space;
const cellData = [
  ['Spring water', 'Tacos'],
  ['Cola', 'Noodles'],
  ['Ginger Beer', 'Pizza'],
];

async function updateLocation(location: Location): Promise<void> {
  if (!space) {
    console.error('Space is not initialized');
    return;
  }

  try {
    await space.locations.set({ row: location.row, col: location.col });
  } catch (err) {
    console.error('Error updating location:', err);
  }
}

function setLocation(location: Member['location']) {
  updateLocation(location);
}

async function connect() {
  const client = new Realtime({
    clientId: nanoid(),
    key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
  });

  const spaces = new Spaces(client);
  space = await spaces.get('member-location');

  // /** 💡 Enter the space as soon as it's available 💡 */
  await space.enter({
    memberName: faker.person.fullName(),
    memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
  });

  // /** 💡 Subscribe to all locations updates 💡 */
  space.locations.subscribe('update', async () => {
    // /** 💡 Update spreadsheet on each locations update 💡 */
    await refreshSpreadsheet();
  });

  // /** 💡 Render initial spreadsheet page load 💡 */
  await refreshSpreadsheet();
}
const getMemberProperty = (cellMembers: Member[], property: 'memberColor' | 'memberName'): string | null => {
  if (cellMembers.length > 0 && cellMembers[0]?.profileData && property in cellMembers[0].profileData) {
    return cellMembers[0].profileData[property];
  }
  return null;
};
function handleClick(row: number, col: number) {
  setLocation({ row, col });
}

function buildCell(value: string, rowIndex: number, colIndex: number, cellMembers: Member[], self: Member) {
  const selfInCell = self.location?.row === rowIndex && self.location?.col === colIndex;

  const labelColor = selfInCell ? self.profileData.memberColor : getMemberProperty(cellMembers, 'memberColor');
  const memberName = selfInCell ? 'You' : getMemberProperty(cellMembers, 'memberName');
  const additionalCellMembers = cellMembers.length + (selfInCell ? 0 : -1);
  const cellLabel = additionalCellMembers > 0 ? `${memberName} + ${additionalCellMembers}` : memberName;

  const cellTd = document.createElement('td');
  cellTd.setAttribute('key', `${rowIndex}-${colIndex}`);

  cellTd.style.setProperty('--info-bg-color', labelColor || '');
  cellTd.style.setProperty('--member-color', self?.profileData.memberColor || '');
  cellTd.style.setProperty('--cell-member-color', cellMembers[0]?.profileData.memberColor || '');
  cellTd.style.backgroundColor = selfInCell ? 'white' : '#EDF1F6';

  let className = 'cell';
  if (cellMembers.length > 0 && !selfInCell) className += ' cell-members';
  if (!selfInCell && cellMembers.length === 0) className += ' rest';
  if (selfInCell) className += ' cell-self';
  cellTd.className = className;

  cellTd.addEventListener('click', () => handleClick(rowIndex, colIndex));

  if (memberName) {
    cellTd.setAttribute('data-name-content', memberName ? cellLabel || '' : '');
  }

  cellTd.textContent = value;

  return cellTd;
}

async function buildSpreadsheet(otherMembers: Member[], self: Member) {
  const fragment = document.createDocumentFragment();

  for (const [rowIndex, row] of cellData.entries()) {
    const sheetRow = document.createElement('tr');
    sheetRow.setAttribute('key', rowIndex.toString());

    const sheetTd = document.createElement('td');
    sheetTd.className = 'td';
    sheetTd.setAttribute('key', rowIndex.toString());
    sheetTd.textContent = (rowIndex + 1).toString();
    sheetRow.appendChild(sheetTd);

    for (const [colIndex, col] of row.entries()) {
      const cellMembers = otherMembers.filter(
        (user) => user.location?.row === rowIndex && user.location?.col === colIndex,
      );

      const cellTd = buildCell(col, rowIndex, colIndex, cellMembers, self);
      sheetRow.appendChild(cellTd);
    }

    fragment.appendChild(sheetRow);
  }

  return fragment;
}

async function refreshSpreadsheet() {
  const self = await space.members.getSelf();
  const otherMembers = await space.members.getOthers();

  const spreadsheet = await buildSpreadsheet(otherMembers, self);
  const spreadsheetElement = document.getElementById('sheet-body');

  if (spreadsheetElement) {
    // Clear the existing content before appending the new spreadsheet
    spreadsheetElement.innerHTML = '';
    spreadsheetElement.appendChild(spreadsheet);
  }
}

connect();
