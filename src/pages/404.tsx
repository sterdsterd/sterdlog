import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {
  data: Queries.NotFoundPageQuery
  location: Location
}

const NotFoundPage = ({ data, location }: Props) => {
  const siteTitle = data.site?.siteMetadata?.title

  return (
    <Layout isBlog={false}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
