import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import Header from "../components/NavigationBar/header"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"
import { Link } from "gatsby"

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

const arrowAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0%;
  }
  70% {
    transform: translateY(1.5rem);
    opacity: 100%;
  }
  100% {
    transform: translateY(1.5rem);
    opacity: 0%;
  }
`

const IconContainer = styled.div`
  position: absolute;
  bottom: 10%;
  animation: ${arrowAnimation} 2s cubic-bezier(0.16, 1, 0.3, 1) infinite 1s;

  @media (prefers-color-scheme: dark) {
    svg {
      filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(308deg)
        brightness(106%) contrast(101%);
    }
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
  background: repeating-radial-gradient(
      circle at 50%,
      var(--gradient-darker-light) 0rem,
      var(--gradient-lighter-light) 12rem
    )
    fixed;
  background-attachment: scroll;

  @media (prefers-color-scheme: dark) {
    background: repeating-radial-gradient(
        circle at 50%,
        var(--gradient-darker-dark) 0rem,
        var(--gradient-lighter-dark) 12rem
      )
      fixed;
    background-attachment: scroll;
  }
`

const DateText = styled.span`
  color: #777;
`

const LinkText = styled.a`
  text-decoration: underline;
  color: var(--text-light);

  @media (prefers-color-scheme: dark) {
    color: var(--text-dark);
  }

  &:hover {
    text-decoration: underline;
  }
`

const LogoContainer = styled.div`
  position: relative;
  width: 10rem;
  height: calc(10rem * 1.25);
  animation: ${scaleAnimation} 1s cubic-bezier(0.16, 1, 0.3, 1);
`

const linearToEase = (n: number) => {
  if (n < 0) return 0
  else if (n > 1) return 1
  else return (n * n) / (2 * (n * n - n) + 1)
}

const Upper = styled.div<{ angle: number }>`
  position: absolute;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 auto;
  background: conic-gradient(
    from ${props => 90 - linearToEase(props.angle * 1.2) * 45}deg,
    rgba(0, 0, 0, 0) 150deg,
    rgba(0, 0, 0, 1) ${props => 180 + linearToEase(props.angle * 1.2) * 120}deg
  );
  top: ${props => 1.25 - 1.25 * linearToEase(props.angle)}rem;

  @media (prefers-color-scheme: dark) {
    background: conic-gradient(
      from ${props => 90 - linearToEase(props.angle * 1.2) * 45}deg,
      rgba(255, 255, 255, 0) 150deg,
      rgba(255, 255, 255, 1)
        ${props => 180 + linearToEase(props.angle * 1.2) * 120}deg
    );
  }
`

const Lower = styled.div<{ angle: number }>`
  position: absolute;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 auto;
  background: conic-gradient(
    from ${props => 270 - linearToEase(props.angle * 1.2) * 45}deg,
    rgba(0, 0, 0, 0) 150deg,
    rgba(0, 0, 0, 1) ${props => 180 + linearToEase(props.angle * 1.2) * 120}deg
  );

  top: ${props => 1.25 + 1.25 * linearToEase(props.angle)}rem;

  @media (prefers-color-scheme: dark) {
    background: conic-gradient(
      from ${props => 270 - linearToEase(props.angle * 1.2) * 45}deg,
      rgba(255, 255, 255, 0) 150deg,
      rgba(255, 255, 255, 1)
        ${props => 180 + linearToEase(props.angle * 1.2) * 120}deg
    );
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  background-color: transparent;
  transition: all 0.2s;
  padding: 0.8rem 0.9rem;
  font-weight: 700;
  color: #2563e1;
  flex-shrink: 0;
  margin-top: 1rem;
  margin-left: -0.5rem;
  &:hover {
    background-color: var(--hover-shade-light);
    @media (prefers-color-scheme: dark) {
      background-color: var(--hover-shade-dark);
    }
  }
`

const Blog = () => {
  const [angle, setAngle] = useState<number>(-0.4)

  useEffect(() => {
    const c = setInterval(() => {
      if (1 >= angle) setAngle(angle + 0.0025)
    }, 1)

    return () => {
      clearInterval(c)
    }
  }, [angle])

  return (
    <>
      <Header isBlog={false} />
      <MainContainer>
        <LogoContainer>
          <Upper angle={angle} />
          <Lower angle={angle} />
        </LogoContainer>
        <IconContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
          >
            <path d="M480 724.001 226.434 470.435 283 413.869l197 198 197-197 56.566 56.566L480 724.001Z" />
          </svg>
        </IconContainer>
      </MainContainer>
      <div className="global-wrapper">
        <div style={{ padding: "1rem" }}>
          <p style={{ marginBottom: "0" }}>???????????????, ???????????????!</p>
          <h1
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            ????????????? ???????????? ?????????
            <br />
            <b>?????????</b>?????????
          </h1>
          <h2>??????</h2>
          <p>
            <LinkText href="https://cse.konkuk.ac.kr/">
              ??????????????? ??????????????????
            </LinkText>{" "}
            22?????? ??????
            <DateText>, 2022??? 3??? - ??????</DateText>
          </p>
          <h2>?????? ??????</h2>
          <p>
            2019??? ?????? ????????? ??????????????? ???????????? ????????? ???????????? ??????
            <DateText>, 2019??? 11???</DateText>
            <br />
            2017??? ???????????? ????????? ?????? ?????? ????????? ????????? ??????
            <DateText>, 2018??? 1???</DateText>
          </p>
          <h2>?????? ????????????</h2>
          <p>
            ?????? ?????? ?????? ?????? ?????? ?????? ?????? ????????? ??????
            <DateText>, 2019??? 7???</DateText>
            <br />??? ?????? ???????????? ????????? ??????<DateText>, 2019??? 5???</DateText>
            <br />
            ???????????? ?????? ?????? ??????????????? ?????????????????? ??????
            <DateText>, 2017??? 11???</DateText>
            <br />
            <Link to={`/portfolio`}>
              <Button>??? ????????? ???????????? ???????????? ???</Button>
            </Link>
          </p>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Blog

export const Head = () => <Seo title="??????" />
