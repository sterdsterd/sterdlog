import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Tags from "./Tags"

const Tile = styled.div`
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

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-light);
    color: var(--text-light);
    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--border-dark);
      color: var(--text-dark);
    }
  }

  &:hover h2 {
    color: var(--color-primary);
    transition: all 200ms;
  }

  &:hover img {
    transform: scale(1.05);
    transition: all 200ms;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--text-dark);
    background-color: var(--card-bg-dark);
  }
`

const TileContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.625rem 1.75rem;

  @media screen and (max-width: 768px) {
    align-items: center;
    flex-direction: row;
  }
`

const TileTitle = styled.h2`
  font-size: 1.5rem;
  transition: all 200ms;
  margin: 0;
`

const TileDescription = styled.p`
  margin: 0;
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Emoji = styled.p`
  font-family: "Tossface";
  margin-top: -1rem;
  margin-bottom: 0;
  margin-left: -0.35rem;
  font-size: 4rem;

  @media screen and (max-width: 768px) {
    font-size: 3.5rem;
    margin-top: 0;
    margin-right: 1.2rem;
  }
`

type Props = {
  slug: string
  emoji: string
  title: string
  date: string
  description: string
  tags: readonly (string | null)[]
}

const PostListItem = (props: Props) => {
  return (
    <Link to={props.slug} itemProp="url" key={props.slug}>
      <Tile>
        <article itemScope itemType="http://schema.org/Article">
          <TileContents>
            <Emoji>{props.emoji}</Emoji>
            <div>
              <TileTitle itemProp="headline">{props.title}</TileTitle>
              <small>{props.date}</small>
              <TileDescription itemProp="description">
                {props.description}
              </TileDescription>
              <Tags tags={props.tags} isHashVisible={true} />
            </div>
          </TileContents>
        </article>
      </Tile>
    </Link>
  )
}

export default PostListItem
