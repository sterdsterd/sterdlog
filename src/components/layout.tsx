import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "./header"

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
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
