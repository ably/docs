import { LiveMap } from 'ably';

export type Tasks = LiveMap<{ [key: string]: string }>;

declare global {
  export interface AblyObjectsTypes {
    root: {
      tasks: Tasks;
    };
  }
}
