import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout>
      <PostWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <Link to={post.fields.slug} itemProp="url">
              <Tile key={post.fields.slug}>
                <article itemScope itemType="http://schema.org/Article">
                  <StaticImage
                    formats={["auto", "webp", "avif"]}
                    src="../images/gatsby-icon.png"
                    quality={100}
                    alt="Profile picture"
                    style={{
                      backgroundSize: "cover",
                      width: "100%",
                      height: "250px",
                    }}
                  />

                  <TileContents>
                    <header>
                      <TileTitle itemProp="headline">{title}</TileTitle>
                      <small>{post.frontmatter.date}</small>
                    </header>
                    <section>
                      <TileDescription
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </TileContents>
                </article>
              </Tile>
            </Link>
          )
        })}
      </PostWrapper>
    </Layout>
  )
}

export default BlogIndex

const PostWrapper = styled.ol`
  display: grid;
  grid-gap: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 3rem;
  list-style: none;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Tile = styled.div`
  background-color: #fff;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;
  color: black;

  &:hover h2 {
    color: #2563e1;
    transition: all 200ms;
  }

  &:hover img {
    transform: scale(1.05);
    transition: all 200ms;
  }
`

const TileContents = styled.div`
  padding: 2rem;
`

const TileTitle = styled.h2`
  font-size: 1.5rem;
  transition: all 200ms;
  margin: 0;
`

const TileDescription = styled.p`
  margin: 0;
  padding-top: 1rem;
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="모든 포스트" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
