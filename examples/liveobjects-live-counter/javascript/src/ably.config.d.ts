import { LiveCounter } from 'ably';
import { Color } from './script';

declare global {
  export interface ObjectsTypes {
    root: {
      [Color.red]: LiveCounter;
      [Color.green]: LiveCounter;
      [Color.blue]: LiveCounter;
    };
  }
}
