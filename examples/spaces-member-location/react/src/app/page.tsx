"use client";

import { useEffect, useMemo } from "react";
import { useLocations, useMembers, useSpace } from "@ably/spaces/react";
import { type SpaceMember } from "@ably/spaces";
import Spreadsheet from "@/components/Spreadsheet";

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

const locationColors = ["#7A1BF2", "#D400AB", "#AC8600"];
const mockNames = ["Anum Reeve", "Raja Nizar", "Sofiya Hlushko"];

const getLocationColors = () =>
  locationColors[Math.floor(Math.random() * locationColors.length)];

const getMemberName = () =>
  mockNames[Math.floor(Math.random() * mockNames.length)];

export default function Home() {

  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();
  const { self, others } = useMembers();
  const { update } = useLocations();

  // /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      memberName: getMemberName(),
      memberColor: getLocationColors()
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
