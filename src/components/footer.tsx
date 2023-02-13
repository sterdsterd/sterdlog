import React from "react"
import styled from "styled-components"

const FooterContainer = styled.footer`
  border-radius: 1rem;
  font-size: 0.875rem;
  background-color: #fafafa;
  padding: 1.5rem;
  margin-top: 2.5rem;
  text-align: center;
`

const Footer = () => {
  return (
    <FooterContainer>
      © {new Date().getFullYear()} Yulwon Rhee, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </FooterContainer>
  )
}

export default Footer
