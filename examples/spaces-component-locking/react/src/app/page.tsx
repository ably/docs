"use client";

import { useMemo, useEffect } from "react";
import { useSpace } from "@ably/spaces/react";
import type { SpaceMember } from "@ably/spaces";
import { AblyPoweredInput } from "@/components/AblyPoweredInput";
import { ChannelProvider } from "ably/react";
import { faker } from '@faker-js/faker';
import '../../styles/styles.css';

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; memberName: string };
};

const entries = [
  { label: "Entry 1", name: "entry1" },
  { label: "Entry 2", name: "entry2" },
  { label: "Entry 3", name: "entry3" },
];

export default function Home() {
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      memberName: faker.person.fullName(),
      memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
    });
  }, [space]);

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
