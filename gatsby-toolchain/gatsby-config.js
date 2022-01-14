module.exports = {
  siteMetadata: {
    siteUrl: "https://www.ably.com/documentation",
    title: "Documentation | Ably Realtime",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-yaml",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "textile-partials",
        path: "./src/textile/partials"
      },
      __key: "textile-partials",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "textile-nanoc-compatible",
        path: "./src/textile/nanoc-compatible"
      },
      __key: "textile-nanoc-compatible",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "yaml-page-furniture",
        path: "./data/yaml/page-furniture"
     },
     __key: "yaml-page-furniture"
    }
  ],
};
