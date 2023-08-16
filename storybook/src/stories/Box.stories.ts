import { Box } from '../components'

export default {
  title: 'Example/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    backgroundColor: { control: 'color' },
  },
}

export const Primary = {
  args: {
    primary: true,
    label: 'Box',
  },
}
