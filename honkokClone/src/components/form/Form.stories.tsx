import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import Form from './Form';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('email'), 'test@test.com');
    await userEvent.type(canvas.getByTestId('password'), '123123');
    await userEvent.click(canvas.getByTestId('button'));
  }
};
