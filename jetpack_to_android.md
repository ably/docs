# Implementation Plan: Migrate `jetpack` snippet annotation to `chat_android`

## Problem Statement

The current branch (`fix/jetpack-snippets-for-android`) renames `` ```jetpack `` code block annotations to `` ```android `` in chat MDX pages. However, this creates a **conflict** because `android` already exists as a language identifier with `syntaxHighlighterKey: "java"`, while the Jetpack Compose snippets need `syntaxHighlighterKey: "kotlin"`.

### The Conflict

| Identifier | Label | syntaxHighlighterKey | Used In |
|---|---|---|---|
| `android` (existing) | Android | `java` | `<If lang="android">` in API reference pages (push-admin, etc.) |
| `jetpack` (current) | Jetpack Compose | `kotlin` | Chat product code blocks + `<If lang="jetpack">` |
| `android` (proposed by branch) | ??? | ??? | Would need `kotlin` for chat, but existing `android` uses `java` |

Simply renaming `jetpack` → `android` in code blocks would cause the `android` entry in [`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:118) (ably-ui) to apply `java` syntax highlighting to Kotlin code.

## Recommended Approach: Use `chat_android` prefix

### Why `chat_android`?

The codebase already has a well-established pattern for product-scoped language prefixes:

- `realtime_javascript`, `realtime_python`, etc. — used in Pub/Sub pages to differentiate Realtime vs REST SDK variants
- `rest_javascript`, `rest_php`, etc. — same pattern for REST SDK

The prefix system works as follows:

1. **[`onCreatePage.ts`](data/onCreatePage.ts:39)** extracts language identifiers from `` ```language `` annotations via regex (`/```(\w+)/g`) and stores them in `pageContext.languages`
2. **[`layout-context.tsx`](src/contexts/layout-context.tsx:63)** calls `stripSdkType()` to remove the prefix when building the language selector (e.g., `realtime_javascript` → `javascript`)
3. **[`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:202)** detects `realtime_` and `rest_` prefixes to show the SDK type selector (Realtime/REST toggle)
4. **[`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:135)** `stripSdkType()` only strips `realtime_` and `rest_` prefixes currently
5. **[`getLanguageInfo()`](../ably-ui/src/core/CodeSnippet/languages.ts:143)** uses the stripped key to look up label, icon, and `syntaxHighlighterKey`

Using `chat_android` follows this same convention — it's a product-scoped variant of `android` that can have its own `syntaxHighlighterKey: "kotlin"`.

### Why NOT just rename `android` to have `kotlin` highlighting?

- `android` with `syntaxHighlighterKey: "java"` is used in **87 places** across API reference pages (`rest-sdk/push-admin.mdx`, `realtime-sdk/push.mdx`, `realtime-sdk/types.mdx`) via `<If lang="android">` conditionals
- These pages reference the Java-based Android Pub/Sub SDK, not the Kotlin Chat SDK
- The `android` language is also listed in [`pubsub.ts`](src/data/nav/pubsub.ts:401) navigation config for push-related pages
- Changing `android`'s `syntaxHighlighterKey` to `kotlin` would break Java syntax highlighting for all existing Pub/Sub Android content

## Implementation Steps

### Phase 1: Update `ably-ui` (CodeSnippet/languages.ts)

#### 1.1 Add `chat_android` to the languages map

In [`../ably-ui/src/core/CodeSnippet/languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:11):

```typescript
chat_android: {
  label: "Jetpack Compose",
  icon: "icon-tech-jetpack",
  syntaxHighlighterKey: "kotlin",
},
```

This entry will be used directly by `getLanguageInfo()` when it encounters `chat_android` as a language key.

#### 1.2 Update `stripSdkType()` to handle `chat_` prefix

In [`../ably-ui/src/core/CodeSnippet/languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:135):

```typescript
export const stripSdkType = (lang: string) => {
  if (lang.startsWith("realtime_") || lang.startsWith("rest_") || lang.startsWith("chat_")) {
    return lang.split("_").slice(1).join("_");
  }
  return lang;
};
```

**Important**: `stripSdkType("chat_android")` will return `"android"`, which is the base language key used for the language selector tab. This means:
- The language selector will show "Android" (from the `android` entry)
- But the code will be highlighted with Kotlin syntax (from the `chat_android` entry's `syntaxHighlighterKey`)

**Wait — there's a subtlety here.** The `getLanguageInfo()` function is called with the *full* language key (before stripping) in some places and the *stripped* key in others. Let's trace the flow:

- In [`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:300), `getLanguageInfo(cleanLang)` is called where `cleanLang` is the full language key (e.g., `chat_android`). Since `getLanguageInfo` calls `stripSdkType` internally, it would look up `android` → `syntaxHighlighterKey: "java"`. **This is wrong for our use case.**

So we need a different approach for `getLanguageInfo()`:

#### 1.2 (Revised) — Make `getLanguageInfo()` check the full key first

```typescript
export const getLanguageInfo = (langKey: string): LanguageInfo => {
  // Check full key first (e.g., "chat_android" has its own entry)
  if (languages[langKey.toLowerCase()]) {
    return languages[langKey.toLowerCase()];
  }

  // Then try stripping the SDK type prefix
  const key = stripSdkType(langKey).toLowerCase();
  if (languages[key]) {
    return languages[key];
  }

  // Fallback for unknown languages
  return {
    label: langKey,
    icon: "icon-tech-web",
    syntaxHighlighterKey: langKey,
  };
};
```

This way, `chat_android` will match its own entry with `syntaxHighlighterKey: "kotlin"`, while `realtime_javascript` will still fall through to `javascript` with `syntaxHighlighterKey: "javascript"`.

#### 1.3 Ensure `chat_` prefix doesn't trigger SDK type selector

In [`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:202), the SDK type detection only checks for `realtime_` and `rest_`:

```typescript
if (codeLanguage.startsWith("realtime_")) {
  sdkTypes.add("realtime");
} else if (codeLanguage.startsWith("rest_")) {
  sdkTypes.add("rest");
}
```

`chat_android` will **not** trigger the SDK selector, which is correct — Chat pages don't need a Realtime/REST toggle. **No change needed here.**

### Phase 2: Update `ably-docs` language configuration

#### 2.1 Update [`src/data/languages/types.ts`](src/data/languages/types.ts:1)

Add `chat_android` to the `languageKeys` array (and optionally remove `jetpack` if fully migrating):

```typescript
export const languageKeys = [
  // ... existing keys ...
  'chat_android',  // Add this
  // 'jetpack',    // Remove or keep for backward compat
] as const;
```

#### 2.2 Update [`src/data/languages/languageInfo.ts`](src/data/languages/languageInfo.ts:1)

Add `chat_android` entry:

```typescript
chat_android: {
  label: 'Jetpack Compose',
  syntaxHighlighterKey: 'kotlin',
},
```

#### 2.3 Update [`src/data/languages/languageData.ts`](src/data/languages/languageData.ts:38)

Change the chat product's language list:

```typescript
chat: {
  javascript: '1.1',
  react: '1.1',
  swift: '1.0',
  kotlin: '1.1',
  chat_android: '1.1',  // was: jetpack: '1.1'
},
```

**Note**: This is important because [`layout-context.tsx`](src/contexts/layout-context.tsx:43) uses `languageData[product]` to filter active languages. After `stripSdkType`, `chat_android` becomes `android`, so the language selector will show "Android" as a tab option.

**However**, there's a problem: `determineActiveLanguage()` in [`layout-context.tsx`](src/contexts/layout-context.tsx:43) does:

```typescript
const relevantLanguages = activeLanguages.filter(
  (lang) => Object.keys(languageData[product]).includes(lang)
);
```

Here `activeLanguages` are already stripped (e.g., `android`), but `languageData[product]` keys include `chat_android`. So `android` won't match `chat_android`. 

**Fix needed**: The `determineActiveLanguage` function needs to compare stripped versions:

```typescript
const relevantLanguages = activeLanguages.filter((lang) => 
  Object.keys(languageData[product]).map(k => stripSdkType(k)).includes(lang)
);
```

Or alternatively, keep the `languageData` key as `android` (not `chat_android`) since `languageData` is about product-level language availability, not code block annotations:

```typescript
chat: {
  javascript: '1.1',
  react: '1.1',
  swift: '1.0',
  kotlin: '1.1',
  android: '1.1',  // Use base key here
},
```

**This second approach is simpler and recommended** — `languageData` maps products to their available languages (for the language selector), while the `chat_` prefix is only needed in code block annotations for syntax highlighting resolution.

### Phase 3: Update MDX content files

#### 3.1 Rename code block annotations

In all chat MDX files, change:

```diff
- ```jetpack
+ ```chat_android
```

**Files to update** (13 files, already partially done in current branch but using `android` instead of `chat_android`):

- [`src/pages/docs/chat/connect.mdx`](src/pages/docs/chat/connect.mdx)
- [`src/pages/docs/chat/setup.mdx`](src/pages/docs/chat/setup.mdx)
- [`src/pages/docs/chat/getting-started/android.mdx`](src/pages/docs/chat/getting-started/android.mdx)
- [`src/pages/docs/chat/rooms/history.mdx`](src/pages/docs/chat/rooms/history.mdx)
- [`src/pages/docs/chat/rooms/index.mdx`](src/pages/docs/chat/rooms/index.mdx)
- [`src/pages/docs/chat/rooms/media.mdx`](src/pages/docs/chat/rooms/media.mdx)
- [`src/pages/docs/chat/rooms/message-reactions.mdx`](src/pages/docs/chat/rooms/message-reactions.mdx)
- [`src/pages/docs/chat/rooms/messages.mdx`](src/pages/docs/chat/rooms/messages.mdx)
- [`src/pages/docs/chat/rooms/occupancy.mdx`](src/pages/docs/chat/rooms/occupancy.mdx)
- [`src/pages/docs/chat/rooms/presence.mdx`](src/pages/docs/chat/rooms/presence.mdx)
- [`src/pages/docs/chat/rooms/reactions.mdx`](src/pages/docs/chat/rooms/reactions.mdx)
- [`src/pages/docs/chat/rooms/replies.mdx`](src/pages/docs/chat/rooms/replies.mdx)
- [`src/pages/docs/chat/rooms/typing.mdx`](src/pages/docs/chat/rooms/typing.mdx)

#### 3.2 Update `<If>` conditional tags

**Critical**: The current branch commit did NOT update `<If lang="jetpack">` tags. There are **52 occurrences** across chat MDX files that need updating.

Two patterns exist:

**Pattern A — Jetpack-only conditionals:**
```diff
- <If lang="jetpack">
+ <If lang="chat_android">
```

**Pattern B — Multi-language conditionals including jetpack:**
```diff
- <If lang="javascript,swift,kotlin,jetpack">
+ <If lang="javascript,swift,kotlin,chat_android">
```

**Important consideration for `<If>` component**: The [`If.tsx`](src/components/Layout/mdx/If.tsx:22) component compares `lang` prop values against `activePage.language`, which comes from `stripSdkType`-processed languages. So `activePage.language` will be `"android"` (stripped from `chat_android`), but the `<If>` tag says `chat_android`.

**This means `<If lang="chat_android">` won't match `activePage.language === "android"`!**

**Fix needed in `If.tsx`**: The `If` component needs to handle the prefix stripping, OR we keep using `<If lang="android">` in the MDX files (since the `If` component matches against the stripped language).

**Recommended approach**: Use `<If lang="android">` in MDX files (not `chat_android`), since the `If` component matches against the *stripped* active language. This is consistent with how `<If lang="javascript">` works for both `realtime_javascript` and `rest_javascript` code blocks.

So the `<If>` tag updates become:

```diff
- <If lang="jetpack">
+ <If lang="android">

- <If lang="javascript,swift,kotlin,jetpack">
+ <If lang="javascript,swift,kotlin,android">
```

**But wait** — this creates an overlap with the existing `<If lang="android">` usage in API reference pages (push-admin, etc.) where `android` refers to the Java-based Pub/Sub SDK. However, since those pages are in the `pubsub` product context and chat pages are in the `chat` product context, and the `If` component only shows content when the active language matches, there's no actual conflict — the `android` language won't appear in the language selector on pub/sub pages (it's not in `languageData.pubsub`), and `android` on chat pages will refer to the Kotlin/Jetpack Compose variant.

**Actually, `android` IS in `pubsub.ts` nav config** for push-related pages. But those pages use `<If lang="android">` to show Java-specific content, and the language selector on those pages would show "Android" with Java highlighting. On chat pages, the language selector would show "Android" (via `chat_android` stripped to `android`) with Kotlin highlighting. The `<If>` tags work correctly in both contexts because they're on different pages with different language sets.

### Phase 4: Update `stripSdkType` in `layout-context.tsx`

The [`layout-context.tsx`](src/contexts/layout-context.tsx:63) imports `stripSdkType` from ably-ui:

```typescript
languages = Array.from(new Set(pageContext.languages.map(stripSdkType))) as LanguageKey[];
```

After the ably-ui update (Phase 1.2), `stripSdkType("chat_android")` will return `"android"`, so the language selector will correctly show "Android" as an option on chat pages. **No additional change needed here** beyond the ably-ui update.

### Phase 5: Clean up `jetpack` references

#### 5.1 Remove `jetpack` from [`types.ts`](src/data/languages/types.ts:29)

```diff
  'laravel',
  'typescript',
- 'jetpack',
+ 'chat_android',
```

#### 5.2 Remove `jetpack` from [`languageInfo.ts`](src/data/languages/languageInfo.ts:89)

Remove the `jetpack` entry and add `chat_android`:

```diff
- jetpack: {
-   label: 'Jetpack Compose',
-   syntaxHighlighterKey: 'kotlin',
- },
+ chat_android: {
+   label: 'Jetpack Compose',
+   syntaxHighlighterKey: 'kotlin',
+ },
```

#### 5.3 Optionally remove `jetpack` from ably-ui [`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:128)

Keep `jetpack` for backward compatibility or remove it if no longer needed.

## Summary of All Changes

### ably-ui (separate PR/update)

| File | Change |
|---|---|
| [`CodeSnippet/languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts) | Add `chat_android` entry, update `stripSdkType()` to handle `chat_` prefix, update `getLanguageInfo()` to check full key first |

### ably-docs

| File | Change |
|---|---|
| [`src/data/languages/types.ts`](src/data/languages/types.ts) | Replace `jetpack` with `chat_android` in `languageKeys` |
| [`src/data/languages/languageInfo.ts`](src/data/languages/languageInfo.ts) | Replace `jetpack` entry with `chat_android` |
| [`src/data/languages/languageData.ts`](src/data/languages/languageData.ts) | Change `jetpack: '1.1'` to `android: '1.1'` in chat config |
| 13 chat MDX files | Change `` ```jetpack `` → `` ```chat_android `` (code blocks) |
| 13 chat MDX files | Change `<If lang="jetpack">` → `<If lang="android">` and `<If lang="...,jetpack">` → `<If lang="...,android">` |

## Alternative Considered: Modify existing `android` entry

Instead of `chat_android`, we could change the existing `android` entry's `syntaxHighlighterKey` from `java` to `kotlin`. However:

1. The existing `android` with Java highlighting is used in 87+ `<If lang="android">` occurrences in API reference pages
2. If Pub/Sub Android pages ever add Java code blocks with `` ```android ``, they'd get Kotlin highlighting — incorrect
3. The `chat_` prefix approach is cleaner and follows established patterns

## Risk Assessment

| Risk | Mitigation |
|---|---|
| ably-ui update needed first | Coordinate PR timing; ably-ui change is backward-compatible |
| `<If lang="android">` overlap between chat and pub/sub | No actual conflict — different product contexts, different page language sets |
| `stripSdkType` change affects existing behavior | Only adds `chat_` handling; `realtime_` and `rest_` unchanged |
| `languageData` key mismatch | Use `android` (not `chat_android`) as the key in `languageData.chat` |
