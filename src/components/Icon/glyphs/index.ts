import type { ComponentType, SVGProps } from "react";
import IconGuiAblyBadge from "./icon-gui-ably-badge";
import IconGuiProdAiTransportOutline from "./icon-gui-prod-ai-transport-outline";
import IconGuiProdAiTransportSolid from "./icon-gui-prod-ai-transport-solid";
import IconGuiProdChatOutline from "./icon-gui-prod-chat-outline";
import IconGuiProdChatSolid from "./icon-gui-prod-chat-solid";
import IconGuiProdLiveobjectsOutline from "./icon-gui-prod-liveobjects-outline";
import IconGuiProdLiveobjectsSolid from "./icon-gui-prod-liveobjects-solid";
import IconGuiProdLivesyncOutline from "./icon-gui-prod-livesync-outline";
import IconGuiProdLivesyncSolid from "./icon-gui-prod-livesync-solid";
import IconGuiProdPubsubOutline from "./icon-gui-prod-pubsub-outline";
import IconGuiProdPubsubSolid from "./icon-gui-prod-pubsub-solid";
import IconGuiProdSpacesOutline from "./icon-gui-prod-spaces-outline";
import IconGuiProdSpacesSolid from "./icon-gui-prod-spaces-solid";
import IconGuiResources from "./icon-gui-resources";
import IconProductAiTransportMono from "./icon-product-ai-transport-mono";
import IconProductAiTransport from "./icon-product-ai-transport";
import IconProductChatMono from "./icon-product-chat-mono";
import IconProductChat from "./icon-product-chat";
import IconProductLiveobjectsMono from "./icon-product-liveobjects-mono";
import IconProductLiveobjects from "./icon-product-liveobjects";
import IconProductLivesyncMono from "./icon-product-livesync-mono";
import IconProductLivesync from "./icon-product-livesync";
import IconProductPlatformMono from "./icon-product-platform-mono";
import IconProductPlatform from "./icon-product-platform";
import IconProductPubsubMono from "./icon-product-pubsub-mono";
import IconProductPubsub from "./icon-product-pubsub";
import IconProductSpacesMono from "./icon-product-spaces-mono";
import IconProductSpaces from "./icon-product-spaces";
import IconSocialDiscordMono from "./icon-social-discord-mono";
import IconSocialGithubMono from "./icon-social-github-mono";
import IconSocialGithub from "./icon-social-github";
import IconSocialLinkedinMono from "./icon-social-linkedin-mono";
import IconSocialStackoverflowMono from "./icon-social-stackoverflow-mono";
import IconSocialXMono from "./icon-social-x-mono";
import IconSocialYoutubeMono from "./icon-social-youtube-mono";
import IconTechAndroidFull from "./icon-tech-android-full";
import IconTechClaudeMono from "./icon-tech-claude-mono";
import IconTechCsharp from "./icon-tech-csharp";
import IconTechFlutter from "./icon-tech-flutter";
import IconTechGo from "./icon-tech-go";
import IconTechJava from "./icon-tech-java";
import IconTechJavascript from "./icon-tech-javascript";
import IconTechJson from "./icon-tech-json";
import IconTechKotlin from "./icon-tech-kotlin";
import IconTechLaravelBroadcast from "./icon-tech-laravel-broadcast";
import IconTechNextjs from "./icon-tech-nextjs";
import IconTechNodejs from "./icon-tech-nodejs";
import IconTechObjectivec from "./icon-tech-objectivec";
import IconTechOpenai from "./icon-tech-openai";
import IconTechPhp from "./icon-tech-php";
import IconTechPostgres from "./icon-tech-postgres";
import IconTechPython from "./icon-tech-python";
import IconTechReact from "./icon-tech-react";
import IconTechReactnative from "./icon-tech-reactnative";
import IconTechRuby from "./icon-tech-ruby";
import IconTechSwift from "./icon-tech-swift";
import IconTechTypescript from "./icon-tech-typescript";
import IconTechVercel from "./icon-tech-vercel";
import IconTechWeb from "./icon-tech-web";

export type GlyphProps = SVGProps<SVGSVGElement> & { title?: string; titleId?: string };

// Vendored from @ably/ui core/Icon/components (DX-1128). One self-contained SVG
// component per icon docs actually uses; keyed by the legacy icon name.
export const glyphs: Record<string, ComponentType<GlyphProps>> = {
  "icon-gui-ably-badge": IconGuiAblyBadge,
  "icon-gui-prod-ai-transport-outline": IconGuiProdAiTransportOutline,
  "icon-gui-prod-ai-transport-solid": IconGuiProdAiTransportSolid,
  "icon-gui-prod-chat-outline": IconGuiProdChatOutline,
  "icon-gui-prod-chat-solid": IconGuiProdChatSolid,
  "icon-gui-prod-liveobjects-outline": IconGuiProdLiveobjectsOutline,
  "icon-gui-prod-liveobjects-solid": IconGuiProdLiveobjectsSolid,
  "icon-gui-prod-livesync-outline": IconGuiProdLivesyncOutline,
  "icon-gui-prod-livesync-solid": IconGuiProdLivesyncSolid,
  "icon-gui-prod-pubsub-outline": IconGuiProdPubsubOutline,
  "icon-gui-prod-pubsub-solid": IconGuiProdPubsubSolid,
  "icon-gui-prod-spaces-outline": IconGuiProdSpacesOutline,
  "icon-gui-prod-spaces-solid": IconGuiProdSpacesSolid,
  "icon-gui-resources": IconGuiResources,
  "icon-product-ai-transport-mono": IconProductAiTransportMono,
  "icon-product-ai-transport": IconProductAiTransport,
  "icon-product-chat-mono": IconProductChatMono,
  "icon-product-chat": IconProductChat,
  "icon-product-liveobjects-mono": IconProductLiveobjectsMono,
  "icon-product-liveobjects": IconProductLiveobjects,
  "icon-product-livesync-mono": IconProductLivesyncMono,
  "icon-product-livesync": IconProductLivesync,
  "icon-product-platform-mono": IconProductPlatformMono,
  "icon-product-platform": IconProductPlatform,
  "icon-product-pubsub-mono": IconProductPubsubMono,
  "icon-product-pubsub": IconProductPubsub,
  "icon-product-spaces-mono": IconProductSpacesMono,
  "icon-product-spaces": IconProductSpaces,
  "icon-social-discord-mono": IconSocialDiscordMono,
  "icon-social-github-mono": IconSocialGithubMono,
  "icon-social-github": IconSocialGithub,
  "icon-social-linkedin-mono": IconSocialLinkedinMono,
  "icon-social-stackoverflow-mono": IconSocialStackoverflowMono,
  "icon-social-x-mono": IconSocialXMono,
  "icon-social-youtube-mono": IconSocialYoutubeMono,
  "icon-tech-android-full": IconTechAndroidFull,
  "icon-tech-claude-mono": IconTechClaudeMono,
  "icon-tech-csharp": IconTechCsharp,
  "icon-tech-flutter": IconTechFlutter,
  "icon-tech-go": IconTechGo,
  "icon-tech-java": IconTechJava,
  "icon-tech-javascript": IconTechJavascript,
  "icon-tech-json": IconTechJson,
  "icon-tech-kotlin": IconTechKotlin,
  "icon-tech-laravel-broadcast": IconTechLaravelBroadcast,
  "icon-tech-nextjs": IconTechNextjs,
  "icon-tech-nodejs": IconTechNodejs,
  "icon-tech-objectivec": IconTechObjectivec,
  "icon-tech-openai": IconTechOpenai,
  "icon-tech-php": IconTechPhp,
  "icon-tech-postgres": IconTechPostgres,
  "icon-tech-python": IconTechPython,
  "icon-tech-react": IconTechReact,
  "icon-tech-reactnative": IconTechReactnative,
  "icon-tech-ruby": IconTechRuby,
  "icon-tech-swift": IconTechSwift,
  "icon-tech-typescript": IconTechTypescript,
  "icon-tech-vercel": IconTechVercel,
  "icon-tech-web": IconTechWeb,
};
