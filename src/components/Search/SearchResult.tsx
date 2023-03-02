import React from "react"
import { Link } from "gatsby"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"
import styled from "styled-components"

type IndexType = {
  name: string
  title: string
}

type Props = {
  isVisible: boolean
  indices: IndexType[]
}

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return (
    <div style={{ color: "#777" }}>
      {hitCount > 0 ? `검색 결과 ${hitCount}개` : `검색 결과가 없어요`}
    </div>
  )
})

const HitItemContainer = styled.div`
  transition: all 0.2s;
  border-radius: 1rem;
  padding: 1.5rem;
  &:hover {
    background-color: #f1f1f1;
  }
`

const HitItem = ({ hit }: { hit: any }) => (
  <Link to={hit.slug}>
    <HitItemContainer>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </HitItemContainer>
  </Link>
)

const StyledHits = styled(Hits)`
  ul {
    list-style: none;
    margin-left: 0;
  }

  li.ais-Hits-item {
    margin-bottom: 1em;

    a {
      color: ${({ theme }) => theme.foreground};

      h4 {
        margin-top: 0;
        margin-bottom: 0.2em;
      }
    }
  }
`

const HitsInIndex = ({ index }: { index: IndexType }) => (
  <Index indexName={index.name}>
    <HitCount />
    <StyledHits hitComponent={HitItem} />
  </Index>
)

const SearchResult = ({ isVisible, indices }: Props) => (
  <SearchResultContainer className="scrollbar" isVisible={isVisible}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </SearchResultContainer>
)

export default SearchResult

const SearchResultContainer = styled.div<{ isVisible: boolean }>`
  display: ${props => (props.isVisible ? `block` : `none`)};
  overflow-y: scroll;
  max-height: 80vh;
  position: absolute;
  z-index: 2;
  top: 100%;
  margin-top: 0.5em;
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 1rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background};
  transform: translateX(-16.7rem);

  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    font-size: 80%;

    svg {
      width: 70px;
    }
  }
`
