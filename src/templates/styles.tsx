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

export { PostContainer, Post, Header, Title, ArticleInfo }
