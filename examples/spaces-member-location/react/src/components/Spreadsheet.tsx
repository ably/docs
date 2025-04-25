import { type SpaceMember } from "@ably/spaces";
import Cell from "./Cell";

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

const cellData = [
  ["Spring water", "Tacos"],
  ["Cola", "Noodles"],
  ["Ginger Beer", "Pizza"],
];

const Spreadsheet = ({
  self,
  others,
  setLocation,
}: {
  self: Member | null;
  others: Member[];
  setLocation: (location: Member["location"]) => void;
}) => {
  const handleClick = (row: number, col: number) => {
    setLocation({ row, col });
  };

  return (
    <table className="uk-table uk-table-bordered uk-table-divider uk-table-middle border-collapse border-2 border-gray-300 text-N1000">
      <tbody>
        {cellData.map((row: string[], rowIndex: number) => (
          <tr key={rowIndex} className="uk-table-middle">
            <td key={rowIndex} className="uk-text-bold uk-text-center uk-background-muted border border-gray-300 p-2">
              {rowIndex + 1}
            </td>
            {row.map((col, colIndex) => {
              const cellMembers = others.filter((user) =>
                user.location?.row === rowIndex && user.location?.col === colIndex
              );
              return (
                <Cell
                  key={colIndex}
                  value={col}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  cellMembers={cellMembers}
                  self={self}
                  handleClick={handleClick}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Spreadsheet;
