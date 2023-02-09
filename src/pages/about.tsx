import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {}

const About = () => {
  return (
    <Layout isBlog={false}>
      <p>AboutAbout.</p>
    </Layout>
  )
}

export default About
export const Head = () => <Seo title="주인장 정보" />
