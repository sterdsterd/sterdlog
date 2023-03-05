import React from "react"
import styled from "styled-components"

type Props = {
  tags: string[]
  selectedTag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>
}

export const Tag = styled.span<{ isSelected: boolean }>`
  font-size: 1rem;
  background-color: ${props => (props.isSelected ? "#f1f1f1" : "#fafafa")};
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  flex-basis: auto;
  align-items: center;
  gap: 0.8rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 0;
  }
`

const TagSelector = (props: Props) => {
  return (
    <TagContainer>
      <Tag
        onClick={() => props.setSelectedTag("모든 글")}
        isSelected={"모든 글" === props.selectedTag}
      >
        모든 글
      </Tag>
      {props.tags.map(it => {
        return (
          <Tag
            key={it}
            onClick={() => props.setSelectedTag(it)}
            isSelected={it === props.selectedTag}
          >
            #{it}
          </Tag>
        )
      })}
    </TagContainer>
  )
}

export default TagSelector
