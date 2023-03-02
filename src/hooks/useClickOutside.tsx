import React, { useEffect } from "react"

const events = [`mousedown`, `touchstart`]

const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  const isOutside = (element: HTMLElement) =>
    !ref.current || !ref.current.contains(element)

  const onClick = (e: Event) => {
    if (isOutside(e.target as HTMLElement)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    for (const event of events) document.addEventListener(event, onClick)

    return () => {
      for (const event of events) document.removeEventListener(event, onClick)
    }
  })
}

export default useClickOutside
