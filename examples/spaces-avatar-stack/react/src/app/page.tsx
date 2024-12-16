"use client";

import { useEffect } from "react";
import { useMembers, useSpace } from "@ably/spaces/react";
import { type SpaceMember } from "@ably/spaces";
import { Avatar } from "../components/Avatar";
import { faker } from '@faker-js/faker';
import "../../styles/styles.css";

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; name: string };
};

export default function Home() {
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
     });

    return () => {
      space?.leave();
    };
  }, [space]);

  /** 💡 Get everybody in the space including the local member 💡 */
  const { others, self } = useMembers();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="avatar-stack-container">
      <div className="avatars">
        {/** 💡 Add your avatar to the stack.💡 */}
        {self && (
          <div className="self-avatar" key={self.clientId}>
            <Avatar user={self as Member} isSelf={true} />
          </div>
        )}

        {/** 💡 Stack of first 4 user avatars excluding yourself.💡 */}
        {others.slice(0, 4).map(( other ) => {
          return (
            <div className="other-avatar" key={other.clientId}>
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
            <p className="text-white name-others">+{others.length-4}</p>
          </div>
        }
      </div>
    </div>
  );
}
