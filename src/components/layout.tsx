import * as React from "react"
import { Link } from "gatsby"
import Header from "./header"

type Props = {
  location: Location
  title: string
  children: React.ReactNode
}

const Layout = ({ location, title, children }: Props) => {
  return (
    <>
      <Header />
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
