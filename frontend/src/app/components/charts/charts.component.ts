import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { ChartData } from '../../models/data.models';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  template: `
    <div class="charts-container">
      <!-- 売上推移とカテゴリ別売上 -->
      <div class="charts-row">
        <mat-card class="chart-card large">
          <mat-card-header>
            <mat-card-title>📈 売上推移</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-wrapper">
              <canvas
                baseChart
                [data]="lineChartData"
                [options]="lineChartOptions"
                [type]="lineChartType">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>🥧 カテゴリ別売上構成</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-wrapper">
              <canvas
                baseChart
                [data]="pieChartData"
                [options]="pieChartOptions"
                [type]="pieChartType">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- 地域別売上と顧客年齢分布 -->
      <div class="charts-bottom-row">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>🗺️ 地域別売上</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-wrapper">
              <canvas
                baseChart
                [data]="barChartData"
                [options]="barChartOptions"
                [type]="barChartType">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>👥 顧客年齢分布</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-wrapper">
              <canvas
                baseChart
                [data]="histogramChartData"
                [options]="histogramChartOptions"
                [type]="histogramChartType">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .charts-container {
      width: 100%;
    }

    .charts-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .charts-bottom-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .chart-card {
      min-height: 400px;
    }

    .chart-card.large {
      min-height: 400px;
    }

    .chart-wrapper {
      height: 300px;
      position: relative;
    }

    mat-card-content {
      padding: 16px;
    }

    @media (max-width: 768px) {
      .charts-row,
      .charts-bottom-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ChartsComponent implements OnChanges {
  @Input() chartData: ChartData | null = null;

  // Line Chart
  lineChartType: ChartType = 'line';
  lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: '売上',
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      fill: true,
      tension: 0.1
    }]
  };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '¥' + Number(value).toLocaleString()
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Pie Chart
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Bar Chart
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: '売上',
      backgroundColor: '#1976d2',
      borderColor: '#1565c0',
      borderWidth: 1
    }]
  };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '¥' + Number(value).toLocaleString()
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Histogram Chart
  histogramChartType: ChartType = 'bar';
  histogramChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: '人数',
      backgroundColor: '#4caf50',
      borderColor: '#388e3c',
      borderWidth: 1
    }]
  };
  histogramChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && this.chartData) {
      this.updateCharts();
    }
  }

  private updateCharts() {
    if (!this.chartData) return;

    // Line Chart
    this.lineChartData = {
      labels: this.chartData.line_chart.map(d => d.x),
      datasets: [{
        data: this.chartData.line_chart.map(d => d.y),
        label: '売上',
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        tension: 0.1
      }]
    };

    // Pie Chart
    this.pieChartData = {
      labels: this.chartData.pie_chart.map(d => d.x),
      datasets: [{
        data: this.chartData.pie_chart.map(d => d.y),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    };

    // Bar Chart
    this.barChartData = {
      labels: this.chartData.bar_chart.map(d => d.x),
      datasets: [{
        data: this.chartData.bar_chart.map(d => d.y),
        label: '売上',
        backgroundColor: '#1976d2',
        borderColor: '#1565c0',
        borderWidth: 1
      }]
    };

    // Histogram
    if (this.chartData.histogram.length > 0) {
      const bins = this.createHistogramBins(this.chartData.histogram);
      this.histogramChartData = {
        labels: bins.labels,
        datasets: [{
          data: bins.data,
          label: '人数',
          backgroundColor: '#4caf50',
          borderColor: '#388e3c',
          borderWidth: 1
        }]
      };
    }
  }

  private createHistogramBins(ages: number[]) {
    const bins: { [key: string]: number } = {};
    const binSize = 5;
    
    ages.forEach(age => {
      const binStart = Math.floor(age / binSize) * binSize;
      const binEnd = binStart + binSize - 1;
      const binLabel = `${binStart}-${binEnd}`;
      bins[binLabel] = (bins[binLabel] || 0) + 1;
    });

    return {
      labels: Object.keys(bins),
      data: Object.values(bins)
    };
  }
}