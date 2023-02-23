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
  gap: 0.8rem;
  margin-bottom: 1rem;
`

type Props = {
  tags: readonly (string | null)[]
}

const Tags = (props: Props) => {
  return (
    <TagContainer>
      {props.tags.map(it => {
        return <Tag key={it}>{it}</Tag>
      })}
    </TagContainer>
  )
}

export default Tags
