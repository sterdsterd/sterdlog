import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import TableOfContents from "../components/TableOfContents"
import Giscus from "@giscus/react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { PostContainer, Post, Header, Title, ArticleInfo } from "./styles"
import Tags from "../components/Tags"
import Paginator from "../components/Paginator"

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
        <article itemScope itemType="http://schema.org/Article">
          <Header>
            <Title itemProp="headline">{post?.frontmatter?.title}</Title>
            <ArticleInfo>{post?.frontmatter?.date}</ArticleInfo>
            <Tags tags={post?.frontmatter?.tags!} isHashVisible={true} />
          </Header>
          <PostContainer>
            <>
              <Post itemProp="articleBody">{children}</Post>
              {post?.tableOfContents?.items && (
                <TableOfContents items={post?.tableOfContents.items} />
              )}
            </>
          </PostContainer>
          <hr />
          <footer>
            <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              태그:{" "}
              <Tags tags={post?.frontmatter?.tags!} isHashVisible={true} />
            </p>
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
          <Paginator previous={previous} next={next} />
        </article>
      </MDXProvider>
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
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY년 M월 D일")
        description
        tags
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
