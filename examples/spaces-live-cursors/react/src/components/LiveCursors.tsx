import React, { useState } from "react";
import type { SpaceMember, CursorUpdate } from "@ably/spaces";
import { useCursors } from "@ably/spaces/react";
import CursorSvg from "./CursorSvg";
import useTrackCursor from "../hooks/useTrackCursor";

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { userColors: { cursorColor: string; }; name: string };
};

// 💡 This component is used to update the location of the user's cursor
const YourCursor = ({
  self,
  parentRef,
}: {
  self: Member | null;
  parentRef: React.RefObject<HTMLDivElement>;
}) => {
  const [cursorPosition, setCursorPosition] = useState<{
    left: number;
    top: number;
    state: string;
  } | null>(null);

  useTrackCursor(setCursorPosition, parentRef);

  return null;
};

// 💡 This component is used to render the cursors of other users in the space
const MemberCursors = () => {
  const { cursors } = useCursors({ returnCursors: true });

  return (
    <>
      {Object.values(cursors).map((data) => {
        const cursorUpdate = data.cursorUpdate as CursorUpdate;
        const member = data.member as Member;
        if (cursorUpdate.data?.state === "leave") return;
        const { cursorColor } = member.profileData.userColors;

        return (
          <div
            key={member.connectionId}
            id={`member-cursor-${member.connectionId}`}
            className="uk-position-absolute uk-animation-fade pointer-events-none"
            style={{
              left: `${cursorUpdate.position.x}px`,
              top: `${cursorUpdate.position.y}px`,
            }}
          >
            <CursorSvg cursorColor={cursorColor} />
            <div
              style={{ backgroundColor: cursorColor }}
              className="uk-badge uk-position-relative text-white transform translate-x-4 -translate-y-1 px-3 py-2"
            >
              {member.profileData.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export { MemberCursors, YourCursor };
