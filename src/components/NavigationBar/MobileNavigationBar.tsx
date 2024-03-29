import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { MenuType, searchIndices } from "./header"
import {
  MobileNav,
  Logo,
  IconButton,
  MobileMenu,
  MobileSearch,
  MobileMenuItem,
} from "./style"
import SterdLogoSVG from "../logoSVG"
import Search from "../Search/Search"
import styled from "styled-components"

type Props = { menus: Array<MenuType> }

const MobileNavigationBar = (props: Props) => {
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
  const [isSearchVisible, setSearchVisible] = useState<boolean>(false)

  return (
    <>
      <MobileNav style={{ flexDirection: "column" }}>
        <div
          style={{
            minHeight: "60px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              setSearchVisible(false)
              setMenuVisible(!isMenuVisible)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M150 831.827q-16.707 0-28.158-11.502-11.451-11.501-11.451-28.283 0-16.781 11.451-28.107T150 752.609h660q16.707 0 28.158 11.501 11.451 11.502 11.451 28.283t-11.451 28.108Q826.707 831.827 810 831.827H150Zm0-216.218q-16.707 0-28.158-11.501-11.451-11.502-11.451-28.283 0-16.782 11.451-28.108T150 536.391h660q16.707 0 28.158 11.501 11.451 11.502 11.451 28.283 0 16.782-11.451 28.108T810 615.609H150Zm0-216.218q-16.707 0-28.158-11.501-11.451-11.502-11.451-28.283t11.451-28.39q11.451-11.609 28.158-11.609h660q16.707 0 28.158 11.784t11.451 28.566q0 16.781-11.451 28.107T810 399.391H150Z" />
            </svg>
          </IconButton>
          <Link to="/">
            <Logo>
              <SterdLogoSVG isMobile={true} />
            </Logo>
          </Link>
          <IconButton
            onClick={() => {
              setMenuVisible(false)
              setSearchVisible(!isSearchVisible)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M766.652 922.044 529.043 685.001q-29.434 24.26-69.111 37.934-39.676 13.674-85.323 13.674-112.119 0-189.864-77.826Q106.999 580.957 106.999 471t77.827-187.783q77.826-77.826 188.283-77.826 110.456 0 187.782 77.826 77.327 77.826 77.327 187.933 0 43.98-13.152 83.133-13.153 39.152-39.457 73.587l239.609 237.608q11.826 11.833 11.826 28.069 0 16.236-12.739 28.41-12.077 12.478-29.174 12.478t-28.479-12.391ZM373.808 657.391q77.659 0 131.425-54.533Q558.999 548.326 558.999 471q0-77.326-53.849-131.858-53.849-54.533-131.342-54.533-78.326 0-132.958 54.533Q186.218 393.674 186.218 471q0 77.326 54.549 131.858 54.549 54.533 133.041 54.533Z" />
            </svg>
          </IconButton>
        </div>
        <MobileMenu
          style={{
            height: isMenuVisible
              ? `calc(40px * ${props.menus.length} + 0.75rem)`
              : "0",
          }}
        >
          {props.menus.map((item: MenuType) => {
            return (
              <Link
                to={`/${item.link}`}
                key={item.link}
                activeClassName="activated-menu"
              >
                <MobileMenuItem>{item.title}</MobileMenuItem>
              </Link>
            )
          })}
        </MobileMenu>
        <MobileSearch
          style={{
            height: isSearchVisible ? `calc(100vh - 61px)` : "0",
          }}
        >
          <Search indices={searchIndices} />
        </MobileSearch>
      </MobileNav>
    </>
  )
}

export default MobileNavigationBar
