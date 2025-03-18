import React, { useCallback, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { LockedFieldSvg } from "./LockedField";
import type { SpaceMember } from "@ably/spaces";

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
    <div ref={ref} className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className="relative rounded-md border border-gray-300 shadow-sm"
        style={{ backgroundColor: memberColor ? `${memberColor}10` : 'transparent' }}
      >
        {memberName && (
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <span className="text-sm font-medium" style={{ color: memberColor }}>
              {memberName}
            </span>
            {!lockedByYou && (
              <LockedFieldSvg className="w-4 h-4 text-gray-500" />
            )}
          </div>
        )}
        <input
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          disabled={readOnly}
          placeholder="Click to lock and edit me"
          className={`uk-input w-full p-3 rounded-md transition-colors duration-200 ${
            !lockHolder
              ? 'bg-white hover:bg-gray-50'
              : 'bg-opacity-10'
          } ${
            !readOnly
              ? 'cursor-text focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              : 'cursor-not-allowed bg-gray-50'
          }`}
        />
      </div>
    </div>
  );
}
