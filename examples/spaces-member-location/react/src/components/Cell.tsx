import React from "react";
import { type SpaceMember } from "@ably/spaces";

interface CellProps {
  value: string | number;
  rowIndex: number;
  colIndex: number;
  cellMembers: Member[];
  self: Member | null;
  handleClick: (row: number, col: number) => void;
}

type Member = Omit<SpaceMember, "profileData" | "location"> & {
  profileData: {
    memberName: string;
    memberColor: string;
  };
  location: {
    row?: number;
    col?: number;
  };
};

const getMemberProperty = (
  cellMembers: Member[],
  property: "memberColor" | "memberName",
): string | null => {
  if (cellMembers.length > 0 && property in cellMembers[0].profileData) {
    return cellMembers[0].profileData[property];
  }
  return null;
};

function Cell({
  value,
  rowIndex,
  colIndex,
  cellMembers,
  self,
  handleClick,
}: CellProps) {
  const selfInCell = self?.location?.row === rowIndex && self?.location?.col === colIndex;
  const labelColor = selfInCell ? self.profileData.memberColor : getMemberProperty(cellMembers, "memberColor");
  const memberName = selfInCell ? "You" : getMemberProperty(cellMembers, "memberName");
  const additionalCellMembers = cellMembers.length + (selfInCell ? 0 : -1);
  const cellLabel = additionalCellMembers > 0 ? `${memberName} + ${additionalCellMembers}` : memberName;

  return (
    <td
      key={`${rowIndex}-${colIndex}`}
      style={{
        "--info-bg-color": labelColor,
        "--member-color": self?.profileData.memberColor,
        "--cell-member-color": cellMembers[0]?.profileData.memberColor,
      } as React.CSSProperties}
      className={`uk-table-middle border border-gray-300 p-2 cursor-pointer transition-colors relative
        ${selfInCell ? 'bg-white' : 'bg-gray-50'}
        ${cellMembers.length > 0 && !selfInCell ? 'uk-box-shadow-small' : ''}
        hover:bg-gray-100`}
      onClick={() => handleClick(rowIndex, colIndex)}
      data-name-content={memberName ? cellLabel : ""}
    >
      {value}
      {(memberName || cellMembers.length > 0) && (
        <div
          className="absolute top-0 right-0 px-2 py-1 text-white text-sm rounded-bl"
          style={{ backgroundColor: labelColor || 'gray' }}
        >
          {cellLabel}
        </div>
      )}
    </td>
  );
}

export default Cell;
