import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click-test' }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryTt: Story = {
  args: {
    children: 'primary'
  }
};

export const Secondary: Story = {
  args: {},
  render: () => <button>123</button>
};
