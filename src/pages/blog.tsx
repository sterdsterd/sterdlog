import * as React from "react"
import { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostListItem from "../components/PostListItem"
import Tags from "../components/Tags"
import TagSelector from "../components/TagSelector"

type Props = {
  data: Queries.PostListPageQuery
  location: Location
}

type Post = {
  readonly childMdx: {
    readonly excerpt: string | null
    readonly fields: {
      readonly slug: string | null
    } | null
    readonly frontmatter: {
      readonly date: string | null
      readonly title: string | null
      readonly description: string | null
      readonly emoji: string | null
      readonly tags: readonly (string | null)[] | null
    } | null
  } | null
}

const BlogIndex = ({ data, location }: Props) => {
  const posts = data.allFile.nodes.filter(post => post.childMdx)
  const [selectedTag, setSelectedTag] = useState<string>("모든 글")
  var tagsList: string[] = []
  var [filteredPostList, setFilteredPostList] = useState<Array<Post>>([])

  if (posts.length === 0) {
    return (
      <Layout isBlog={true}>
        <p>게시물이 없습니다.</p>
      </Layout>
    )
  }

  posts.forEach(post => {
    post.childMdx?.frontmatter?.tags?.forEach(it => {
      if (!tagsList.includes(it!)) tagsList.push(it!)
    })
  })

  posts.reduce

  tagsList.sort()

  useEffect(() => {
    setFilteredPostList([
      ...posts.filter(post =>
        selectedTag === "모든 글"
          ? post
          : post.childMdx?.frontmatter?.tags?.includes(selectedTag)
      ),
    ])

    return () => {
      setFilteredPostList([])
    }
  }, [selectedTag])

  return (
    <Layout isBlog={true}>
      <div style={{ paddingLeft: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>
          {selectedTag === "모든 글" ? selectedTag : `#${selectedTag}`}
        </h1>
        <p>총 {filteredPostList.length}개의 글이 있어요</p>
        <TagSelector
          tags={tagsList}
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
        />
      </div>
      <PostWrapper>
        {filteredPostList.map(post => {
          var mdx = post.childMdx!

          return (
            <PostListItem
              slug={mdx.fields?.slug!}
              emoji={mdx.frontmatter?.emoji!}
              title={mdx.frontmatter?.title!}
              date={mdx.frontmatter?.date!}
              description={mdx.frontmatter?.description || mdx.excerpt!}
              tags={mdx.frontmatter?.tags!}
            />
          )
        })}
      </PostWrapper>
    </Layout>
  )
}

export default BlogIndex

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
export const Head = () => <Seo title="모든 포스트" />

export const pageQuery = graphql`
  query PostListPage {
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
            description
            emoji
            tags
          }
        }
      }
    }
  }
`
