import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {}

const Blog = () => {
  return (
    <Layout>
      <p>블로그 메인.</p>
    </Layout>
  )
}

export default Blog

export const Head = () => <Seo title="메인" />
