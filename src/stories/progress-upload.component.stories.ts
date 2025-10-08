import { Meta, StoryObj } from '@storybook/angular';
import { ProgressUploadComponent } from './progress-upload.component';

export default {
  title: 'Components/ProgressUpload',
  component: ProgressUploadComponent,
  argTypes: {
    fileName: { control: 'text' },
    fileSize: { control: 'text' },
    progress: { control: 'number' },
    status: { 
      control: { type: 'select', options: ['default', 'progress', 'completed'] }
    },
  },
} as Meta<ProgressUploadComponent>;

type Story = StoryObj<ProgressUploadComponent>;

export const Default: Story = {
  args: {
    fileName: 'File_Name.jpg',
    fileSize: '0.0 Mb',
    progress: 0,
    status: 'default',
  },
};

export const InProgress: Story = {
  args: {
    fileName: 'UploadingFile.mp4',
    fileSize: '12 Mb',
    progress: 60,
    status: 'progress',
  },
};

export const Completed: Story = {
  args: {
    fileName: 'FinalReport.pdf',
    fileSize: '5 Mb',
    progress: 100,
    status: 'completed',
  },
};
