"use client";

import { useEffect } from "react";
import { useLocations, useMembers, useSpace } from "@ably/spaces/react";
import { type SpaceMember } from "@ably/spaces";
import Spreadsheet from "@/components/Spreadsheet";
import { faker } from '@faker-js/faker';

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

type UpdateLocationCallback = (location: Member["location"]) => void;

export default function Home() {
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();
  const { self, others } = useMembers();
  const { update } = useLocations();

  // /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      memberName: faker.person.fullName(),
      memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
    });
  }, [space]);

  return (
    <div
      id="member-location"
      className='container'
    >
      <Spreadsheet
        self={self as Member}
        others={others as Member[]}
        setLocation={update as UpdateLocationCallback}
      />
    </div>
  );
}
