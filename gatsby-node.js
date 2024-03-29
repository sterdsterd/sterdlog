/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
const portfolioModal = path.resolve(
  `./src/components/Portfolio/PortfolioContent.tsx`
)
const tilPost = path.resolve(`./src/templates/til-post.tsx`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const blogResult = await graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" } }
        sort: { childrenMdx: { frontmatter: { date: ASC } } }
        limit: 1000
      ) {
        nodes {
          childMdx {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogResult.errors
    )
    return
  }

  const posts = blogResult.data.allFile.nodes.filter(it => it.childMdx)

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].childMdx.id
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].childMdx.id

      createPage({
        path: post.childMdx.fields.slug,
        component: `${blogPost}?__contentFilePath=${post.childMdx.internal.contentFilePath}`,
        context: {
          id: post.childMdx.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Portfolio Posts
  const portfolioResult = await graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "portfolio" } }
        sort: { childrenMdx: { frontmatter: { date: ASC } } }
        limit: 1000
      ) {
        nodes {
          childMdx {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (portfolioResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your portfolio posts`,
      portfolioResult.errors
    )
    return
  }

  const modals = portfolioResult.data.allFile.nodes.filter(it => it.childMdx)

  if (modals.length > 0) {
    modals.forEach((post, index) => {
      createPage({
        path: `${post.childMdx.fields.slug}`,
        component: `${portfolioModal}?__contentFilePath=${post.childMdx.internal.contentFilePath}`,
        context: {
          id: post.childMdx.id,
        },
      })
    })
  }

  // TIL Posts
  const tilResults = await graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "til" } }
        sort: { childrenMdx: { frontmatter: { date: ASC } } }
      ) {
        nodes {
          childMdx {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if (tilResults.errors) {
    reporter.panicOnBuild(
      `There was an error loading your TIL posts`,
      tilResults.errors
    )
    return
  }

  const tilPosts = tilResults.data.allFile.nodes.filter(it => it.childMdx)

  if (tilPosts.length > 0) {
    tilPosts.forEach((post, index) => {
      const previousPostId =
        index === 0 ? null : tilPosts[index - 1].childMdx.id
      const nextPostId =
        index === tilPosts.length - 1 ? null : tilPosts[index + 1].childMdx.id
      createPage({
        path: `${post.childMdx.frontmatter.slug}`,
        component: `${tilPost}?__contentFilePath=${post.childMdx.internal.contentFilePath}`,
        context: {
          id: post.childMdx.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      emoji: String
      tags: [String]
      thumbnail: File
      featuredVideo: String
      slug: String
    }

    type Fields {
      slug: String
    }
  `)
}
