import React, { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { IconButton } from "./NavigationBar/style"

type Props = {
  visible: boolean
  children?: React.ReactNode
  setVisible: Dispatch<SetStateAction<boolean>>
  header: string
}

const Modal = styled.div.attrs((props: { visible: boolean }) => props)`
  display: ${props => (props.visible ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  ${props => (props.visible ? "align-items: center" : "")};
  animation: modal-show 0.2s;
`

const ModalContents = styled.section`
  max-height: 100vh;
  width: 728px;
  margin: 0 auto;
  border-radius: 1rem;
  background-color: #fff;
  transition: all 0.2s;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  padding: 2rem;
  animation: modal-show 0.2s;
`

const Title = styled.h1`
  margin-top: 1rem;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
`

const PortfolioModal = (props: Props) => {
  return (
    <Modal visible={props.visible}>
      {props.visible ? (
        <ModalContents>
          <header style={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              onClick={() => props.setVisible(false)}
              style={{
                marginLeft: "auto",
                marginRight: "-1rem",
                marginTop: "-1rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 96 960 960"
                width="24"
              >
                <path d="M480 631.566 276.783 834.783Q264.957 846.609 249 846.609t-27.783-11.826Q209.391 822.957 209.391 807t11.826-27.783L424.434 576 221.217 372.783Q209.391 360.957 209.391 345t11.826-27.783q11.826-11.826 27.783-11.826t27.783 11.826L480 520.434l203.217-203.217q11.826-11.826 27.783-11.826t27.783 11.826q11.826 11.826 11.826 27.783t-11.826 27.783L535.566 576l203.217 203.217q11.826 11.826 11.826 27.783t-11.826 27.783Q726.957 846.609 711 846.609t-27.783-11.826L480 631.566Z" />
              </svg>
            </IconButton>
            <Title>{props.header}</Title>
          </header>
          <div
            style={{
              width: "calc(100% + 4rem)",
              wordBreak: "break-all",
              overflowY: "scroll",
              overflowX: "hidden",
              margin: "0 -2rem",
              padding: "0 2rem",
            }}
          >
            <section
              style={{ maxHeight: "calc(80vh - 7rem)" }}
              itemProp="articleBody"
            >
              {props.children}
            </section>
          </div>
        </ModalContents>
      ) : null}
    </Modal>
  )
}

export default PortfolioModal
