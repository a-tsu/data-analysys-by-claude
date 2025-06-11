import type { Meta, StoryObj } from '@storybook/angular';
import { MetricsCardsComponent } from './metrics-cards.component';
import { Metrics } from '../../models/data.models';

const meta: Meta<MetricsCardsComponent> = {
  title: 'Components/MetricsCards',
  component: MetricsCardsComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    metrics: {
      description: 'メトリクスデータ',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<MetricsCardsComponent>;

const sampleMetrics: Metrics = {
  total_sales: 11787173.14,
  avg_daily_sales: 101613.56,
  total_customers: 110,
  avg_satisfaction: 3.16
};

export const Default: Story = {
  args: {
    metrics: sampleMetrics,
  },
};

export const HighValues: Story = {
  args: {
    metrics: {
      total_sales: 50000000.00,
      avg_daily_sales: 500000.00,
      total_customers: 1500,
      avg_satisfaction: 4.8
    },
  },
};

export const LowValues: Story = {
  args: {
    metrics: {
      total_sales: 100000.00,
      avg_daily_sales: 1000.00,
      total_customers: 25,
      avg_satisfaction: 2.1
    },
  },
};

export const NoData: Story = {
  args: {
    metrics: null,
  },
};