import React, { useEffect, useState, useRef } from "react"
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
  const refAngle = useRef<number>(-0.4)
  const [angle, setAngle] = useState<number>(-0.4)
  // const [fps, setFps] = useState<string>("")
  // const FPS = 1000 / 60
  var then: number
  var startTime: number
  var frameCount: number = 0

  const animate = () => {
    if (refAngle.current > 1) return

    var now: number = performance.now()
    // var elapsed: number = now - then

    // if (elapsed > FPS) {
    // then = new Date(now.getTime() - (elapsed % FPS))
    // then = now - (elapsed % FPS)

    var sinceStart = now - startTime
    var currentFps =
      Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100

    refAngle.current += 1.25 / currentFps
    setAngle(refAngle.current)

    // setFps(
    //   "Elapsed time: " +
    //     Math.round((sinceStart / 1000) * 100) / 100 +
    //     " secs<br />@ " +
    //     currentFps +
    //     " fps<br />angle: " +
    //     refAngle.current +
    //     "<br />"
    // )
    // }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    then = performance.now()
    startTime = then
    console.log(startTime)
    var animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      <Header isBlog={false} />
      <MainContainer>
        {/* <h1
          style={{ fontFamily: "monospace", fontSize: "0.5rem" }}
          dangerouslySetInnerHTML={{ __html: fps }}
        /> */}
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
          <p style={{ marginBottom: "0" }}>안녕하세요, 반갑습니다!</p>
          <h1
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            🌏세상을 움직이는 개발자
            <br />
            <b>이율원</b>입니다
          </h1>
          <h2>학력</h2>
          <p>
            <LinkText href="https://cse.konkuk.ac.kr/">
              건국대학교 컴퓨터공학부
            </LinkText>{" "}
            22학번 재학
            <DateText>, 2022년 3월 - 현재</DateText>
          </p>
          <h2>수상 경력</h2>
          <p>
            2019년 삼성 주니어 소프트웨어 창작대회 고등부 최우수상 수상
            <DateText>, 2019년 11월</DateText>
            <br />
            2017년 앤어워드 디지털 창의 학생 공모전 우수상 수상
            <DateText>, 2018년 1월</DateText>
          </p>
          <h2>주요 프로젝트</h2>
          <p>
            통학 차량 탑승 학생 자동 출석 체크 솔루션 개발
            <DateText>, 2019년 7월</DateText>
            <br />웹 기반 키오스크 솔루션 개발<DateText>, 2019년 5월</DateText>
            <br />
            암호화폐 모의 투자 안드로이드 어플리케이션 개발
            <DateText>, 2017년 11월</DateText>
            <br />
            <Link to={`/portfolio`}>
              <Button>더 다양한 프로젝트 구경하기 →</Button>
            </Link>
          </p>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Blog

export const Head = () => <Seo title="메인" />
