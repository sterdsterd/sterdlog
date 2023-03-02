import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  createRef,
} from "react"
import styled from "styled-components"
import { IconButton } from "../NavigationBar/style"
import useClickOutside from "../../hooks/useClickOutside"

type Props = {
  isVisible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  slug: string
}

const Modal = styled.div.attrs((props: { isVisible: boolean }) => props)`
  display: ${props => (props.isVisible ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  ${props => (props.isVisible ? "align-items: center" : "")};
  animation: modal-show 0.2s;
`

const ModalContents = styled.section`
  max-height: 100vh;
  max-width: 768px;
  width: 100%;
  padding: 1rem;
  padding-top: 0;
  margin: 0 auto;
  border-radius: 1rem;
  background-color: #fff;
  transition: all 0.2s;
  overflow: scroll;
  overflow-x: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  animation: modal-show 0.2s;
`

const ModalBody = styled.iframe`
  width: 100%;
  border: none;
  transition: all 0.2s;
`

const PortfolioModal = (props: Props) => {
  const [frameHeight, setFrameHeight] = useState<string>()
  const modalRef = createRef()

  useEffect(() => {
    const t = setInterval(() => {
      const frame: HTMLIFrameElement = document.getElementById(
        "modalBody"
      ) as HTMLIFrameElement
      if (frame !== null) {
        setFrameHeight(frame?.contentWindow?.document.body.scrollHeight + "px")
        console.log(
          "height",
          frame?.contentWindow?.document.body.scrollHeight + "px"
        )
      }
    }, 500)

    return () => {
      clearInterval(t)
    }
  }, [props.isVisible])

  useClickOutside(modalRef, () => props.setVisible(false))

  return (
    <Modal isVisible={props.isVisible}>
      {props.isVisible ? (
        <ModalContents className="scrollbar" ref={modalRef}>
          <header
            style={{
              display: "flex",
              flexDirection: "column",
              top: "0",
              height: "5rem",
              right: "0",
              position: "sticky",
              backdropFilter: "blur(20px)",
              backgroundColor: "#fff",
              mask: "linear-gradient(black 30%, transparent)",
            }}
          >
            <IconButton
              onClick={() => props.setVisible(false)}
              style={{
                marginLeft: "auto",
                marginRight: "0.5rem",
                marginTop: "1.5rem",
                zIndex: "100000",
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
          </header>
          <ModalBody
            id="modalBody"
            src={`.${props.slug}`}
            style={{
              height: `calc(2rem + ${frameHeight})`,
              overflow: "hidden",
            }}
            scrolling="no"
          ></ModalBody>
        </ModalContents>
      ) : null}
    </Modal>
  )
}

export default PortfolioModal
