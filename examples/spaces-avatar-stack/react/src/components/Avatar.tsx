import { FunctionComponent, useState } from "react";
import { type SpaceMember } from "@ably/spaces";
import "../../public/styles/avatars.css";

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
    <div className="wrapper">
      <div
        style={{
          backgroundColor: user.profileData.memberColor,
        }}
        className="userInfoContainer"
        id="avatar"
      >
        <p
          style={{ color: "#fff" }}
          className="smallText"
        >
          {initials}
        </p>
      </div>

      <div id="user-list" className="userList">
        <p className="name">{name}</p>
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
    <div className="avatarContainer">
      <div
        key={user.clientId}
        className="avatar"
        style={{
          backgroundColor: user.profileData.memberColor
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        id="avatar"
      >
        <p className={"textWhite nameOthers"}>{userInitials}</p>
      </div>
      {hover && self ? (
          <div className="popup">
            <UserInfo user={user} isSelf={isSelf} />
          </div>
        ) : null}
    </div>
  );
}
