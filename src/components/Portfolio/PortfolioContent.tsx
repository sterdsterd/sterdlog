import React, { Dispatch, useEffect, SetStateAction } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Tags from "../Tags"

type Props = {
  data: Queries.PortfolioQuery
  location: Location
  visible: boolean
  children?: JSX.Element
  setVisible: Dispatch<SetStateAction<boolean>>
}

const Container = styled.div`
  padding-bottom: 1rem;
  background-color: var(--card-bg-light);

  @media (prefers-color-scheme: dark) {
    background-color: var(--card-bg-dark);
  }
`

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

const IFrameLink = props => {
  return (
    <a {...props} target="_parent">
      {props.children}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1rem"
        viewBox="0 96 960 960"
        width="1rem"
      >
        <path
          fill="#2563e1"
          d="M185.087 950.131q-32.507 0-55.862-23.356-23.356-23.355-23.356-55.862V281.087q0-32.74 23.356-56.262 23.355-23.521 55.862-23.521H459v79.783H185.087v589.826h589.826V597h79.783v273.913q0 32.507-23.521 55.862-23.522 23.356-56.262 23.356H185.087ZM395.001 717 340 660.999l379.912-379.912H519v-79.783h335.696V537h-79.783V337.088L395.001 717Z"
        />
      </svg>
    </a>
  )
}

const PortfolioContent = (props: Props) => {
  return (
    <Container>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>{props.data.mdx?.frontmatter?.title}</Title>
        <Tags tags={props.data.mdx?.frontmatter?.tags!} />
        <ArticleInfo>{props.data.mdx?.frontmatter?.date}</ArticleInfo>
      </header>
      <div
        style={{
          padding: "0 2rem",
        }}
      >
        <MDXProvider
          components={{
            a: IFrameLink,
          }}
        >
          <article itemScope itemType="http://schema.org/Article">
            <section itemProp="articleBody">{props.children}</section>
          </article>
        </MDXProvider>
      </div>
    </Container>
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
