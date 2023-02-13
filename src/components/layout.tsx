import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "./header"
import Footer from "./footer"

type Props = {
  children: React.ReactNode
  isBlog: boolean
}

const Layout = ({ children, isBlog }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Header isBlog={isBlog} />
      <div className="global-wrapper">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
