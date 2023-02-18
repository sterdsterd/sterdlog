import React, { Dispatch, SetStateAction } from "react"
import fs from "node:fs/promises"
import { compile } from "@mdx-js/mdx"
import styled from "styled-components"
import { IconButton } from "./NavigationBar/style"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

type Props = {
  data: Queries.PortfolioQuery
  location: Location
  visible: boolean
  children?: JSX.Element
  setVisible: Dispatch<SetStateAction<boolean>>
}

const Title = styled.h1`
  margin-top: 1rem;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
`

const ArticleInfo = styled.div`
  margin: 1rem 0;
  color: #777;
  font-size: 0.9rem;
  text-align: center;
`

const PortfolioContent = (props: Props) => {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column" }}>
        <Title>{props.data.mdx?.frontmatter?.title}</Title>
        <ArticleInfo>{props.data.mdx?.frontmatter?.date}</ArticleInfo>
      </header>
      <div
        style={{
          wordBreak: "break-all",

          padding: "0 2rem",
        }}
      >
        <MDXProvider>
          <article itemScope itemType="http://schema.org/Article">
            <section itemProp="articleBody">{props.children}</section>
          </article>
        </MDXProvider>
      </div>
    </>
  )
}

export default PortfolioContent

export const pageQuery = graphql`
  query Portfolio($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "YYYY년 M월")
        description
        tags
      }
    }
  }
`
