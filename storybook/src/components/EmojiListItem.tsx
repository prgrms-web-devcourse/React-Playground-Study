import styled from '@emotion/styled'
import React from 'react'

const ListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid black;
  cursor: pointer;
`

const Symbol = styled.div`
  font-size: 24px;
  margin-right: 16px;
`

const Title = styled.div`
  width: 200px;
`

const Keywords = styled.div`
  flex: 1;
`

const EmojiListItem = ({ emoji }) => {
  return (
    <ListItem>
      <Symbol>{emoji.symbol}</Symbol>
      <Title>{emoji.title}</Title>
      <Keywords>{emoji.keywords}</Keywords>
    </ListItem>
  )
}

export default EmojiListItem
