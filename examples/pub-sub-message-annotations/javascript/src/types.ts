import type { Message } from 'ably';

export type MessageSummary = Message & Required<Pick<Message, 'serial' | 'summary'>>;

export type MessageCreate = Message & Required<Pick<Message, 'id' | 'serial' | 'data'>>;

export type AnnotationType = {
  key: string;
  color: string;
  label: string;
};
