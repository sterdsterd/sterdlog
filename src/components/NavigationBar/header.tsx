import React, { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { graphql, useStaticQuery } from "gatsby"
import DesktopNavigationBar from "./DesktopNavigationBar"
import { NavContainer, ScrollIndicator } from "./style"
import MobileNavigationBar from "./MobileNavigationBar"

type Props = {
  isBlog: boolean
}

export type MenuType = {
  title: string
  link: string
}

export const searchIndices = [{ name: "Pages", title: "Pages" }]

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

  const menus: Array<MenuType> = data.site.siteMetadata.menu

  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  })

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
      {isMobile ? (
        <MobileNavigationBar menus={menus} />
      ) : (
        <DesktopNavigationBar menus={menus} isBlog={props.isBlog} />
      )}
      {props.isBlog ? (
        <ScrollIndicator style={{ width: `${scrollPercent}%` }} />
      ) : (
        ""
      )}
    </NavContainer>
  )
}

export default Header
