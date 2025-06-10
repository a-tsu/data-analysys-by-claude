export interface SalesData {
  date: string;
  sales: number;
  category: string;
  region: string;
}

export interface CustomerData {
  customer_id: number;
  age: number;
  gender: string;
  purchase_amount: number;
  satisfaction: number;
}

export interface FilterRequest {
  date_range?: [string, string];
  categories?: string[];
  regions?: string[];
  sales_range?: [number, number];
  age_range?: [number, number];
  genders?: string[];
  satisfaction_filter?: string;
}

export interface Metrics {
  total_sales: number;
  avg_daily_sales: number;
  total_customers: number;
  avg_satisfaction: number;
}

export interface ChartDataPoint {
  x: string;
  y: number;
}

export interface ChartData {
  line_chart: ChartDataPoint[];
  pie_chart: ChartDataPoint[];
  bar_chart: ChartDataPoint[];
  histogram: number[];
}

export interface FilterOptions {
  categories: string[];
  regions: string[];
  sales_range: [number, number];
  age_range: [number, number];
  genders: string[];
}