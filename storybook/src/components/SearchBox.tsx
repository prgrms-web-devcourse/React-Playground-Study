import styled from '@emotion/styled'
import React from 'react'

const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  box-sizing: border-box;
`

interface Prop {
  onSearch: (value: string) => void
}

const SearchBox = ({ onSearch }: Prop) => {
  return <Input onChange={(e) => onSearch(e.target.value)} />
}

export default SearchBox
