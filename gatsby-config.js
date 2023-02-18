/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `sterdlog`,
    author: {
      name: `Yulwon Rhee`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://sterd.dev/`,
    social: {
      twitter: `kylemathews`,
    },
    menu: [
      {
        title: `포트폴리오`,
        link: `portfolio`,
      },
      {
        title: `블로그`,
        link: `blog`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/content/portfolio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allFile } }) => {
              return allFile.nodes
                .filter(it => it.childMdx)
                .map(node => {
                  return Object.assign({}, node.childMdx.frontmatter, {
                    description: node.childMdx.excerpt,
                    date: node.childMdx.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.childMdx.fields.slug,
                    guid: site.siteMetadata.siteUrl + node.childMdx.fields.slug,
                    //custom_elements: [{ "content:encoded": node.html }],
                  })
                })
            },
            query: `{
              allFile(
                filter: { sourceInstanceName: { eq: "blog" } }
                sort: { childrenMdx: { frontmatter: { date: DESC } } }
              ) {
                nodes {
                  childMdx {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      date(formatString: "YYYY년 M월 D일")
                      title
                    }
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-netlify-headers`,
      options: {
        "/*": ["X-Frame-Options: sameorigin"],
      },
    },
  ],
  graphqlTypegen: true,
}
