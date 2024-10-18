"use client";

import { useMemo, useEffect } from "react";
import {  useMembers, useSpace } from "@ably/spaces/react";
import { type SpaceMember } from "@ably/spaces";
import { Avatar } from "../components/Avatar";
import "../../public/styles/avatars.css";

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; name: string };
};

const colors = ["#9951F5", "#f1c232", "#f44336"];
const mockNames = [
  "Anum Reeve",
  "Tiernan Stubbs",
  "Hakim Hernandez",
];


export default function Home() {
  const name = useMemo(() => {
    return mockNames[Math.floor(Math.random() * mockNames.length)];
  }, []);
  const memberColor = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({ name, memberColor });

    return () => {
      space?.leave();
    };
  }, [space]);

  /** 💡 Get everybody in the space including the local member 💡 */
  const { others, self } = useMembers();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="avatarStackContainer">
      <div className="avatars">
        {/** 💡 Add your avatar to the stack.💡 */}
        {self && (
          <div className="selfAvatar" key={self.clientId}>
            <Avatar user={self as Member} isSelf={true} />
          </div>
        )}

        {/** 💡 Stack of first 4 user avatars excluding yourself.💡 */}
        {others.slice(0, 4).map(( other ) => {
          return (
            <div className="otherAvatar" key={other.clientId}>
              <Avatar user={other as Member} isSelf={false} />
            </div>
          );
        })}

        {hasMoreUsers &&
          <div className="avatar"
            style={{
              backgroundColor: '#595959'
            }}
          >
            <p className="textWhite nameOthers">+{others.length-4}</p>
          </div>
        }
      </div>
    </div>
  );
}
