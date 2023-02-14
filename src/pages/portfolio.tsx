import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {}

const Card = styled.div`
  background-color: #fff;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.4rem;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  color: black;
  transition: all 200ms;
  height: 100%;
  width: 100%;
  padding: 2rem;
  flex-direction: column;

  /* &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  } */
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
  margin: 1rem 0;
`

const Chip = styled.span`
  font-size: 0.9rem;
  background-color: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 0.4rem;
`

const Portfolio = () => {
  return (
    <Layout isBlog={false}>
      <div style={{ paddingLeft: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>포트폴리오</h1>
        <p>Lorem ipsum</p>
      </div>
      <Card>
        <span>2023년 2월</span>
        <ProjectTitle>개발 블로그</ProjectTitle>
        <StaticImage
          formats={["auto", "webp", "avif"]}
          src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
          quality={100}
          alt="Profile picture"
          style={{
            backgroundSize: "cover",
            width: "100%",
            margin: "1rem 0",
            borderRadius: "1rem",
          }}
        />
        <ChipContainer>
          <Chip>Gatsby</Chip>
          <Chip>React</Chip>
          <Chip>Typescript</Chip>
        </ChipContainer>
        <ProjectDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In
          pellentesque massa placerat duis. Ridiculus mus mauris vitae ultricies
          leo integer.
        </ProjectDescription>
      </Card>
    </Layout>
  )
}

export default Portfolio
export const Head = () => <Seo title="포트폴리오" />
