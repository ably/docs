import * as Ably from 'ably';

export type AnnotationType = {
  key: string;
  color: string;
  label: string;
};

export type MessageWithSerial = Ably.InboundMessage & { serial: string };

export function hasSerial(message: Ably.InboundMessage): message is MessageWithSerial {
  return typeof message.serial === 'string';
}
