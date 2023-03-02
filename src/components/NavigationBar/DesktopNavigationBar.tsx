import React from "react"
import { Link } from "gatsby"
import { MenuType } from "./header"
import { DesktopNav, Logo, DesktopMenu, DesktopMenuItem } from "./style"
import SterdLogoSVG from "../logoSVG"
import Search from "../Search"

const searchIndices = [{ name: "Pages", title: "Pages" }]

type Props = { menus: Array<MenuType>; isBlog: boolean }

const DesktopNavigationBar = (props: Props) => {
  return (
    <DesktopNav>
      <Link to="/">
        <Logo>
          <SterdLogoSVG isBlog={props.isBlog} />
        </Logo>
      </Link>
      <DesktopMenu>
        {props.menus.map((item: MenuType) => {
          return (
            <Link
              to={`/${item.link}`}
              key={item.link}
              activeClassName="activated-menu"
            >
              <DesktopMenuItem>{item.title}</DesktopMenuItem>
            </Link>
          )
        })}
        <Search indices={searchIndices} />
      </DesktopMenu>
    </DesktopNav>
  )
}

export default DesktopNavigationBar
