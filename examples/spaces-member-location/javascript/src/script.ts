import Spaces, { Space, type SpaceMember } from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import minifaker from 'minifaker';
import { config } from './config';
import 'minifaker/locales/en';

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
    key: config.ABLY_KEY,
  });

  const urlParams = new URLSearchParams(window.location.search);
  const spaceName = urlParams.get('name') || 'spaces-member-location';
  const spaces = new Spaces(client);
  space = await spaces.get(spaceName);

  /** 💡 Enter the space as soon as it's available 💡 */
  await space.enter({
    memberName: `${minifaker.firstName()} ${minifaker.lastName()}`,
    memberColor: minifaker.color(),
  });

  /** 💡 Subscribe to all locations updates 💡 */
  space.locations.subscribe('update', async () => {
    /** 💡 Update spreadsheet on each locations update 💡 */
    await refreshSpreadsheet();
  });

  /** 💡 Render initial spreadsheet page load 💡 */
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

  cellTd.className = `uk-table-middle border border-gray-300 p-2 cursor-pointer transition-colors relative
    ${selfInCell ? 'bg-white' : 'bg-gray-50'}
    ${cellMembers.length > 0 && !selfInCell ? 'uk-box-shadow-small' : ''}
    hover:bg-gray-100`;

  cellTd.addEventListener('click', () => handleClick(rowIndex, colIndex));
  cellTd.textContent = value;

  if (memberName || cellMembers.length > 0) {
    const nameLabel = document.createElement('div');
    nameLabel.className = 'absolute top-0 right-0 px-2 py-1 text-white text-sm rounded-bl';
    nameLabel.style.backgroundColor = labelColor || 'gray';
    nameLabel.textContent = cellLabel || '';
    cellTd.appendChild(nameLabel);
  }

  return cellTd;
}

async function buildSpreadsheet(otherMembers: Member[], self: Member) {
  const fragment = document.createDocumentFragment();
  cellData.forEach((row, rowIndex) => {
    const sheetRow = document.createElement('tr');
    sheetRow.className = 'uk-table-middle';

    const sheetTd = document.createElement('td');
    sheetTd.className = 'uk-text-bold uk-text-center uk-background-muted border border-gray-300 p-2';
    sheetTd.textContent = (rowIndex + 1).toString();
    sheetRow.appendChild(sheetTd);

    row.forEach((col, colIndex) => {
      const cellMembers = otherMembers.filter(
        (user) => user.location?.row === rowIndex && user.location?.col === colIndex,
      );

      const cellTd = buildCell(col, rowIndex, colIndex, cellMembers, self);
      sheetRow.appendChild(cellTd);
    });

    fragment.appendChild(sheetRow);
  });

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
