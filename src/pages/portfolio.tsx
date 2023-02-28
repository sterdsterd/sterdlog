import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PortfolioListItem from "../components/PortfolioListItem"

type Props = {
  data: Queries.PortfolioListQuery
  location: Location
}

const PortfolioListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Portfolio = ({ data, location }: Props) => {
  var items = data.allFile.nodes.filter(it => it.childMdx)

  return (
    <Layout isBlog={false}>
      <div style={{ paddingLeft: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>포트폴리오</h1>
        <p>
          <a href="https://www.github.com/sterdsterd">Github</a>에서 더 많은
          프로젝트를 보실 수 있어요
        </p>
      </div>
      <PortfolioListContainer>
        {items.map(item => {
          var mdx = item.childMdx!
          return (
            <PortfolioListItem
              slug={mdx.fields?.slug!}
              title={mdx.frontmatter?.title!}
              date={mdx.frontmatter?.date!}
              thumbnail={mdx.frontmatter?.thumbnail!}
              tags={mdx.frontmatter?.tags!}
              description={mdx.frontmatter?.description!}
              featuredVideo={mdx.frontmatter?.featuredVideo!}
            />
          )
        })}
      </PortfolioListContainer>
    </Layout>
  )
}

export default Portfolio
export const Head = () => <Seo title="포트폴리오" />

export const pageQuery = graphql`
  query PortfolioList {
    allFile(
      filter: { sourceInstanceName: { eq: "portfolio" } }
      sort: { childrenMdx: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMdx {
          internal {
            contentFilePath
          }
          excerpt
          body
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY년 M월")
            title
            tags
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            featuredVideo
          }
        }
      }
    }
  }
`
