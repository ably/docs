import { addInfoToCodeBlock } from './add-info-to-codeblocks';

export const RANDOM_CHANNEL_NAME_DATA_ATTRIBUTE = 'random-channel';

export const addRandomChannelInfoToCodeBlock = addInfoToCodeBlock(
  'RANDOM_CHANNEL_NAME',
  RANDOM_CHANNEL_NAME_DATA_ATTRIBUTE,
);
