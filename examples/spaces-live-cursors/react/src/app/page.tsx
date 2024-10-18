"use client";

import { YourCursor, MemberCursors } from "../components/LiveCursors";
import { useMemo, useRef, useEffect } from "react";
import { useMembers, useSpace } from "@ably/spaces/react";
import type { SpaceMember } from "@ably/spaces";
import '../../public/styles.css'

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { userColors: { cursorColor: string; }; name: string };
};

export const mockNames = [
  "Dane Mills",
  "Sam Mason",
  "Najla Karam",
];

export const colors = [
  { cursorColor: "#460894" },
  { cursorColor: "#0284CD" },
  { cursorColor: "#2CC0FF" },
];

/** 💡 Select a mock name to assign randomly to a new user that enters the space💡 */
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

export default function Home() {
  const name = useMemo(mockName, []);
  /** 💡 Select a color to assign randomly to a new user that enters the space💡 */
  const userColors = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [],
  );

  /** 💡 Get a handle on a space instance 💡 */
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
      className='liveCursorsContainer'
    >
      <p style={{ maxWidth: "80%", textAlign: "center" }}>Move your cursor over the screen to see live cursors in action</p>
      <YourCursor self={self as Member | null} parentRef={liveCursors} />
      <MemberCursors />
    </div>
  );
}
