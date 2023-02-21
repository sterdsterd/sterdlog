import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Giscus from "@giscus/react"
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

type Props = {
  data: Queries.BlogPostBySlugQuery
  location: Location
  children: JSX.Element
}

const BlogPostTemplate = ({
  data: { previous, next, site, mdx: post },
  location,
  children,
}: Props) => {
  const siteTitle = site?.siteMetadata?.title || `Title`

  return (
    <Layout isBlog={true}>
      <MDXProvider>
        <Post itemScope itemType="http://schema.org/Article">
          <header>
            <Title itemProp="headline">{post?.frontmatter?.title}</Title>
            <ArticleInfo>{post?.frontmatter?.date}</ArticleInfo>
          </header>
          <section itemProp="articleBody">{children}</section>
          <hr />
          <footer>
            <Giscus
              id="comments"
              repo="sterdsterd/sterdlog-comments"
              repoId="R_kgDOJAqVVw"
              category="Comments"
              categoryId="DIC_kwDOJAqVV84CUWzM"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="preferred_color_scheme"
              lang="ko"
              loading="lazy"
            />
          </footer>
        </Post>
      </MDXProvider>
      <Nav>
        {previous ? (
          <Link to={previous.fields?.slug!} rel="prev">
            <NavItem>
              <NavItemSubtitle>이전 글</NavItemSubtitle>
              <NavItemTitle>← {previous.frontmatter?.title}</NavItemTitle>
            </NavItem>
          </Link>
        ) : (
          <div></div>
        )}
        {next && (
          <Link to={next.fields?.slug!} rel="next">
            <NavItem style={{ textAlign: "right" }}>
              <NavItemSubtitle>다음 글</NavItemSubtitle>
              <NavItemTitle>{next.frontmatter?.title} →</NavItemTitle>
            </NavItem>
          </Link>
        )}
      </Nav>
    </Layout>
  )
}

export const Head = ({
  data: { mdx: post },
}: {
  data: Queries.BlogPostBySlugQuery
}) => {
  return (
    <Seo
      title={post?.frontmatter?.title!}
      description={post?.frontmatter?.description! || post?.excerpt!}
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
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "YYYY년 M월 D일")
        description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
