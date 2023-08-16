import React from 'react'
import { Text } from '../components'

export default {
  component: Text,
  args: {
    children: 'TEXT', // default 값이군!
  },
  argTypes: {
    children: { control: 'text' },
    size: { control: 'number' },
    strong: { control: 'boolean' },
  },
}

// args의 타입은 또 어떻게 설정해줘야 하지 ..?
export const Default = (args) => {
  return <Text {...args}>Text</Text>
}
