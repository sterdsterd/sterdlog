import styled, { css } from "styled-components"
import SearchResult from "./search-result"

const Popover = css`
  max-height: 80vh;
  overflow-x: auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
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
`

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};
  ${Popover}

  .HitCount {
    display: flex;
    justify-content: flex-end;
  }

  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
    }

    li.ais-Hits-item {
      margin-bottom: 1em;

      a {
        color: ${({ theme }) => theme.foreground};

        h4 {
          margin-bottom: 0.2em;
        }
      }
    }
  }

  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    font-size: 80%;

    svg {
      width: 70px;
    }
  }
`
