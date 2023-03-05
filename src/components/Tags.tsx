import React from "react"
import styled from "styled-components"

export const Tag = styled.span`
  font-size: 0.9rem;
  background-color: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 0.4rem;
`

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  gap: 0.8rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 0;
  }
`

type Props = {
  tags: readonly (string | null)[]
  isHashVisible: boolean
}

const Tags = (props: Props) => {
  return (
    <TagContainer>
      {props.tags.map(it => {
        return (
          <Tag key={it}>
            {props.isHashVisible ? "#" : ""}
            {it}
          </Tag>
        )
      })}
    </TagContainer>
  )
}

export default Tags
