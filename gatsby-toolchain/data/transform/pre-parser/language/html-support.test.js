import { addLanguageSupportForHeadings } from ".";

const headingWithLanguage = `h3(#channel-state).
default: ChannelState
objc,swift: ARTRealtimeChannelState
ruby:    Channel::STATE Enum
java:    io.ably.lib.realtime.ChannelState Enum
csharp:    IO.Ably.Realtime.ChannelState Enum
flutter: ably.ChannelState Enum
`;

describe('Language support for headings replaces headings of the format:' +
    'h1(#id).\ndefault: headingString with language-specific spans', () => {
    test('Simple strings are translated into the correct <span > format', () => {
        const result = addLanguageSupportForHeadings(headingWithLanguage);
        expect(result).toEqual(`h3(#channel-state). <span lang='default'>ChannelState</span><span lang='objc,swift'>ARTRealtimeChannelState</span><span lang='ruby'>Channel::STATE Enum</span><span lang='java'>io.ably.lib.realtime.ChannelState Enum</span><span lang='csharp'>IO.Ably.Realtime.ChannelState Enum</span><span lang='flutter'>ably.ChannelState Enum</span>`);
    });
});