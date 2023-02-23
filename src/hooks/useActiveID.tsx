import { useState, useEffect } from "react"

function useActiveID(itemIDs: Array<string>) {
  const [activeID, setActiveID] = useState<string>("")
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveID(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -90% 0%` }
    )

    itemIDs.forEach(id => {
      if (document.getElementById(id))
        observer.observe(document.getElementById(id)!)
    })

    return () => {
      itemIDs.forEach(id => {
        if (document.getElementById(id))
          observer.unobserve(document.getElementById(id)!)
      })
    }
  }, [itemIDs])
  return activeID
}

export default useActiveID
