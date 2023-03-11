import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Nav = styled.nav`
  display: grid;
  grid-gap: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 3rem;
`

const NavItem = styled.div`
  padding: 16px;
  background-color: var(--card-bg-light);
  border: 1px solid var(--border-light);
  border-radius: 0.4rem;
  height: 100%;
  transition: all 0.2s;

  @media (prefers-color-scheme: dark) {
    background-color: var(--card-bg-dark);
    border: 1px solid var(--border-dark);
  }

  &:hover {
    background-color: var(--tag-selected-light);
    @media (prefers-color-scheme: dark) {
      background-color: var(--tag-selected-dark);
    }
  }
`

const NavItemSubtitle = styled.div`
  font-size: 0.8rem;
  color: var(--border-light);
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    color: var(--border-dark);
  }
`

const NavItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

type PostInfo = {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

type Props = {
  previous: PostInfo
  next: PostInfo
}

const Paginator = ({ previous, next }: Props) => {
  return (
    <Nav>
      {previous ? (
        <Link to={previous.fields?.slug!} rel="prev">
          <NavItem>
            <NavItemSubtitle>이전 글</NavItemSubtitle>
            <NavItemTitle>← {previous.frontmatter?.title}</NavItemTitle>
          </NavItem>
        </Link>
      ) : (
        <div></div>
      )}
      {next && (
        <Link to={next.fields?.slug!} rel="next">
          <NavItem style={{ textAlign: "right" }}>
            <NavItemSubtitle>다음 글</NavItemSubtitle>
            <NavItemTitle>{next.frontmatter?.title} →</NavItemTitle>
          </NavItem>
        </Link>
      )}
    </Nav>
  )
}

export default Paginator
