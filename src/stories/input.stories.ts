import { InputComponent } from './input.component';

export default {
  title: 'Form/Input',
  component: InputComponent,
   tags: ['autodocs'],
};

export const Default = {
  args: {
    placeholder: 'Type something...',
  },
};
export const Icon = {
  args: {
    placeholder: 'Password',
    type: 'password',
    size: 'lg',
    iconRight: 'fas fa-eye',
  }
};
