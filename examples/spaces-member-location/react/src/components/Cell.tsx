import React from "react";
import { type SpaceMember } from "@ably/spaces";
import '../../styles/styles.css'

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
  const selfInCell =
    self?.location?.row === rowIndex && self?.location?.col === colIndex;

  const labelColor = selfInCell
    ? self.profileData.memberColor
    : getMemberProperty(cellMembers, "memberColor");
  const memberName = selfInCell
    ? "You"
    : getMemberProperty(cellMembers, "memberName");
  const additionalCellMembers = cellMembers.length + (selfInCell ? 0 : -1);
  const cellLabel =
    additionalCellMembers > 0
      ? `${memberName} + ${additionalCellMembers}`
      : memberName;

  const handleCellClick = () => handleClick(rowIndex, colIndex);

  return (
    <td
      key={`${rowIndex}-${colIndex}`}
      style={
        {
          "--info-bg-color": labelColor,
          "--member-color": self?.profileData.memberColor,
          "--cell-member-color": cellMembers[0]?.profileData.memberColor,
          backgroundColor: selfInCell ? "white" : "#EDF1F6",
        } as React.CSSProperties
      }
      className={`cell ${
        cellMembers.length > 0 && !selfInCell ? 'cell-members' : ''
      } ${
        !selfInCell && cellMembers.length === 0 ? 'rest' : ''
      } ${
        selfInCell ? 'cell-self' : ''
      }`}
      onClick={handleCellClick}
      data-name-content={memberName ? cellLabel : ""}
    >
      {value}
    </td>
  );
}

export default Cell;
