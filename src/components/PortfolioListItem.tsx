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

const Button = styled.button`
  border-radius: 10px;
  border: none;
  background-color: transparent;
  transition: all 0.2s;
  padding: 0.8rem 0.9rem;
  margin-right: -0.625rem;
  margin-bottom: -0.5rem;
  font-weight: 700;
  color: #2563e1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

type Props = {
  slug: string
  title: string
  date: string
  thumbnail: {
    readonly childImageSharp: {
      readonly gatsbyImageData: IGatsbyImageData
    } | null
  }
  tags: readonly (string | null)[]
  description: string
}

const PortfolioListItem = (props: Props) => {
  var [isModalVisible, setModalVisible] = useState<boolean>(false)

  return (
    <Card key={props.slug}>
      <span>{props.date}</span>
      <ProjectTitle>{props.title}</ProjectTitle>
      <GatsbyImage
        image={getImage(props.thumbnail as ImageDataLike) as IGatsbyImageData}
        alt={`${props.title} 프리뷰 이미지`}
        style={{
          backgroundSize: "cover",
          width: "calc(100% + 3.5rem)",
          height: "100%",
          margin: "1.5rem -1.75rem",
        }}
      />
      <Tags tags={props.tags} />
      <ProjectDescription>{props.description}</ProjectDescription>
      <div style={{ marginLeft: "auto", marginRight: "0" }}>
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
