import { FunctionComponent, useState } from "react";
import { type SpaceMember } from "@ably/spaces";
import "../../styles/styles.css";

type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; name: string };
};

const UserInfo: FunctionComponent<{ user: Member; isSelf?: boolean }> = ({
  user,
  isSelf,
}) => {
  const initials = user.profileData.name
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("");

  const name = isSelf
    ? `${user.profileData.name} (You)`
    : user.profileData.name;

  return (
  <div className="absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[200px]">
    <div className="uk-card uk-card-default uk-card-body p-2 rounded shadow-lg bg-white">
      <div className="flex items-center space-x-2">
        <div
          style={{
            backgroundColor: user.profileData.memberColor,
          }}
          className="rounded-full w-[40px] h-[40px] flex items-center justify-center"
        >
          <p className="text-white text-sm font-medium">
            {initials}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium">{name}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export function Avatar({ user, isSelf }: { user: Member, isSelf: boolean }) {
  const [hover, setHover] = useState(false);

  const userInitials = user.profileData.name
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("");

  return (
    <div className="relative group">
      <div
        key={user.clientId}
        className="rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: user.profileData.memberColor
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p className="text-white text-sm font-medium">{userInitials}</p>
      </div>

      {/* Single popup container */}
      <div className="absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[200px]">
        <div className="uk-card uk-card-default uk-card-body p-2 rounded shadow-lg bg-white">
          <div className="flex items-center space-x-2">
            <div
              style={{
                backgroundColor: user.profileData.memberColor,
              }}
              className="rounded-full w-[40px] h-[40px] flex items-center justify-center"
            >
              <p className="text-white text-sm font-medium">{userInitials}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user.profileData.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
