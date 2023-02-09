import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

type Props = {
  title: string
}

type MenuType = {
  title: string
  link: string
}

const Nav = styled.nav`
  background-color: rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;

  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Header = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menu {
            title
            link
          }
        }
      }
    }
  `)

  const menu: Array<MenuType> = data.site.siteMetadata.menu

  return (
    <Nav>
      <Link to="/">{props.title}</Link>
      <Menu>
        {menu.map((item: MenuType) => {
          return (
            <Link to={`/${item.link}`} key={item.link}>
              {item.title}
            </Link>
          )
        })}
      </Menu>
    </Nav>
  )
}

export default Header
