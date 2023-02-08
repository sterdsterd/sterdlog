import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

type Props = {}

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
  const menu = ["메인", "블로그"]

  return (
    <Nav>
      <Link to="/">sterdlog</Link>
      <Menu>
        {menu.map(item => {
          return (
            <Link to={`/${item}`} key={item}>
              {item}
            </Link>
          )
        })}
      </Menu>
    </Nav>
  )
}

export default Header
