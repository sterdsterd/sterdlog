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

  @media screen and (max-width: 728px) {
    min-width: unset;
    width: 100%;
  }
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
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.4rem;
  height: 100%;

  &:hover {
    background-color: #eee;
  }
`

const NavItemSubtitle = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.15);
  font-weight: 500;
`

const NavItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

export {
  PostContainer,
  Post,
  Title,
  ArticleInfo,
  Nav,
  NavItem,
  NavItemSubtitle,
  NavItemTitle,
}
