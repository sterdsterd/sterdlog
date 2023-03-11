import styled from "styled-components"

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const Post = styled.section`
  max-width: 728px;
  @media screen and (min-width: 88rem) {
    min-width: 728px;
  }

  @media screen and (max-width: 768px) {
    min-width: unset;
    width: 100%;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
`

const ArticleInfo = styled.div`
  margin: 16px 0;
  color: #777;
  font-size: 0.9rem;
  text-align: center;
`

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

export {
  PostContainer,
  Post,
  Header,
  Title,
  ArticleInfo,
  Nav,
  NavItem,
  NavItemSubtitle,
  NavItemTitle,
}
