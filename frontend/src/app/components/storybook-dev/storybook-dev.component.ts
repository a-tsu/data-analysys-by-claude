import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

// Import all components for testing
import { MetricsCardsComponent } from '../metrics-cards/metrics-cards.component';
import { ChartsComponent } from '../charts/charts.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { DataTablesComponent } from '../data-tables/data-tables.component';
import { MatrixViewComponent } from '../matrix-view/matrix-view.component';

// Import sample data
import { Metrics, ChartData, SalesData, CustomerData } from '../../models/data.models';

@Component({
  selector: 'app-storybook-dev',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule, 
    MatCardModule,
    MetricsCardsComponent,
    ChartsComponent,
    FilterPanelComponent,
    DataTablesComponent,
    MatrixViewComponent
  ],
  template: `
    <div class="storybook-dev">
      <h1>Component Development & Testing</h1>
      
      <mat-tab-group>
        <mat-tab label="MetricsCards">
          <div class="component-showcase">
            <h2>Default</h2>
            <app-metrics-cards [metrics]="sampleMetrics"></app-metrics-cards>
            
            <h2>High Values</h2>
            <app-metrics-cards [metrics]="highValueMetrics"></app-metrics-cards>
            
            <h2>No Data</h2>
            <app-metrics-cards [metrics]="null"></app-metrics-cards>
          </div>
        </mat-tab>

        <mat-tab label="Charts">
          <div class="component-showcase">
            <h2>Default Charts</h2>
            <app-charts [chartData]="sampleChartData"></app-charts>
            
            <h2>No Data</h2>
            <app-charts [chartData]="null"></app-charts>
          </div>
        </mat-tab>

        <mat-tab label="FilterPanel">
          <div class="component-showcase">
            <h2>Filter Panel</h2>
            <app-filter-panel></app-filter-panel>
          </div>
        </mat-tab>

        <mat-tab label="DataTables">
          <div class="component-showcase">
            <h2>Data Tables</h2>
            <app-data-tables 
              [salesData]="sampleSalesData" 
              [customerData]="sampleCustomerData">
            </app-data-tables>
            
            <h2>Empty Data</h2>
            <app-data-tables 
              [salesData]="[]" 
              [customerData]="[]">
            </app-data-tables>
          </div>
        </mat-tab>

        <mat-tab label="MatrixView">
          <div class="component-showcase">
            <h2>Matrix View</h2>
            <app-matrix-view 
              [salesData]="sampleSalesData" 
              [customerData]="sampleCustomerData"
              [chartData]="sampleChartData">
            </app-matrix-view>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .storybook-dev {
      padding: 20px;
    }

    .component-showcase {
      padding: 20px;
    }

    .component-showcase h2 {
      margin: 20px 0 10px 0;
      color: #1976d2;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 5px;
    }

    .component-showcase > *:not(h2) {
      margin-bottom: 30px;
    }
  `]
})
export class StorybookDevComponent {
  sampleMetrics: Metrics = {
    total_sales: 11787173.14,
    avg_daily_sales: 101613.56,
    total_customers: 110,
    avg_satisfaction: 3.16
  };

  highValueMetrics: Metrics = {
    total_sales: 50000000.00,
    avg_daily_sales: 500000.00,
    total_customers: 1500,
    avg_satisfaction: 4.8
  };

  sampleChartData: ChartData = {
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

  sampleSalesData: SalesData[] = [
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

  sampleCustomerData: CustomerData[] = [
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
}