import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "./header"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
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
      <Header title={data.site.siteMetadata.title} />
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
