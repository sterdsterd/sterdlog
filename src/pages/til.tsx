import * as React from "react"
import { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostListItem from "../components/PostListItem"
import TableOfContents from "../components/TableOfContents"

type Props = {
  data: Queries.PostListPageQuery
  location: Location
}

const Til = ({ data, location }: Props) => {
  const posts = data.allFile.nodes.filter(post => post.childMdx)

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
        <h1 style={{ marginBottom: "0.5rem" }}>TIL</h1>
        <p>
          Under Construction
          <br />총 {posts.length}개의 글이 있어요
        </p>
      </div>

      <TableOfContents
        items={posts.map(post => {
          return {
            url: post.childMdx?.frontmatter?.slug!,
            title: post.childMdx?.frontmatter?.title!,
          }
        })}
      />
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
export const Head = () => <Seo title="TIL" />

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
