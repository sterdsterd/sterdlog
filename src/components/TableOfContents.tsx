import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useActiveID from "../hooks/useActiveID"

interface Items {
  url: string
  title: string
  items?: Items[]
}

type Props = {
  items: Items[]
}

const TOCContainer = styled.div`
  position: sticky;
  width: 20rem;
  top: calc(60px + 2rem);
  margin-left: 2.8rem;
  font-weight: 700;
  max-height: calc(100vh - 60px - 4rem);
  overflow-y: scroll;

  @media screen and (max-width: 92rem) {
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

const ListItemLink = styled.a.attrs((props: { isActive: boolean }) => props)`
  display: block;
  width: 100%;
  padding: 0.8rem;
  transition: all 0.2s;
  border-radius: 0.5rem;
  color: ${props => (props.isActive ? "#2563e1" : "#000000")};
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

const renderItems = (items: Array<Items>, activeId: string) => {
  return (
    <List>
      {items.map((item: Items) => (
        <ListItem key={item.url}>
          <ListItemLink
            href={item.url}
            isActive={activeId === item.url.slice(1)}
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
  const activeID = useActiveID(idList)
  return (
    <div>
      <TOCContainer className="scrollbar">
        <span style={{ marginLeft: "1.2rem" }}>목차</span>
        {renderItems(props.items, activeID)}
      </TOCContainer>
    </div>
  )
}

export default TableOfContents
