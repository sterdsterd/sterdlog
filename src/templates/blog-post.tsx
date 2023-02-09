import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  Post,
  Title,
  ArticleInfo,
  Nav,
  NavItem,
  NavItemSubtitle,
  NavItemTitle,
} from "./styles"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout isBlog={true}>
      <Post itemScope itemType="http://schema.org/Article">
        <header>
          <Title itemProp="headline">{post.frontmatter.title}</Title>
          <ArticleInfo>{post.frontmatter.date}</ArticleInfo>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </Post>
      <Nav>
        {previous ? (
          <Link to={previous.fields.slug} rel="prev">
            <NavItem>
              <NavItemSubtitle>이전 글</NavItemSubtitle>
              <NavItemTitle>← {previous.frontmatter.title}</NavItemTitle>
            </NavItem>
          </Link>
        ) : (
          <div></div>
        )}
        {next && (
          <Link to={next.fields.slug} rel="next">
            <NavItem style={{ textAlign: "right" }}>
              <NavItemSubtitle>다음 글</NavItemSubtitle>
              <NavItemTitle>{next.frontmatter.title} →</NavItemTitle>
            </NavItem>
          </Link>
        )}
      </Nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
