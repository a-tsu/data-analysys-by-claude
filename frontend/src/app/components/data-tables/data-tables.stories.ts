import type { Meta, StoryObj } from '@storybook/angular';
import { DataTablesComponent } from './data-tables.component';
import { SalesData, CustomerData } from '../../models/data.models';

const meta: Meta<DataTablesComponent> = {
  title: 'Components/DataTables',
  component: DataTablesComponent,
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
  },
};

export default meta;
type Story = StoryObj<DataTablesComponent>;

const sampleSalesData: SalesData[] = [
  {
    date: '2024-01-15',
    sales: 125000,
    category: 'Electronics',
    region: '東京'
  },
  {
    date: '2024-01-16',
    sales: 89000,
    category: 'Books',
    region: '大阪'
  },
  {
    date: '2024-01-17',
    sales: 156000,
    category: 'Clothing',
    region: '名古屋'
  },
  {
    date: '2024-01-18',
    sales: 203000,
    category: 'Home',
    region: '福岡'
  },
  {
    date: '2024-01-19',
    sales: 97000,
    category: 'Sports',
    region: '札幌'
  },
];

const sampleCustomerData: CustomerData[] = [
  {
    customer_id: 1,
    age: 28,
    gender: '男性',
    purchase_amount: 125000,
    satisfaction: 4
  },
  {
    customer_id: 2,
    age: 35,
    gender: '女性',
    purchase_amount: 89000,
    satisfaction: 5
  },
  {
    customer_id: 3,
    age: 42,
    gender: '男性',
    purchase_amount: 156000,
    satisfaction: 3
  },
  {
    customer_id: 4,
    age: 29,
    gender: '女性',
    purchase_amount: 203000,
    satisfaction: 2
  },
  {
    customer_id: 5,
    age: 38,
    gender: '男性',
    purchase_amount: 97000,
    satisfaction: 5
  },
];

// Generate more sample data for pagination testing
const generateSalesData = (count: number): SalesData[] => {
  const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];
  const regions = ['東京', '大阪', '名古屋', '福岡', '札幌'];
  
  return Array.from({ length: count }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 500000) + 50000,
    category: categories[Math.floor(Math.random() * categories.length)],
    region: regions[Math.floor(Math.random() * regions.length)]
  }));
};

const generateCustomerData = (count: number): CustomerData[] => {
  const genders = ['男性', '女性'];
  
  return Array.from({ length: count }, (_, i) => ({
    customer_id: i + 1,
    age: Math.floor(Math.random() * 50) + 20,
    gender: genders[Math.floor(Math.random() * genders.length)],
    purchase_amount: Math.floor(Math.random() * 500000) + 10000,
    satisfaction: Math.floor(Math.random() * 5) + 1
  }));
};

export const Default: Story = {
  args: {
    salesData: sampleSalesData,
    customerData: sampleCustomerData,
  },
};

export const LargeDataset: Story = {
  args: {
    salesData: generateSalesData(150),
    customerData: generateCustomerData(150),
  },
};

export const SmallDataset: Story = {
  args: {
    salesData: sampleSalesData.slice(0, 2),
    customerData: sampleCustomerData.slice(0, 2),
  },
};

export const HighSatisfactionData: Story = {
  args: {
    salesData: sampleSalesData,
    customerData: sampleCustomerData.map(customer => ({
      ...customer,
      satisfaction: Math.floor(Math.random() * 2) + 4 // 4-5
    })),
  },
};

export const LowSatisfactionData: Story = {
  args: {
    salesData: sampleSalesData,
    customerData: sampleCustomerData.map(customer => ({
      ...customer,
      satisfaction: Math.floor(Math.random() * 2) + 1 // 1-2
    })),
  },
};

export const EmptyData: Story = {
  args: {
    salesData: [],
    customerData: [],
  },
};

export const NullData: Story = {
  args: {
    salesData: null,
    customerData: null,
  },
};