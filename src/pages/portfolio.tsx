import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PortfolioModal from "../components/PortfolioModal"

type Props = {
  data: Queries.PortfolioListQuery
  location: Location
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Card = styled.div`
  background-color: #fff;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  color: black;
  transition: all 200ms;
  height: 100%;
  width: 100%;
  padding: 1.625rem 1.75rem;
  flex-direction: column;
`

const ProjectTitle = styled.h2`
  margin-top: 0.3rem;
  margin-bottom: 0;
`

const ProjectDescription = styled.p`
  margin: 0;
`

const ChipContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
`

const Chip = styled.span`
  font-size: 0.9rem;
  background-color: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 0.4rem;
`

const Portfolio = ({ data, location }: Props) => {
  var items = data.allFile.nodes.filter(it => it.childMdx)
  console.log(items)

  return (
    <Layout isBlog={false}>
      <div style={{ paddingLeft: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>포트폴리오</h1>
        <p>
          <a href="https://www.github.com/sterdsterd">Github</a>에서 더 많은
          프로젝트를 보실 수 있어요
        </p>
      </div>
      <CardContainer>
        {items.map(item => {
          var mdx = item.childMdx!
          var [isModalVisible, setModalVisible] = useState<boolean>(false)

          return (
            <Card key={mdx.fields?.slug}>
              <span>{mdx.frontmatter?.date}</span>
              <ProjectTitle>{mdx.frontmatter?.title}</ProjectTitle>
              <GatsbyImage
                image={getImage(mdx.frontmatter?.thumbnail)}
                alt="a"
                style={{
                  backgroundSize: "cover",
                  width: "calc(100% + 3.5rem)",
                  height: "100%",
                  margin: "1.5rem -1.75rem",
                }}
              />
              <ChipContainer>
                {mdx.frontmatter?.tags?.map(it => {
                  return <Chip key={it}>{it}</Chip>
                })}
              </ChipContainer>
              <ProjectDescription>
                {mdx.frontmatter?.description}
              </ProjectDescription>
              <div style={{ marginLeft: "auto", marginRight: "0" }}>
                <Button onClick={() => setModalVisible(true)}>
                  자세히 보기 →
                </Button>
              </div>
              <PortfolioModal
                visible={isModalVisible}
                setVisible={setModalVisible}
                header={mdx.frontmatter?.title!}
              >
                {mdx?.body}
              </PortfolioModal>
            </Card>
          )
        })}
      </CardContainer>
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
          }
        }
      }
    }
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  background-color: transparent;
  transition: all 0.2s;
  padding: 0.7rem 0.8rem;
  margin-right: -0.625rem;
  margin-bottom: -0.5rem;
  font-weight: 600;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`
