import platform from './platform-data';
import pubsub from './pubsub-data';
import chat from './chat-data';
import spaces from './spaces-data';
import liveSync from './livesync-data';
import assetTracking from './assettracking-data';
import { NavData } from '../types';

export default {
  platform,
  pubsub,
  chat,
  spaces,
  liveSync,
  assetTracking,
} satisfies NavData;
