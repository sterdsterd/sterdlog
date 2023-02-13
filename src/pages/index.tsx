import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import Header from "../components/header"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Props = {}

const scaleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(15);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const MainContainer = styled.div`
  height: 100vh;
  margin-top: -60px;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const LogoContainer = styled.div`
  position: relative;
  width: 10rem;
  height: calc(10rem * 1.25);
  animation: ${scaleAnimation} 1s cubic-bezier(0.16, 1, 0.3, 1);
`

const Upper = styled.div`
  position: absolute;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 auto;
`

const Lower = styled.div`
  position: absolute;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 auto;
`

const Blog = () => {
  const [angle, setAngle] = useState<number>(-0.4)

  const linearToEase = (n: number) => {
    if (n < 0) return 0
    else if (n > 1) return 1
    else return (n * n) / (2 * (n * n - n) + 1)
  }

  useEffect(() => {
    const c = setInterval(() => {
      if (1 >= angle) setAngle(angle + 0.0025)
    }, 1)

    return () => {
      console.log("angle dismounted")
      clearInterval(c)
    }
  }, [angle])

  return (
    <>
      <Header isBlog={false} />
      <MainContainer>
        <LogoContainer>
          <Upper
            style={{
              background: `conic-gradient(
            from ${90 - linearToEase(angle * 1.2) * 45}deg,
            rgba(0, 0, 0, 0) 150deg,
            rgba(0, 0, 0, 1) ${180 + linearToEase(angle * 1.2) * 120}deg
          )`,
              top: `${1.25 - 1.25 * linearToEase(angle)}rem`,
            }}
          />
          <Lower
            style={{
              background: `conic-gradient(
              from ${270 - linearToEase(angle * 1.2) * 45}deg,
              rgba(0, 0, 0, 0) 150deg,
              rgba(0, 0, 0, 1) ${180 + linearToEase(angle * 1.2) * 120}deg
          )`,
              top: `${1.25 + 1.25 * linearToEase(angle)}rem`,
            }}
          />
        </LogoContainer>
      </MainContainer>
    </>
  )
}

export default Blog

export const Head = () => <Seo title="메인" />
