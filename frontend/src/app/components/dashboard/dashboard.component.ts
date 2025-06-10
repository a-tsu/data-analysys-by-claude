import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, switchMap, startWith } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { MetricsCardsComponent } from '../metrics-cards/metrics-cards.component';
import { ChartsComponent } from '../charts/charts.component';
import { DataTablesComponent } from '../data-tables/data-tables.component';
import { 
  SalesData, 
  CustomerData, 
  Metrics, 
  ChartData 
} from '../../models/data.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FilterPanelComponent,
    MetricsCardsComponent,
    ChartsComponent,
    DataTablesComponent
  ],
  template: `
    <div class="layout-container">
      <div class="filter-panel">
        <app-filter-panel></app-filter-panel>
      </div>
      
      <div class="main-content">
        <div class="dashboard-container">
          <app-metrics-cards [metrics]="metrics"></app-metrics-cards>
          
          <app-charts [chartData]="chartData"></app-charts>
          
          <app-data-tables 
            [salesData]="salesData" 
            [customerData]="customerData">
          </app-data-tables>
          
          <div class="footer-note">
            <p><em>*このダッシュボードはモックアップデータを使用しています。</em></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      min-height: calc(100vh - 64px); /* Account for toolbar height */
    }

    .filter-panel {
      width: 320px;
      border-right: 1px solid #e0e0e0;
      background-color: #fafafa;
      overflow-y: auto;
      padding: 16px;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background-color: #f5f5f5;
    }

    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-note {
      margin-top: 32px;
      text-align: center;
      color: #666;
    }

    .footer-note p {
      margin: 0;
      padding: 16px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .layout-container {
        flex-direction: column;
      }
      
      .filter-panel {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #e0e0e0;
        max-height: 40vh;
      }
      
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  salesData: SalesData[] | null = null;
  customerData: CustomerData[] | null = null;
  metrics: Metrics | null = null;
  chartData: ChartData | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Listen to filter changes and update all data
    this.dataService.filters$
      .pipe(
        startWith(this.dataService.getCurrentFilters()),
        switchMap(filters => {
          return combineLatest([
            this.dataService.getSalesData(filters),
            this.dataService.getCustomerData(filters),
            this.dataService.getMetrics(filters),
            this.dataService.getChartData(filters)
          ]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ([salesData, customerData, metrics, chartData]) => {
          this.salesData = salesData;
          this.customerData = customerData;
          this.metrics = metrics;
          this.chartData = chartData;
        },
        error: (error) => {
          console.error('Error loading dashboard data:', error);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}