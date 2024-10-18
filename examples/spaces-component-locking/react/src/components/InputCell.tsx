import React, { useCallback, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { LockedFieldSvg } from "./LockedField";
import type { SpaceMember } from "@ably/spaces";
import '../../styles/styles.css';

type InputCellProps = {
  value: string;
  label: string;
  name: string;
  onFocus: () => void;
  onChange: (nextValue: string) => void;
  onClickOutside: () => void;
  lockHolder: Member | null;
  lockedByYou: boolean;
};

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; memberName: string };
};

type CSSPropertiesWithVars = React.CSSProperties & {
  "--member-bg-color": string;
};

export function InputCell({
  value,
  label,
  name,
  onFocus,
  onClickOutside,
  onChange,
  lockHolder,
  lockedByYou,
}: InputCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const memberColor = lockHolder?.profileData.memberColor;
  const memberName = lockedByYou ? "You" : lockHolder?.profileData.memberName;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  useOnClickOutside(ref, onClickOutside);

  const readOnly = Boolean(lockHolder && !lockedByYou);

  return (
    <div ref={ref} className="input-cell-container">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div
        className="input-container"
        style={{ "--member-bg-color": memberColor } as CSSPropertiesWithVars}
      >
        {memberName ? (
          <div className="lock">
            {memberName}
            {!lockedByYou && <LockedFieldSvg className="text-base" />}
          </div>
        ) : null}
        <input
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          disabled={readOnly}
          placeholder="Click to lock and edit me"
          className={`input ${
            !lockHolder ? 'regular-cell' : 'active-cell'
          } ${!readOnly ? 'full-access' : 'read-only'}`}
        />
      </div>
    </div>
  );
}
