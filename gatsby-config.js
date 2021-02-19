module.exports = {
  siteMetadata: {
    title: "ProjectFusion",
  },
  plugins: [
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
