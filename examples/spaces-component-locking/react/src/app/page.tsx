"use client";

import { useMemo, useEffect } from "react";
import { useSpace } from "@ably/spaces/react";
import type { SpaceMember } from "@ably/spaces";
import { AblyPoweredInput } from "@/components/AblyPoweredInput";
import { ChannelProvider } from "ably/react";

import '../../public/styles/styles.css'

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; memberName: string };
};

const mockNames = [
  "Dane Mills",
  "Sam Mason",
  "Najla Karam",
];

const colors = [
  "#9951F5",
  "#2CC0FF",
  "#AC8600",
];

const entries = [
  { label: "Entry 1", name: "entry1" },
  { label: "Entry 2", name: "entry2" },
  { label: "Entry 3", name: "entry3" },
];

/** 💡 Select a mock name to assign randomly to a new user that enters the space💡 */
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

export default function Home() {
  const name = useMemo(mockName, []);
  /** 💡 Select a color to assign randomly to a new user that enters the space💡 */
  const locationColors = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [],
  );
  
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      memberName: name,
      memberColor: locationColors,
    });
  }, [locationColors, name, space]);

  return (
    <div
      id="component-locking"
      className="container"
    >
      <div className="inner">
        {entries.map((entry) => {
          return (
            <ChannelProvider 
              channelName={`component-locking-${entry.name}`} 
              key={entry.name}
              options={{ params: { rewind: '1' } }}
            >
              <AblyPoweredInput
                key={entry.name}
                label={entry.label}
                name={entry.name}
              />
            </ChannelProvider>
          );
        })}
      </div>
    </div>
  );
}
