import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"
import styled from "styled-components"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">검색 결과 {hitCount}개</div>
  ) : null
})

const Item = styled.div`
  transition: all 0.2s;
  border-radius: 1rem;
  padding: 1.5rem;
  &:hover {
    background-color: #f1f1f1;
  }
`

const PageHit = ({ hit }) => (
  <Item>
    <Link to={hit.slug}>
      <h4 style={{ marginTop: "0" }}>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </Item>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
)

export default SearchResult
