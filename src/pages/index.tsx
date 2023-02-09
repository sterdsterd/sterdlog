import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {}

const Blog = () => {
  return (
    <Layout isBlog={false}>
      <p>웹사이트 메인.</p>
    </Layout>
  )
}

export default Blog

export const Head = () => <Seo title="메인" />
