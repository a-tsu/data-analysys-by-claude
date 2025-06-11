import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartData, SalesData, CustomerData } from '../../models/data.models';

interface MatrixData {
  metric: string;
  [key: string]: any;
}

@Component({
  selector: 'app-matrix-view',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatTabsModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>マトリクス表示</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group>
          <!-- 売上カテゴリ × 地域マトリクス -->
          <mat-tab label="カテゴリ×地域">
            <div class="matrix-container">
              <table mat-table [dataSource]="categoryRegionMatrix" class="matrix-table">
                <ng-container matColumnDef="category">
                  <th mat-header-cell *matHeaderCellDef>カテゴリ</th>
                  <td mat-cell *matCellDef="let element">{{element.category}}</td>
                </ng-container>
                
                <ng-container *ngFor="let region of regions" [matColumnDef]="region">
                  <th mat-header-cell *matHeaderCellDef>{{region}}</th>
                  <td mat-cell *matCellDef="let element">
                    {{formatCurrency(element[region])}}
                  </td>
                </ng-container>
                
                <ng-container matColumnDef="total">
                  <th mat-header-cell *matHeaderCellDef>合計</th>
                  <td mat-cell *matCellDef="let element" class="total-cell">
                    {{formatCurrency(element.total)}}
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="categoryRegionColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: categoryRegionColumns;"></tr>
              </table>
            </div>
          </mat-tab>

          <!-- 年齢層 × 満足度マトリクス -->
          <mat-tab label="年齢層×満足度">
            <div class="matrix-container">
              <table mat-table [dataSource]="ageSatisfactionMatrix" class="matrix-table">
                <ng-container matColumnDef="ageGroup">
                  <th mat-header-cell *matHeaderCellDef>年齢層</th>
                  <td mat-cell *matCellDef="let element">{{element.ageGroup}}</td>
                </ng-container>
                
                <ng-container *ngFor="let satisfaction of satisfactionLevels" [matColumnDef]="'satisfaction_' + satisfaction">
                  <th mat-header-cell *matHeaderCellDef>満足度{{satisfaction}}</th>
                  <td mat-cell *matCellDef="let element">
                    {{element['satisfaction_' + satisfaction] || 0}}人
                  </td>
                </ng-container>
                
                <ng-container matColumnDef="total">
                  <th mat-header-cell *matHeaderCellDef>合計</th>
                  <td mat-cell *matCellDef="let element" class="total-cell">
                    {{element.total}}人
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="ageSatisfactionColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: ageSatisfactionColumns;"></tr>
              </table>
            </div>
          </mat-tab>

          <!-- 月別 × カテゴリマトリクス -->
          <mat-tab label="月別×カテゴリ">
            <div class="matrix-container">
              <table mat-table [dataSource]="monthCategoryMatrix" class="matrix-table">
                <ng-container matColumnDef="month">
                  <th mat-header-cell *matHeaderCellDef>月</th>
                  <td mat-cell *matCellDef="let element">{{element.month}}</td>
                </ng-container>
                
                <ng-container *ngFor="let category of categories" [matColumnDef]="category">
                  <th mat-header-cell *matHeaderCellDef>{{category}}</th>
                  <td mat-cell *matCellDef="let element">
                    {{formatCurrency(element[category])}}
                  </td>
                </ng-container>
                
                <ng-container matColumnDef="total">
                  <th mat-header-cell *matHeaderCellDef>合計</th>
                  <td mat-cell *matCellDef="let element" class="total-cell">
                    {{formatCurrency(element.total)}}
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="monthCategoryColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: monthCategoryColumns;"></tr>
              </table>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .matrix-container {
      margin-top: 16px;
      overflow-x: auto;
    }

    .matrix-table {
      width: 100%;
      min-width: 600px;
    }

    .total-cell {
      font-weight: bold;
      background-color: #f5f5f5;
    }

    th.mat-header-cell {
      font-weight: bold;
      background-color: #3f51b5;
      color: white;
    }

    td.mat-cell {
      text-align: center;
      padding: 8px;
    }

    th.mat-header-cell {
      text-align: center;
      padding: 8px;
    }

    .mat-tab-group {
      margin-top: 16px;
    }

    .mat-tab-body-content {
      padding: 16px 0;
    }
  `]
})
export class MatrixViewComponent implements OnChanges {
  @Input() salesData: SalesData[] | null = null;
  @Input() customerData: CustomerData[] | null = null;
  @Input() chartData: ChartData | null = null;

  // カテゴリ×地域マトリクス
  categoryRegionMatrix: any[] = [];
  categoryRegionColumns: string[] = [];
  regions: string[] = [];
  categories: string[] = [];

  // 年齢層×満足度マトリクス
  ageSatisfactionMatrix: any[] = [];
  ageSatisfactionColumns: string[] = [];
  satisfactionLevels: number[] = [1, 2, 3, 4, 5];

  // 月別×カテゴリマトリクス
  monthCategoryMatrix: any[] = [];
  monthCategoryColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['salesData'] || changes['customerData'] || changes['chartData']) {
      this.updateMatrixData();
    }
  }

  private updateMatrixData() {
    if (this.salesData && this.customerData) {
      this.buildCategoryRegionMatrix();
      this.buildAgeSatisfactionMatrix();
      this.buildMonthCategoryMatrix();
    }
  }

  private buildCategoryRegionMatrix() {
    if (!this.salesData) return;

    // 地域とカテゴリの一覧を取得
    this.regions = [...new Set(this.salesData.map(item => item.region))].sort();
    this.categories = [...new Set(this.salesData.map(item => item.category))].sort();

    // マトリクスデータを構築
    this.categoryRegionMatrix = this.categories.map(category => {
      const row: any = { category };
      let total = 0;

      this.regions.forEach(region => {
        const sales = this.salesData!
          .filter(item => item.category === category && item.region === region)
          .reduce((sum, item) => sum + item.sales, 0);
        row[region] = sales;
        total += sales;
      });

      row.total = total;
      return row;
    });

    // カラム定義を設定
    this.categoryRegionColumns = ['category', ...this.regions, 'total'];
  }

  private buildAgeSatisfactionMatrix() {
    if (!this.customerData) return;

    // 年齢層を定義
    const ageGroups = ['18-29', '30-39', '40-49', '50-59', '60+'];

    this.ageSatisfactionMatrix = ageGroups.map(ageGroup => {
      const row: any = { ageGroup };
      let total = 0;

      this.satisfactionLevels.forEach(satisfaction => {
        const count = this.customerData!
          .filter(customer => {
            const age = customer.age;
            const isInAgeGroup = this.isInAgeGroup(age, ageGroup);
            return isInAgeGroup && customer.satisfaction === satisfaction;
          }).length;
        
        row[`satisfaction_${satisfaction}`] = count;
        total += count;
      });

      row.total = total;
      return row;
    });

    // カラム定義を設定
    this.ageSatisfactionColumns = [
      'ageGroup', 
      ...this.satisfactionLevels.map(s => `satisfaction_${s}`), 
      'total'
    ];
  }

  private buildMonthCategoryMatrix() {
    if (!this.salesData) return;

    // 月別データを構築
    const monthlyData = new Map<string, Map<string, number>>();

    this.salesData.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, new Map());
      }

      const monthData = monthlyData.get(monthKey)!;
      const currentValue = monthData.get(item.category) || 0;
      monthData.set(item.category, currentValue + item.sales);
    });

    // マトリクスデータを構築
    this.monthCategoryMatrix = Array.from(monthlyData.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, categoryData]) => {
        const row: any = { month };
        let total = 0;

        this.categories.forEach(category => {
          const sales = categoryData.get(category) || 0;
          row[category] = sales;
          total += sales;
        });

        row.total = total;
        return row;
      });

    // カラム定義を設定
    this.monthCategoryColumns = ['month', ...this.categories, 'total'];
  }

  private isInAgeGroup(age: number, ageGroup: string): boolean {
    switch (ageGroup) {
      case '18-29': return age >= 18 && age <= 29;
      case '30-39': return age >= 30 && age <= 39;
      case '40-49': return age >= 40 && age <= 49;
      case '50-59': return age >= 50 && age <= 59;
      case '60+': return age >= 60;
      default: return false;
    }
  }

  formatCurrency(value: number): string {
    if (!value) return '¥0';
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(value);
  }
}