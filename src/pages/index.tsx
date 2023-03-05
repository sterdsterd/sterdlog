import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import Header from "../components/NavigationBar/header"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"

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
            건국대학교 컴퓨터공학부 22학번
            <DateText>, 2022년 03월 - 현재</DateText>
          </p>
          <h2>수상 경력</h2>
          <p>
            2019년 삼성 주니어 소프트웨어 창작대회 고등부 최우수상 수상
            <DateText>, 2019년 11월</DateText>
            <br />
            2017년 앤어워드 디지털 창의 학생 공모전 우수상 수상
            <DateText>, 2018년 1월</DateText>
          </p>
          <h2>프로젝트</h2>
          <h4>
            통학 차량 탑승 학생 자동 출석 체크 솔루션 개발
            <DateText>, 2019년 7월</DateText>
          </h4>
          <p>
            BLE 비콘을 사용하여 통학 차량에 학생이 탑승했는지 자동으로 체크하고,
            교실에 입실한 학생과 대조하여 출석을 자동으로 체크할 수 있는
            안드로이드 어플리케이션을 기획하고, Kotlin을 사용하여 개발했습니다.
            Backend는 Firebase를 사용하여 구현했습니다. 2019 삼성 주니어
            소프트웨어 창작대회에 제출하여 최우수상을 수상했습니다.
          </p>
          <h4>
            웹 기반 키오스크 솔루션 개발<DateText>, 2019년 5월</DateText>
          </h4>
          <p>
            웹 환경에서 사용할 수 있는 키오스크 웹 앱을 HTML, CSS, Javascript,
            JQuery를 사용하여 개발했습니다. 주문 통계 및 주문 내역을 확인할 수
            있는 안드로이드 어플리케이션은 Kotlin을 사용하여 개발했습니다.
            Backend는 Firebase를 사용하여 구현했습니다.
          </p>
          <h4>
            암호화폐 모의 투자 안드로이드 어플리케이션 개발
            <DateText>, 2017년 11월</DateText>
          </h4>
          <p>
            기존의 MTS와 비슷한 사용자 경험으로 암호화폐 모의 투자를 할 수 있는
            안드로이드 어플리케이션을 기획하고, Java를 사용한 어플리케이션의 UI
            개발에 참여했습니다. Backend는 Firebase를 사용하여 구현했습니다.
            2017 앤어워드 디지털 창의 학생 공모전에 제출하여 우수상을
            수상했습니다.
          </p>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Blog

export const Head = () => <Seo title="메인" />
