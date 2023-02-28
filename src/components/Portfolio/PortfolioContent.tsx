import React, { Dispatch, ReactNode, SetStateAction } from "react"
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
        style={{ verticalAlign: "baseline", marginBottom: "-0.1rem" }}
      >
        <path
          fill="#2563e1"
          d="M206.783 955.218q-44.305 0-75.153-30.848-30.848-30.848-30.848-75.153V302.783q0-44.305 30.848-75.153 30.848-30.848 75.153-30.848H480v106.001H206.783v546.434h546.434V576h106.001v273.217q0 44.305-30.848 75.153-30.848 30.848-75.153 30.848H206.783ZM405.523 724 332 650.477l347.694-347.694H560V196.782h299.218V496H753.217V376.306L405.523 724Z"
        />
      </svg>
    </a>
  )
}

const PortfolioContent = (props: Props) => {
  return (
    <>
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
