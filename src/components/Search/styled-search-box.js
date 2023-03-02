import styled, { css } from "styled-components"
import SearchBox from "./search-box"

const open = css`
  width: 13.75rem;
  background: ${({ theme }) => theme.background};
  cursor: text;
  margin-left: -2rem;
  padding-left: 2.25rem;
`

const closed = css`
  width: 0;
  background: transparent;
  cursor: pointer;
  margin-left: -1em;
  padding-left: 1em;
`

export default styled(SearchBox)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;

  .SearchInput {
    outline: none;
    border: ${({ hasFocus }) =>
      hasFocus ? "1px solid rgba(0, 0, 0, 0.15)" : "none"};
    font-size: 1rem;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    border-radius: 1rem;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => (hasFocus ? open : closed)}
  }

  .SearchIcon {
    width: 1em;
    margin: 0.3em;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`
