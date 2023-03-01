import "dotenv/config"
import { fileURLToPath } from "url"
import { dirname } from "path"
import remarkGfm from "remark-gfm"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pageToAlgoliaRecord = ({
  node: { id, frontmatter, fields, ...rest },
}) => {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const config = {
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
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
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
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
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
        name: `STERD`,
        short_name: `STERD`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#2563e1`,
        display: `standalone`,
        icon: `src/images/sterdlogo-black.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": ["X-Frame-Options: SAMEORIGIN"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: [
          {
            query: `{
              pages: allMdx {
                edges {
                  node {
                    id
                    frontmatter {
                      title
                    }
                    fields {
                      slug
                    }
                    excerpt(pruneLength: 5000)
                  }
                }
              }
            }`,
            transformer: ({ data }) =>
              data.pages.edges.map(pageToAlgoliaRecord),
            indexName: `Pages`,
            settings: { attributesToSnippet: [`excerpt:20`] },
          },
        ],
      },
    },
  ],
  graphqlTypegen: true,
}

export default config
