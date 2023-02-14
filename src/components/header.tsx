import React, { useEffect, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import SterdLogoSVG from "./logoSVG"

type Props = {
  isBlog: boolean
}

type MenuType = {
  title: string
  link: string
}

const NavContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 100;
  display: grid;
  background-color: rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
`

const Nav = styled.nav`
  width: 100%;
  max-width: 1140px;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  margin: 0 auto;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s all;
  &:hover {
    opacity: 0.75;
  }
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
`

const MenuItem = styled.div`
  color: black;
  padding: 4px 12px;
  transition: all 200ms;
  font-weight: 600;

  &:hover {
    color: #2563e1;
  }
`

const ScrollIndicator = styled.div`
  background-color: #2563e1;
  height: 1px;
  width: 0;
  left: 0;
  z-index: 80;
  box-shadow: 0px 1px 4px rgba(37, 99, 225, 0.2);
  margin-bottom: -1px;
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

  const [scrollPercent, setScrollPercent] = useState<number>(0)

  var body
  var html
  var documentHeight = 0

  const updateScrollIndicator = () => {
    const scroll =
      (window.pageYOffset / (documentHeight - window.innerHeight)) * 100
    if (scroll < 0) setScrollPercent(0)
    else if (scroll > 100) setScrollPercent(100)
    else setScrollPercent(scroll)
  }

  if (props.isBlog) {
    useEffect(() => {
      body = document.body
      html = document.documentElement
      documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      window.addEventListener("scroll", updateScrollIndicator)

      return () => {
        window.removeEventListener("scroll", updateScrollIndicator)
      }
    }, [])
  }

  return (
    <NavContainer>
      <Nav>
        <Link to="/">
          <Logo>
            <SterdLogoSVG isBlog={props.isBlog} />
          </Logo>
        </Link>
        <Menu>
          {menu.map((item: MenuType) => {
            return (
              <Link
                to={`/${item.link}`}
                key={item.link}
                activeClassName="activated-menu"
              >
                <MenuItem>{item.title}</MenuItem>
              </Link>
            )
          })}
        </Menu>
      </Nav>
      {props.isBlog ? (
        <ScrollIndicator style={{ width: `${scrollPercent}%` }} />
      ) : (
        ""
      )}
    </NavContainer>
  )
}

export default Header
