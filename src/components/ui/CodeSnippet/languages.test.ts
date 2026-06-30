import { stripSdkType, getLanguageInfo, SDK_PREFIXES, SDKType } from './languages';

describe('SDK_PREFIXES', () => {
  it('contains the expected SDK types', () => {
    expect(SDK_PREFIXES).toEqual(['realtime', 'rest', 'client', 'agent']);
  });

  it('derives SDKType correctly', () => {
    // Verify the type system works by assigning each prefix
    const types: SDKType[] = [...SDK_PREFIXES];
    expect(types).toHaveLength(4);
  });
});

describe('stripSdkType', () => {
  it('strips realtime_ prefix', () => {
    expect(stripSdkType('realtime_javascript')).toBe('javascript');
  });

  it('strips rest_ prefix', () => {
    expect(stripSdkType('rest_python')).toBe('python');
  });

  it('strips client_ prefix', () => {
    expect(stripSdkType('client_javascript')).toBe('javascript');
  });

  it('strips agent_ prefix', () => {
    expect(stripSdkType('agent_python')).toBe('python');
  });

  it('returns the language unchanged when no prefix', () => {
    expect(stripSdkType('javascript')).toBe('javascript');
  });

  it('handles languages with underscores after the prefix', () => {
    expect(stripSdkType('client_objective_c')).toBe('objective_c');
  });

  it('does not strip unknown prefixes', () => {
    expect(stripSdkType('unknown_javascript')).toBe('unknown_javascript');
  });

  it('handles empty string', () => {
    expect(stripSdkType('')).toBe('');
  });

  it('does not strip prefix without underscore', () => {
    expect(stripSdkType('realtimejavascript')).toBe('realtimejavascript');
  });
});

describe('getLanguageInfo', () => {
  it('returns info for known languages', () => {
    const info = getLanguageInfo('javascript');
    expect(info.label).toBe('JavaScript');
    expect(info.icon).toBe('icon-tech-javascript');
    expect(info.syntaxHighlighterKey).toBe('javascript');
  });

  it('returns info for prefixed languages by stripping prefix first', () => {
    const info = getLanguageInfo('realtime_javascript');
    expect(info.label).toBe('JavaScript');
    expect(info.icon).toBe('icon-tech-javascript');
  });

  it('returns info for client_ prefixed languages', () => {
    const info = getLanguageInfo('client_python');
    expect(info.label).toBe('Python');
    expect(info.icon).toBe('icon-tech-python');
  });

  it('returns info for agent_ prefixed languages', () => {
    const info = getLanguageInfo('agent_nodejs');
    expect(info.label).toBe('Node.js');
    expect(info.icon).toBe('icon-tech-nodejs');
  });

  it('handles case-insensitive lookup', () => {
    const info = getLanguageInfo('JavaScript');
    expect(info.label).toBe('JavaScript');
  });

  it('returns fallback for unknown languages', () => {
    const info = getLanguageInfo('brainfuck');
    expect(info.label).toBe('brainfuck');
    expect(info.icon).toBe('icon-tech-web');
    expect(info.syntaxHighlighterKey).toBe('brainfuck');
  });

  it('returns correct info for new language entries', () => {
    expect(getLanguageInfo('cpp').label).toBe('C++');
    expect(getLanguageInfo('dart').label).toBe('Dart');
    expect(getLanguageInfo('objc').label).toBe('Objective-C');
    expect(getLanguageInfo('android').label).toBe('Android');
    expect(getLanguageInfo('flutter').label).toBe('Flutter');
  });

  it('maps languages to correct syntax highlighter keys', () => {
    expect(getLanguageInfo('nodejs').syntaxHighlighterKey).toBe('javascript');
    expect(getLanguageInfo('react').syntaxHighlighterKey).toBe('javascript');
    expect(getLanguageInfo('flutter').syntaxHighlighterKey).toBe('dart');
    expect(getLanguageInfo('android').syntaxHighlighterKey).toBe('kotlin');
    expect(getLanguageInfo('laravel').syntaxHighlighterKey).toBe('php');
  });
});
