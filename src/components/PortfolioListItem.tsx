import React, { useState } from "react"
import styled from "styled-components"
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image"
import Tags from "./Tags"
import PortfolioModal from "../components/Portfolio/PortfolioModal"

const Card = styled.div`
  background-color: var(--card-bg-light);
  display: flex;
  border: 1px solid var(--border-light);
  border-radius: 1rem;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  color: var(--text-light);
  transition: all 200ms;
  height: 100%;
  width: 100%;
  padding: 1.625rem 1.75rem;
  flex-direction: column;
  @media (prefers-color-scheme: dark) {
    color: var(--text-dark);
    background-color: var(--card-bg-dark);
    border: 1px solid var(--border-dark);
  }
`

const ProjectDate = styled.span`
  color: #777;
`

const ProjectTitle = styled.h2`
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`

const ProjectDescription = styled.p`
  margin: 0;
  margin-bottom: 1rem;
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  background-color: transparent;
  transition: all 0.2s;
  padding: 0.8rem 0.9rem;
  margin-left: 1rem;
  margin-right: -0.25rem;
  font-weight: 700;
  color: #2563e1;
  flex-shrink: 0;

  &:hover {
    background-color: var(--hover-shade-light);
    @media (prefers-color-scheme: dark) {
      background-color: var(--hover-shade-dark);
    }
  }
`

type Props = {
  slug: string
  title: string
  date: string
  thumbnail?: {
    readonly childImageSharp: {
      readonly gatsbyImageData: IGatsbyImageData
    } | null
  }
  tags: readonly (string | null)[]
  description: string
  featuredVideo?: string
}

const PortfolioListItem = (props: Props) => {
  var [isModalVisible, setModalVisible] = useState<boolean>(false)

  return (
    <Card key={props.slug}>
      <ProjectDate>{props.date}</ProjectDate>
      <ProjectTitle>{props.title}</ProjectTitle>
      <ProjectDescription>{props.description}</ProjectDescription>

      {props.thumbnail && (
        <GatsbyImage
          image={getImage(props.thumbnail as ImageDataLike) as IGatsbyImageData}
          alt={`${props.title} 프리뷰 이미지`}
          style={{
            backgroundSize: "cover",
            width: "calc(100% + 3.5rem)",
            height: "100%",
            margin: "1.5rem -1.75rem",
            marginTop: "0",
          }}
        />
      )}

      {props.featuredVideo && (
        <iframe
          src={props.featuredVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            width: "calc(100% + 3.5rem)",
            aspectRatio: "16 / 9",
            margin: "1.5rem -1.75rem",
            marginTop: "0",
            border: "0",
          }}
        ></iframe>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          margin: "-0.5rem -0.375rem",
        }}
      >
        <Tags tags={props.tags} isHashVisible={false} />
        <Button onClick={() => setModalVisible(true)}>자세히 보기 →</Button>
      </div>
      <PortfolioModal
        isVisible={isModalVisible}
        setVisible={setModalVisible}
        slug={props.slug}
      />
    </Card>
  )
}

export default PortfolioListItem
