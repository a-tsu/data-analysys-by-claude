import type { Meta, StoryObj } from '@storybook/angular';
import { ChartsComponent } from './charts.component';
import { ChartData } from '../../models/data.models';

const meta: Meta<ChartsComponent> = {
  title: 'Components/Charts',
  component: ChartsComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    chartData: {
      description: 'チャートデータ',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<ChartsComponent>;

const sampleChartData: ChartData = {
  line_chart: [
    { x: '2024-01', y: 1500000 },
    { x: '2024-02', y: 1800000 },
    { x: '2024-03', y: 1600000 },
    { x: '2024-04', y: 2000000 },
    { x: '2024-05', y: 2200000 },
    { x: '2024-06', y: 1900000 },
  ],
  pie_chart: [
    { x: 'Electronics', y: 3500000 },
    { x: 'Books', y: 2800000 },
    { x: 'Clothing', y: 2200000 },
    { x: 'Home', y: 1800000 },
    { x: 'Sports', y: 1500000 },
  ],
  bar_chart: [
    { x: '東京', y: 4500000 },
    { x: '大阪', y: 3200000 },
    { x: '名古屋', y: 2400000 },
    { x: '福岡', y: 1800000 },
    { x: '札幌', y: 1500000 },
  ],
  histogram: [
    25, 28, 32, 45, 38, 29, 35, 42, 31, 27,
    39, 44, 33, 26, 41, 36, 30, 48, 34, 40,
    37, 43, 29, 31, 46, 35, 33, 28, 42, 39
  ]
};

export const Default: Story = {
  args: {
    chartData: sampleChartData,
  },
};

export const HighVolumeData: Story = {
  args: {
    chartData: {
      line_chart: [
        { x: '2024-01', y: 15000000 },
        { x: '2024-02', y: 18000000 },
        { x: '2024-03', y: 16000000 },
        { x: '2024-04', y: 20000000 },
        { x: '2024-05', y: 22000000 },
        { x: '2024-06', y: 19000000 },
        { x: '2024-07', y: 25000000 },
        { x: '2024-08', y: 23000000 },
        { x: '2024-09', y: 21000000 },
        { x: '2024-10', y: 24000000 },
        { x: '2024-11', y: 26000000 },
        { x: '2024-12', y: 28000000 },
      ],
      pie_chart: [
        { x: 'Electronics', y: 35000000 },
        { x: 'Books', y: 28000000 },
        { x: 'Clothing', y: 22000000 },
        { x: 'Home', y: 18000000 },
        { x: 'Sports', y: 15000000 },
        { x: 'Automotive', y: 12000000 },
      ],
      bar_chart: [
        { x: '東京', y: 45000000 },
        { x: '大阪', y: 32000000 },
        { x: '名古屋', y: 24000000 },
        { x: '福岡', y: 18000000 },
        { x: '札幌', y: 15000000 },
        { x: '広島', y: 12000000 },
        { x: '仙台', y: 10000000 },
      ],
      histogram: Array.from({ length: 200 }, () => Math.floor(Math.random() * 65) + 18)
    },
  },
};

export const MinimalData: Story = {
  args: {
    chartData: {
      line_chart: [
        { x: '2024-01', y: 50000 },
        { x: '2024-02', y: 75000 },
        { x: '2024-03', y: 60000 },
      ],
      pie_chart: [
        { x: 'Books', y: 100000 },
        { x: 'Clothing', y: 85000 },
      ],
      bar_chart: [
        { x: '東京', y: 120000 },
        { x: '大阪', y: 65000 },
      ],
      histogram: [25, 30, 35, 28, 32, 29, 31, 33, 27, 36]
    },
  },
};

export const EmptyData: Story = {
  args: {
    chartData: {
      line_chart: [],
      pie_chart: [],
      bar_chart: [],
      histogram: []
    },
  },
};

export const NoData: Story = {
  args: {
    chartData: null,
  },
};