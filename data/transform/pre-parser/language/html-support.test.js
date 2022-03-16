import { addLanguageSupportForHeadings, addLanguageSupportForBlockQuotes } from ".";

const headingWithLanguage = `h3(#channel-state).
default: ChannelState
objc,swift: ARTRealtimeChannelState
ruby:    Channel::STATE Enum
java:    io.ably.lib.realtime.ChannelState Enum
csharp:    IO.Ably.Realtime.ChannelState Enum
flutter: ably.ChannelState Enum
`;

const blockquoteWithLanguage = `bq(definition).
default:  "Channel":#properties get(String channelName, "ChannelOptions":#channel-options channelOptions)
csharp:   "Channel":#properties Get(String channelName, "ChannelOptions":#channel-options channelOptions)
objc,swift: "ARTRealtimeChannel":#properties get(String channelName, "ARTChannelOptions":#channel-options channelOptions);
`;

describe('Language support for headings replaces headings of the format:' +
    'h1(#id).\ndefault: heading with a string with language-specific spans', () => {
    it('Simple strings are translated into the correct <span > format', () => {
        const result = addLanguageSupportForHeadings(headingWithLanguage);
        expect(result).toEqual(`h3(#channel-state). <span lang='default'>ChannelState</span><span lang='objc,swift'>ARTRealtimeChannelState</span><span lang='ruby'>Channel::STATE Enum</span><span lang='java'>io.ably.lib.realtime.ChannelState Enum</span><span lang='csharp'>IO.Ably.Realtime.ChannelState Enum</span><span lang='flutter'>ably.ChannelState Enum</span>\n`);
    });
});

describe('Language support for blockquotes replaces blockquotes of the format:' +
    'bq(definition#id).\ndefault: heading with a string with language-specific spans', () => {
    it('Simple strings are translated into the correct <span > format', () => {
        const result = addLanguageSupportForBlockQuotes(blockquoteWithLanguage);
        expect(result).toEqual(`bq(definition). <span lang='default'>\"Channel\":#properties get(String channelName, \"ChannelOptions\":#channel-options channelOptions)</span><span lang='csharp'>\"Channel\":#properties Get(String channelName, \"ChannelOptions\":#channel-options channelOptions)</span><span lang='objc,swift'>\"ARTRealtimeChannel\":#properties get(String channelName, \"ARTChannelOptions\":#channel-options channelOptions);</span>\n\n`);
    });
});