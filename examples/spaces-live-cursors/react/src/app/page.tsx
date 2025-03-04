"use client";

import { YourCursor, MemberCursors } from "../components/LiveCursors";
import { useMemo, useRef, useEffect } from "react";
import { useMembers, useSpace } from "@ably/spaces/react";
import type { SpaceMember } from "@ably/spaces";

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { userColors: { cursorColor: string; }; name: string };
};

export const mockNames = [
  "Dane Mills",
  "Sam Mason",
  "Najla Karam",
];

export const colors = [
  { cursorColor: "#6366f1" },
  { cursorColor: "#8b5cf6" },
  { cursorColor: "#ec4899" },
];


const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

export default function Home() {
  const name = useMemo(mockName, []);
  const userColors = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [],
  );

  const { space } = useSpace();

  useEffect(() => {
    space?.enter({ name, userColors });
  }, [space, name, userColors]);

  const { self } = useMembers();
  const liveCursors = useRef(null);

  return (
    <div
      id="live-cursors"
      ref={liveCursors}
      className="uk-container min-h-screen flex items-center justify-center bg-gray-50 relative"
    >
      <p className="uk-text-lead text-center text-gray-700 absolute top-8 left-1/2 transform -translate-x-1/2">
        Move your cursor over the screen to see live cursors in action
      </p>
      <YourCursor self={self as Member | null} parentRef={liveCursors} />
      <MemberCursors />
    </div>
  );
}
