import algoliasearch from "algoliasearch/lite"
import React, { createRef, useState, useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import SearchBox from "./SearchBox"
import SearchResult from "./SearchResult"
import useClickOutside from "../../hooks/useClickOutside"

type Props = {}

export type IndexType = {
  name: string
  title: string
}

const Search = ({ indices }: { indices: IndexType[] }) => {
  const rootRef = createRef<HTMLElement>()
  const [query, setQuery] = useState<string>()
  const [isFocused, setFocused] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID!,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY!
      ),
    []
  )

  useClickOutside(rootRef, () => setFocused(false))

  return (
    <div ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocused(true)} isFocused={isFocused} />
        <SearchResult
          isVisible={(query && query.length > 0 && isFocused) as boolean}
          indices={indices}
        />
      </InstantSearch>
    </div>
  )
}

export default Search
