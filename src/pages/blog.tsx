import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {
  data: Queries.PostListPageQuery
  location: Location
}

const BlogIndex = ({ data, location }: Props) => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <Layout isBlog={true}>
        <p>게시물이 없습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout isBlog={true}>
      <div style={{ paddingLeft: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>모든 글</h1>
        <p>총 {posts.length}개의 글이 있어요</p>
      </div>
      <PostWrapper>
        {posts.map(post => {
          const title = post.frontmatter?.title || post.fields?.slug

          return (
            <Link to={post.fields?.slug!} itemProp="url">
              <Tile key={post.fields?.slug!}>
                <article itemScope itemType="http://schema.org/Article">
                  {/* <StaticImage
                    formats={["auto", "webp", "avif"]}
                    src="../images/gatsby-icon.png"
                    quality={100}
                    alt="Profile picture"
                    style={{
                      backgroundSize: "cover",
                      width: "100%",
                      height: "250px",
                    }}
                  /> */}
                  <TileContents>
                    <header>
                      <Emoji>{post.frontmatter?.emoji}</Emoji>
                      <TileTitle itemProp="headline">{title}</TileTitle>
                      <small>{post.frontmatter?.date}</small>
                    </header>
                    <section>
                      <TileDescription itemProp="description">
                        {post.frontmatter?.description || post.excerpt}
                      </TileDescription>
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
  margin-top: 2rem;
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
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  color: black;
  transition: all 200ms;
  height: 100%;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }

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
  padding: 1.625rem 1.75rem;
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

const Emoji = styled.p`
  margin-top: -1rem;
  margin-bottom: 0;
  font-size: 4rem;
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="모든 포스트" />

export const pageQuery = graphql`
  query PostListPage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY년 M월 D일")
          title
          description
          emoji
        }
      }
    }
  }
`
