import type { Meta, StoryObj } from '@storybook/angular';
import { MatrixViewComponent } from './matrix-view.component';
import { SalesData, CustomerData, ChartData } from '../../models/data.models';

const meta: Meta<MatrixViewComponent> = {
  title: 'Components/MatrixView',
  component: MatrixViewComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    salesData: {
      description: '売上データの配列',
      control: { type: 'object' },
    },
    customerData: {
      description: '顧客データの配列',
      control: { type: 'object' },
    },
    chartData: {
      description: 'チャートデータ',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<MatrixViewComponent>;

// Generate comprehensive sample data
const generateSalesData = (): SalesData[] => {
  const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];
  const regions = ['東京', '大阪', '名古屋', '福岡', '札幌'];
  const data: SalesData[] = [];

  for (let month = 1; month <= 12; month++) {
    categories.forEach(category => {
      regions.forEach(region => {
        // Generate multiple entries per category/region/month
        for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
          data.push({
            date: new Date(2024, month - 1, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            sales: Math.floor(Math.random() * 200000) + 50000,
            category,
            region
          });
        }
      });
    });
  }

  return data;
};

const generateCustomerData = (): CustomerData[] => {
  const genders = ['男性', '女性'];
  const data: CustomerData[] = [];

  for (let i = 1; i <= 200; i++) {
    data.push({
      customer_id: i,
      age: Math.floor(Math.random() * 50) + 18, // 18-67
      gender: genders[Math.floor(Math.random() * genders.length)],
      purchase_amount: Math.floor(Math.random() * 500000) + 10000,
      satisfaction: Math.floor(Math.random() * 5) + 1 // 1-5
    });
  }

  return data;
};

const sampleSalesData = generateSalesData();
const sampleCustomerData = generateCustomerData();

const sampleChartData: ChartData = {
  line_chart: [
    { x: '2024-01', y: 1500000 },
    { x: '2024-02', y: 1800000 },
    { x: '2024-03', y: 1600000 },
  ],
  pie_chart: [
    { x: 'Electronics', y: 3500000 },
    { x: 'Books', y: 2800000 },
  ],
  bar_chart: [
    { x: '東京', y: 4500000 },
    { x: '大阪', y: 3200000 },
  ],
  histogram: [25, 30, 35, 40, 45]
};

export const Default: Story = {
  args: {
    salesData: sampleSalesData,
    customerData: sampleCustomerData,
    chartData: sampleChartData,
  },
};

export const SmallDataset: Story = {
  args: {
    salesData: [
      { date: '2024-01-15', sales: 125000, category: 'Electronics', region: '東京' },
      { date: '2024-01-16', sales: 89000, category: 'Books', region: '大阪' },
      { date: '2024-02-15', sales: 156000, category: 'Electronics', region: '東京' },
      { date: '2024-02-16', sales: 203000, category: 'Clothing', region: '名古屋' },
    ],
    customerData: [
      { customer_id: 1, age: 28, gender: '男性', purchase_amount: 125000, satisfaction: 4 },
      { customer_id: 2, age: 35, gender: '女性', purchase_amount: 89000, satisfaction: 5 },
      { customer_id: 3, age: 45, gender: '男性', purchase_amount: 156000, satisfaction: 3 },
      { customer_id: 4, age: 65, gender: '女性', purchase_amount: 203000, satisfaction: 2 },
    ],
    chartData: sampleChartData,
  },
};

export const SingleCategoryRegion: Story = {
  args: {
    salesData: [
      { date: '2024-01-15', sales: 125000, category: 'Electronics', region: '東京' },
      { date: '2024-01-16', sales: 89000, category: 'Electronics', region: '東京' },
      { date: '2024-01-17', sales: 156000, category: 'Electronics', region: '東京' },
    ],
    customerData: [
      { customer_id: 1, age: 28, gender: '男性', purchase_amount: 125000, satisfaction: 4 },
      { customer_id: 2, age: 29, gender: '女性', purchase_amount: 89000, satisfaction: 4 },
    ],
    chartData: sampleChartData,
  },
};

export const HighSatisfactionCustomers: Story = {
  args: {
    salesData: sampleSalesData.slice(0, 20),
    customerData: sampleCustomerData.slice(0, 50).map(customer => ({
      ...customer,
      satisfaction: Math.floor(Math.random() * 2) + 4 // 4-5 only
    })),
    chartData: sampleChartData,
  },
};

export const LowSatisfactionCustomers: Story = {
  args: {
    salesData: sampleSalesData.slice(0, 20),
    customerData: sampleCustomerData.slice(0, 50).map(customer => ({
      ...customer,
      satisfaction: Math.floor(Math.random() * 2) + 1 // 1-2 only
    })),
    chartData: sampleChartData,
  },
};

export const WideAgeRange: Story = {
  args: {
    salesData: sampleSalesData.slice(0, 30),
    customerData: [
      ...Array.from({ length: 20 }, (_, i) => ({
        customer_id: i + 1,
        age: 18 + i, // 18-37
        gender: i % 2 === 0 ? '男性' : '女性',
        purchase_amount: Math.floor(Math.random() * 100000) + 50000,
        satisfaction: Math.floor(Math.random() * 5) + 1
      })),
      ...Array.from({ length: 20 }, (_, i) => ({
        customer_id: i + 21,
        age: 40 + i, // 40-59
        gender: i % 2 === 0 ? '男性' : '女性',
        purchase_amount: Math.floor(Math.random() * 200000) + 100000,
        satisfaction: Math.floor(Math.random() * 5) + 1
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        customer_id: i + 41,
        age: 60 + i, // 60-69
        gender: i % 2 === 0 ? '男性' : '女性',
        purchase_amount: Math.floor(Math.random() * 150000) + 75000,
        satisfaction: Math.floor(Math.random() * 5) + 1
      }))
    ],
    chartData: sampleChartData,
  },
};

export const EmptyData: Story = {
  args: {
    salesData: [],
    customerData: [],
    chartData: {
      line_chart: [],
      pie_chart: [],
      bar_chart: [],
      histogram: []
    },
  },
};

export const NullData: Story = {
  args: {
    salesData: null,
    customerData: null,
    chartData: null,
  },
};