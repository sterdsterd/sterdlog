import React, { useState, useEffect } from "react"
import styled from "styled-components"

interface Items {
  url: string
  title: string
  items?: Array<Items>
}

type Props = {
  items: Array<Items>
}

const TOCContainer = styled.div`
  position: sticky;
  width: 20rem;
  top: calc(60px + 2rem);
  margin-left: 0.8rem;
  font-weight: 700;

  @media screen and (max-width: 88rem) {
    display: none;
  }
`

const List = styled.ul`
  list-style: none;
  padding-left: 1rem;
  margin-left: 0;
  margin-top: 0;
  font-weight: 500;
`

const ListItem = styled.li`
  margin-bottom: 0;
`

const ListItemLink = styled.a`
  display: block;
  width: 100%;
  padding: 0.8rem;
  transition: all 0.2s;
  border-radius: 0.5rem;
  color: #000;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #2563e1;
  }
`

function getIdList(items: Array<Items>) {
  return items.reduce((acc: Array<string>, item: Items) => {
    if (item.url) {
      acc.push(item.url.slice(1))
    }
    if (item.items) {
      acc.push(...getIdList(item.items))
    }
    return acc
  }, [])
}

function useActiveId(itemIds: Array<string>) {
  const [activeId, setActiveId] = useState<string>(`test`)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -90% 0%` }
    )
    itemIds.forEach(id => {
      if (document.getElementById(id))
        observer.observe(document.getElementById(id)!)
    })

    return () => {
      itemIds.forEach(id => {
        if (document.getElementById(id))
          observer.unobserve(document.getElementById(id)!)
      })
    }
  }, [itemIds])
  return activeId
}

const renderItems = (items: Array<Items>, activeId: string) => {
  return (
    <List>
      {items.map((item: Items) => (
        <ListItem key={item.url}>
          <ListItemLink
            href={item.url}
            style={{
              color: activeId === item.url.slice(1) ? "#2563e1" : "#000",
            }}
          >
            {item.title}
          </ListItemLink>
          {item.items && renderItems(item.items, activeId)}
        </ListItem>
      ))}
    </List>
  )
}

const TableOfContents = (props: Props) => {
  const idList = getIdList(props.items)
  const activeId = useActiveId(idList)
  return (
    <div>
      <TOCContainer>
        <span style={{ marginLeft: "1.2rem" }}>목차</span>
        {renderItems(props.items, activeId)}
      </TOCContainer>
    </div>
  )
}

export default TableOfContents
