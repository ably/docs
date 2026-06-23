// Local icon name (DX-1128). Permissive template-literal type: covers the
// static `icon-gui-*` / `icon-social-*` / `icon-product-*` names and the
// dynamic `icon-tech-${language}` usages, while keeping the icon-* convention.
export type IconName = `icon-${string}`;
