"use client";

import { useMemo, useEffect } from "react";
import { useSpace } from "@ably/spaces/react";
import type { SpaceMember } from "@ably/spaces";
import { AblyPoweredInput } from "@/components/AblyPoweredInput";
import { ChannelProvider } from "ably/react";
import { faker } from '@faker-js/faker';

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; memberName: string };
};

const entries = [
  { label: "Entry 1", name: "entry1" },
  { label: "Entry 2", name: "entry2" },
  { label: "Entry 3", name: "entry3" },
];

export default function Home() {
  const { space } = useSpace();

  useEffect(() => {
    space?.enter({
      memberName: faker.person.fullName(),
      memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
    });
  }, [space]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col space-y-4 w-full max-w-md">
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
