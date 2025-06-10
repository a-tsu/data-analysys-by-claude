import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Metrics } from '../../models/data.models';

@Component({
  selector: 'app-metrics-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="metrics-row">
      <mat-card class="metric-card">
        <mat-card-content>
          <div class="metric-content">
            <div class="metric-icon">
              <mat-icon color="primary">attach_money</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-value">¥{{metrics?.total_sales | number:'1.0-0'}}</div>
              <div class="metric-label">総売上</div>
              <div class="metric-change positive">+5%</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="metric-card">
        <mat-card-content>
          <div class="metric-content">
            <div class="metric-icon">
              <mat-icon color="primary">trending_up</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-value">¥{{metrics?.avg_daily_sales | number:'1.0-0'}}</div>
              <div class="metric-label">平均日次売上</div>
              <div class="metric-change positive">+3%</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="metric-card">
        <mat-card-content>
          <div class="metric-content">
            <div class="metric-icon">
              <mat-icon color="primary">people</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-value">{{metrics?.total_customers | number}}</div>
              <div class="metric-label">顧客数</div>
              <div class="metric-change neutral">フィルター適用</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="metric-card">
        <mat-card-content>
          <div class="metric-content">
            <div class="metric-icon">
              <mat-icon color="primary">star</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-value">{{metrics?.avg_satisfaction | number:'1.1-1'}}/5</div>
              <div class="metric-label">平均満足度</div>
              <div class="metric-change neutral">全体平均と比較</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .metrics-row {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .metric-card {
      flex: 1;
      min-width: 200px;
    }

    .metric-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .metric-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #f5f5f5;
    }

    .metric-info {
      flex: 1;
    }

    .metric-value {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.2;
      color: #1976d2;
    }

    .metric-label {
      font-size: 14px;
      color: #666;
      margin: 4px 0;
    }

    .metric-change {
      font-size: 12px;
      font-weight: 500;
    }

    .metric-change.positive {
      color: #4caf50;
    }

    .metric-change.negative {
      color: #f44336;
    }

    .metric-change.neutral {
      color: #999;
    }

    @media (max-width: 768px) {
      .metrics-row {
        flex-direction: column;
      }
      
      .metric-card {
        min-width: unset;
      }
    }
  `]
})
export class MetricsCardsComponent {
  @Input() metrics: Metrics | null = null;
}