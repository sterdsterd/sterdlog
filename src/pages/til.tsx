import * as React from "react"
import { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostListItem from "../components/PostListItem"

type Props = {
  data: Queries.PostListPageQuery
  location: Location
}

const Til = ({ data, location }: Props) => {
  const posts = data.allFile.nodes.filter(post => post.childMdx)
  const [selectedTag, setSelectedTag] = useState<string>("모든 글")

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
        <h1 style={{ marginBottom: "0.5rem" }}>
          {selectedTag === "모든 글" ? selectedTag : `#${selectedTag}`}
        </h1>
        <p>총 {posts.length}개의 글이 있어요</p>
      </div>
      <PostWrapper>
        {posts.map(post => {
          var mdx = post.childMdx!

          return (
            <PostListItem
              slug={mdx.frontmatter?.slug!}
              emoji="?"
              title="?"
              date={mdx.frontmatter?.date!}
              description={mdx.excerpt!}
              tags={["?"]}
            />
          )
        })}
      </PostWrapper>
    </Layout>
  )
}

export default Til

const PostWrapper = styled.ol`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
  list-style: none;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="블로그" />

export const pageQuery = graphql`
  query PostListPage {
    allFile(
      filter: { sourceInstanceName: { eq: "til" } }
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
            slug
          }
        }
      }
    }
  }
`
