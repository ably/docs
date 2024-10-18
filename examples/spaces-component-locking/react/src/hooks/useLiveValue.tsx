import type { Message } from "ably"
import { useChannel } from "ably/react";
import { useCallback, useState } from "react";
import type { SpaceMember } from "@ably/spaces";

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; memberName: string };
};

export const useLiveValue = (componentName: string, self: Member | null) => {
  const [value, setValue] = useState("");

  /** 💡 Use rewind to get the last message from the channel. See https://ably.com/docs/channels/options/rewind 💡 */
  const channelName = `component-locking-${componentName}`;

  console.log(channelName);
  const { channel } = useChannel(channelName, (message: Message) => {
    if (message.connectionId === self?.connectionId) return;
    setValue(message.data);
  });

  const handleChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      channel.publish("update", nextValue);
    },
    [channel],
  );

  return [value, handleChange] as const;
};