# Implementation Plan: Migrate `jetpack` snippet annotation to `chat_android`

## Problem Statement

The current branch (`fix/jetpack-snippets-for-android`) has already renamed `` ```jetpack `` code block annotations to `` ```android `` in chat MDX pages (commit `853cb94ff`). However, this creates a **conflict** because `android` already exists as a language identifier with `syntaxHighlighterKey: "java"`, while the Jetpack Compose snippets need `syntaxHighlighterKey: "kotlin"`.

### The Conflict

| Identifier | Label | Icon | syntaxHighlighterKey | Used In |
|---|---|---|---|---|
| `android` (existing) | Android | `icon-tech-android-head` | `java` | `<If lang="android">` in API reference pages (push-admin, push, types) |
| `jetpack` (original) | Jetpack Compose | `icon-tech-jetpack` | `kotlin` | Chat product code blocks + `<If lang="jetpack">` |
| `android` (current branch) | Android | `icon-tech-android-head` | `java` | ❌ Kotlin code gets Java highlighting |

The current branch's `` ```android `` code blocks hit the existing `android` entry in [`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:118) which applies `java` syntax highlighting to Kotlin code. Additionally, the `<If lang="jetpack">` tags (52 occurrences) were **NOT updated** in the branch commit.

### Current State of the Branch

- **Code blocks**: All 78 occurrences of `` ```jetpack `` have been changed to `` ```android `` across 13 chat MDX files
- **`<If>` tags**: All 52 occurrences of `<If lang="jetpack">` / `<If lang="...,jetpack">` are **still unchanged**
- **Language config files**: `types.ts`, `languageInfo.ts`, `languageData.ts` still reference `jetpack`

## Recommended Approach: Use `chat_android` prefix for code blocks

### Why `chat_android`?

The codebase has a well-established pattern for product-scoped language prefixes:

- `realtime_javascript`, `realtime_python`, etc. — used in Pub/Sub pages to differentiate Realtime vs REST SDK variants
- `rest_javascript`, `rest_php`, etc. — same pattern for REST SDK

The prefix system works as follows:

1. **[`onCreatePage.ts`](data/onCreatePage.ts:39)** extracts language identifiers from `` ```language `` annotations via regex (`/```(\w+)/g`) and stores them in `pageContext.languages`
2. **[`layout-context.tsx`](src/contexts/layout-context.tsx:63)** calls `stripSdkType()` to remove the prefix when building the language selector (e.g., `realtime_javascript` → `javascript`)
3. **[`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:202)** detects `realtime_` and `rest_` prefixes to show the SDK type selector (Realtime/REST toggle)
4. **[`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:135)** `stripSdkType()` currently only strips `realtime_` and `rest_` prefixes
5. **[`getLanguageInfo()`](../ably-ui/src/core/CodeSnippet/languages.ts:143)** strips the prefix first, then looks up label, icon, and `syntaxHighlighterKey`
6. **[`LanguageSelector.tsx`](../ably-ui/src/core/CodeSnippet/LanguageSelector.tsx:22)** calls `getLanguageInfo(lang)` with the **full** language key (e.g., `chat_android`) to get label and icon for tabs

Using `chat_android` follows this same convention — it's a product-scoped variant of `android` that can have its own `syntaxHighlighterKey: "kotlin"`.

### Why NOT just change `android`'s `syntaxHighlighterKey` to `kotlin`?

- `android` with `syntaxHighlighterKey: "java"` is used in API reference pages via `<If lang="android">` conditionals (81 occurrences across push-admin, push, types pages)
- These pages reference the Java-based Android Pub/Sub SDK, not the Kotlin Chat SDK
- The `android` language is listed in [`pubsub.ts`](src/data/nav/pubsub.ts:401) navigation config for push-related pages with explicit `languages` arrays
- Changing `android`'s `syntaxHighlighterKey` to `kotlin` would break Java syntax highlighting for all existing Pub/Sub Android content

### Label and Icon: "Android" with android icon (NOT "Jetpack Compose")

The user wants the UI to display **"Android"** as the label with the **`icon-tech-android-head`** icon, not "Jetpack Compose" with the jetpack icon. This makes sense because:

- The Chat SDK for Android is the **Ably Chat Kotlin SDK** used on Android — "Jetpack Compose" is an implementation detail of the UI framework, not the SDK identity
- Users searching for "Android" support should see "Android" in the language selector
- The nav already shows "Kotlin (Android)" for the getting-started page in [`chat.ts`](src/data/nav/chat.ts:37)
- The existing `android` entry already has `label: "Android"` and `icon: "icon-tech-android-head"` — the `chat_android` entry should match

## Implementation Steps

### Phase 1: Update `ably-ui` (CodeSnippet/languages.ts)

#### 1.1 Add `chat_android` to the languages map

In [`../ably-ui/src/core/CodeSnippet/languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:11):

```typescript
chat_android: {
  label: "Android",
  icon: "icon-tech-android-head",
  syntaxHighlighterKey: "kotlin",
},
```

This entry uses:
- `label: "Android"` — consistent with the existing `android` entry, shows "Android" in code snippet tabs
- `icon: "icon-tech-android-head"` — the Android icon, same as the existing `android` entry
- `syntaxHighlighterKey: "kotlin"` — correct syntax highlighting for Kotlin/Jetpack Compose code

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

`stripSdkType("chat_android")` will return `"android"`, which is the base language key used for the language selector in the sidebar.

#### 1.3 Update `getLanguageInfo()` to check full key first

**Critical**: The current [`getLanguageInfo()`](../ably-ui/src/core/CodeSnippet/languages.ts:143) strips the prefix first, then looks up the stripped key. This means `getLanguageInfo("chat_android")` would return the `android` entry with `syntaxHighlighterKey: "java"` — **wrong**.

Both [`LanguageSelector.tsx`](../ably-ui/src/core/CodeSnippet/LanguageSelector.tsx:22) and [`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:300) call `getLanguageInfo()` with the **full** language key (e.g., `chat_android`). So we need `getLanguageInfo()` to check the full key first:

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

This way:
- `getLanguageInfo("chat_android")` → matches `chat_android` entry → `syntaxHighlighterKey: "kotlin"` ✅
- `getLanguageInfo("realtime_javascript")` → no `realtime_javascript` entry → strips to `javascript` → matches ✅
- `getLanguageInfo("android")` → matches `android` entry → `syntaxHighlighterKey: "java"` ✅

#### 1.4 Ensure `chat_` prefix doesn't trigger SDK type selector

In [`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:202), the SDK type detection only checks for `realtime_` and `rest_`:

```typescript
if (codeLanguage.startsWith("realtime_")) {
  sdkTypes.add("realtime");
} else if (codeLanguage.startsWith("rest_")) {
  sdkTypes.add("rest");
}
```

`chat_android` will **not** trigger the SDK selector, which is correct — Chat pages don't need a Realtime/REST toggle. **No change needed here.**

#### 1.5 Fix `activeLanguage` resolution in `CodeSnippet.tsx` (CRITICAL)

**This is the most critical change.** The `realtime_`/`rest_` prefixes work because the SDK type selector reconstructs the full key (e.g., `"realtime_" + "javascript"` → `"realtime_javascript"`). But `chat_` has no SDK type selector, so there's no reconstruction.

The problem: [`MDXWrapper.tsx`](src/components/Layout/MDXWrapper.tsx:144) passes `activePage.language` (which is **stripped** to `"android"`) as the `lang` prop to `CodeSnippet`. Inside [`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx:258), the `activeLanguage` computation does:

```typescript
// Current code (line 258-268):
const activeLanguage = useMemo(() => {
    if (resolvedSdk && sdkTypes.has(resolvedSdk)) {
      return `${resolvedSdk}_${lang}`;  // Only works for realtime_/rest_
    }
    if (lang) return lang;  // Returns "android" — but code blocks have "chat_android"!
    ...
```

Then at line 292-294, the code filters: `codeData.filter(code => code.language === activeLanguage)`. Since `"android" !== "chat_android"`, **no code block matches and nothing renders**.

**Fix**: Update the `activeLanguage` computation to find the matching prefixed language when the stripped `lang` doesn't directly match:

```typescript
const activeLanguage = useMemo(() => {
    if (resolvedSdk && sdkTypes.has(resolvedSdk)) {
      return `${resolvedSdk}_${lang}`;
    }

    if (lang) {
      // Check if lang matches directly in the available languages
      if (languages.includes(lang)) return lang;
      // Check if lang matches a prefixed language when stripped
      // (e.g., lang="android" matches "chat_android" after stripping)
      const prefixedMatch = languages.find((l) => stripSdkType(l) === lang);
      if (prefixedMatch) return prefixedMatch;
      return lang;
    }

    if (filteredLanguages.length > 0) return filteredLanguages[0];

    return languages[0];
}, [resolvedSdk, sdkTypes, lang, filteredLanguages, languages]);
```

This way:
- `lang = "android"`, `languages = ["javascript", "swift", "kotlin", "chat_android"]`
- `languages.includes("android")` → `false`
- `languages.find((l) => stripSdkType(l) === "android")` → finds `"chat_android"` ✅
- `activeLanguage = "chat_android"` → matches code block data ✅

**This is backward-compatible** because:
- For `realtime_`/`rest_` prefixes: the `resolvedSdk` path handles them first (no change)
- For unprefixed languages like `"javascript"`: `languages.includes("javascript")` → `true` → returns directly (no change)
- For `chat_android`: the new `prefixedMatch` path kicks in only when needed

**Verification of the full round-trip:**
1. User clicks "Android" tab → `handleLanguageChange("chat_android")` → `onChange(stripSdkType("chat_android"))` → `onChange("android")` → navigates to `?lang=android`
2. Page reloads → `activePage.language = "android"` → `lang = "android"` → `activeLanguage` finds `"chat_android"` via `prefixedMatch` → code block renders ✅

#### 1.6 Optionally remove or keep `jetpack` entry

The `jetpack` entry in [`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:128) can be kept for backward compatibility or removed. Recommended: **remove it** since no code blocks will use it after migration.

### Phase 2: Update `ably-docs` language configuration

#### 2.1 Update [`src/data/languages/types.ts`](src/data/languages/types.ts:1)

Replace `jetpack` with `chat_android` in the `languageKeys` array:

```diff
  'laravel',
  'typescript',
- 'jetpack',
+ 'chat_android',
```

#### 2.2 Update [`src/data/languages/languageInfo.ts`](src/data/languages/languageInfo.ts:89)

Replace `jetpack` entry with `chat_android`:

```diff
- jetpack: {
-   label: 'Jetpack Compose',
-   syntaxHighlighterKey: 'kotlin',
- },
+ chat_android: {
+   label: 'Android',
+   syntaxHighlighterKey: 'kotlin',
+ },
```

Note: label is `"Android"` (not `"Jetpack Compose"`) to match the ably-ui entry and user expectations.

#### 2.3 Update [`src/data/languages/languageData.ts`](src/data/languages/languageData.ts:38)

Change the chat product's language list. **Use `android` as the key** (not `chat_android`), because [`determineActiveLanguage()`](src/contexts/layout-context.tsx:43) compares stripped language keys against `languageData[product]` keys:

```diff
  chat: {
    javascript: '1.1',
    react: '1.1',
    swift: '1.0',
    kotlin: '1.1',
-   jetpack: '1.1',
+   android: '1.1',
  },
```

**Why `android` and not `chat_android`?** The flow is:
1. `pageContext.languages` contains `["javascript", "react", "swift", "kotlin", "chat_android"]`
2. [`layout-context.tsx:63`](src/contexts/layout-context.tsx:63) strips them: `["javascript", "react", "swift", "kotlin", "android"]`
3. [`determineActiveLanguage()`](src/contexts/layout-context.tsx:43) filters: `activeLanguages.filter((lang) => Object.keys(languageData[product]).includes(lang))`
4. So `"android"` must match a key in `languageData.chat` — hence `android: '1.1'`

**Note**: `android` is NOT in `languageData.pubsub`, so there's no conflict. The pubsub nav pages that use `<If lang="android">` get their language lists from the `languages` array in [`pubsub.ts`](src/data/nav/pubsub.ts:401) nav config, not from `languageData`.

### Phase 3: Update MDX content files

#### 3.1 Rename code block annotations

In all chat MDX files, change the current `` ```android `` (which was already changed from `` ```jetpack `` in the branch) to `` ```chat_android ``:

```diff
- ```android
+ ```chat_android
```

**Files to update** (13 files, all already using `` ```android `` from the branch commit):

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

**Critical**: The branch commit did NOT update `<If lang="jetpack">` tags. There are **52 occurrences** across chat MDX files that need updating.

The [`If.tsx`](src/components/Layout/mdx/If.tsx:22) component compares `lang` prop values against `activePage.language`, which comes from `stripSdkType`-processed languages. So `activePage.language` will be `"android"` (stripped from `chat_android`).

**Therefore, use `<If lang="android">` in MDX files** (not `<If lang="chat_android">`). This is consistent with how `<If lang="javascript">` works for both `realtime_javascript` and `rest_javascript` code blocks.

Two patterns exist:

**Pattern A — Jetpack-only conditionals:**
```diff
- <If lang="jetpack">
+ <If lang="android">
```

**Pattern B — Multi-language conditionals including jetpack:**
```diff
- <If lang="javascript,swift,kotlin,jetpack">
+ <If lang="javascript,swift,kotlin,android">
```

**No conflict with existing `<If lang="android">` in API reference pages**: Those pages are in the `pubsub` product context with different language sets. The `android` language appears in the language selector on pubsub push pages (via nav config `languages` arrays in [`pubsub.ts`](src/data/nav/pubsub.ts:401)) and on chat pages (via `languageData.chat`). The `<If>` tags work correctly in both contexts because they're on different pages with different active language sets — a user can only have one active language per page.

### Phase 4: No changes needed in `layout-context.tsx`

The [`layout-context.tsx`](src/contexts/layout-context.tsx:63) imports `stripSdkType` from ably-ui:

```typescript
languages = Array.from(new Set(pageContext.languages.map(stripSdkType))) as LanguageKey[];
```

After the ably-ui update (Phase 1.2), `stripSdkType("chat_android")` will return `"android"`, so the language selector will correctly show "Android" as an option on chat pages. **No additional change needed here** beyond the ably-ui update.

### Phase 5: Clean up `jetpack` references

#### 5.1 Remove `jetpack` from [`types.ts`](src/data/languages/types.ts:29) (covered in 2.1)

#### 5.2 Remove `jetpack` from [`languageInfo.ts`](src/data/languages/languageInfo.ts:89) (covered in 2.2)

#### 5.3 Remove `jetpack` from ably-ui [`languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts:128) (covered in 1.6)

## Summary of All Changes

### ably-ui (separate PR/update)

| File | Change |
|---|---|
| [`CodeSnippet/languages.ts`](../ably-ui/src/core/CodeSnippet/languages.ts) | Add `chat_android` entry with `label: "Android"`, `icon: "icon-tech-android-head"`, `syntaxHighlighterKey: "kotlin"`. Update `stripSdkType()` to handle `chat_` prefix. Update `getLanguageInfo()` to check full key first. Remove `jetpack` entry. |
| [`CodeSnippet.tsx`](../ably-ui/src/core/CodeSnippet.tsx) | **CRITICAL**: Update `activeLanguage` computation to resolve stripped `lang` prop back to the full prefixed key (e.g., `"android"` → `"chat_android"`) by searching the available `languages` array. Without this, code blocks using `chat_android` won't render when the active language is `"android"`. |

### ably-docs

| File | Change |
|---|---|
| [`src/data/languages/types.ts`](src/data/languages/types.ts) | Replace `jetpack` with `chat_android` in `languageKeys` |
| [`src/data/languages/languageInfo.ts`](src/data/languages/languageInfo.ts) | Replace `jetpack` entry with `chat_android` (label: `"Android"`) |
| [`src/data/languages/languageData.ts`](src/data/languages/languageData.ts) | Change `jetpack: '1.1'` to `android: '1.1'` in chat config |
| 13 chat MDX files | Change `` ```android `` → `` ```chat_android `` (code blocks) |
| 13 chat MDX files | Change `<If lang="jetpack">` → `<If lang="android">` and `<If lang="...,jetpack">` → `<If lang="...,android">` |

## Data Flow Summary

Here's the complete data flow for `chat_android` through the system:

```
MDX file: ```chat_android
    ↓
onCreatePage.ts: extracts "chat_android" into pageContext.languages
    ↓
layout-context.tsx: stripSdkType("chat_android") → "android"
    ↓ (for language selector sidebar)
    activePage.languages = ["javascript", "react", "swift", "kotlin", "android"]
    activePage.language = "android" (matched against languageData.chat keys)
    ↓
If.tsx: <If lang="android"> matches activePage.language === "android" ✅
    ↓
MDXWrapper.tsx: passes lang={activePage.language} = "android" to CodeSnippet
    ↓
CodeSnippet.tsx activeLanguage computation:
    lang = "android", languages = ["javascript", "swift", "kotlin", "chat_android"]
    → languages.includes("android") = false
    → languages.find(l => stripSdkType(l) === "android") = "chat_android"
    → activeLanguage = "chat_android" ✅
    ↓
CodeSnippet.tsx: codeData.filter(code => code.language === "chat_android") → matches ✅
    ↓
LanguageSelector.tsx: getLanguageInfo("chat_android")
    → matches chat_android entry → label: "Android", icon: "icon-tech-android-head" ✅
    ↓
CodeSnippet.tsx (line 300): getLanguageInfo("chat_android")
    → matches chat_android entry → syntaxHighlighterKey: "kotlin" ✅
    ↓
User clicks "Android" tab:
    → handleLanguageChange("chat_android")
    → onChange(stripSdkType("chat_android")) = onChange("android")
    → navigate("?lang=android")
    → activePage.language = "android" → cycle repeats ✅
```

## Risk Assessment

| Risk | Mitigation |
|---|---|
| ably-ui update needed first | Coordinate PR timing; ably-ui change is backward-compatible |
| `<If lang="android">` overlap between chat and pub/sub | No actual conflict — different product contexts, different page language sets. `android` is NOT in `languageData.pubsub`; pubsub push pages get their `android` language from nav config `languages` arrays. |
| `stripSdkType` change affects existing behavior | Only adds `chat_` handling; `realtime_` and `rest_` unchanged |
| `languageData` key mismatch | Use `android` (not `chat_android`) as the key in `languageData.chat` |
| `getLanguageInfo()` change breaks existing lookups | Full-key-first lookup is additive; existing keys like `realtime_javascript` have no entry in the map, so they still fall through to stripped lookup |
| `activeLanguage` resolution fails for `chat_` prefix | Fixed by adding `prefixedMatch` fallback in `CodeSnippet.tsx` `activeLanguage` computation (Phase 1.5). Backward-compatible: unprefixed languages match directly, `realtime_`/`rest_` use the existing `resolvedSdk` path. |

## Alternatives Considered

### Alternative 1: Modify existing `android` entry to use `kotlin`

**Rejected** because:
1. The existing `android` with Java highlighting is used in 81+ `<If lang="android">` occurrences in API reference pages
2. If Pub/Sub Android pages ever add Java code blocks with `` ```android ``, they'd get Kotlin highlighting — incorrect
3. The `chat_` prefix approach is cleaner and follows established patterns

### Alternative 2: Keep `` ```android `` as-is (current branch state)

**Rejected** because:
1. `getLanguageInfo("android")` returns `syntaxHighlighterKey: "java"` — Kotlin code gets Java highlighting
2. Would require changing the existing `android` entry's `syntaxHighlighterKey`, breaking pub/sub pages
