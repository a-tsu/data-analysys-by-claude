import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SalesData, CustomerData } from '../../models/data.models';

@Component({
  selector: 'app-data-tables',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>📊 詳細データテーブル</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group>
          <mat-tab label="売上データ">
            <div class="table-container">
              <table mat-table [dataSource]="salesDataSource" class="mat-elevation-z0">
                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef>日付</th>
                  <td mat-cell *matCellDef="let element">{{element.date | date:'yyyy/MM/dd'}}</td>
                </ng-container>

                <ng-container matColumnDef="sales">
                  <th mat-header-cell *matHeaderCellDef>売上</th>
                  <td mat-cell *matCellDef="let element">¥{{element.sales | number:'1.0-0'}}</td>
                </ng-container>

                <ng-container matColumnDef="category">
                  <th mat-header-cell *matHeaderCellDef>カテゴリ</th>
                  <td mat-cell *matCellDef="let element">{{element.category}}</td>
                </ng-container>

                <ng-container matColumnDef="region">
                  <th mat-header-cell *matHeaderCellDef>地域</th>
                  <td mat-cell *matCellDef="let element">{{element.region}}</td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="salesDisplayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: salesDisplayedColumns;"></tr>
              </table>
              
              <mat-paginator
                [pageSizeOptions]="[10, 25, 50, 100]"
                [pageSize]="25"
                [showFirstLastButtons]="true"
                aria-label="売上データのページング">
              </mat-paginator>
            </div>
          </mat-tab>

          <mat-tab label="顧客データ">
            <div class="table-container">
              <table mat-table [dataSource]="customerDataSource" class="mat-elevation-z0">
                <ng-container matColumnDef="customer_id">
                  <th mat-header-cell *matHeaderCellDef>顧客ID</th>
                  <td mat-cell *matCellDef="let element">{{element.customer_id}}</td>
                </ng-container>

                <ng-container matColumnDef="age">
                  <th mat-header-cell *matHeaderCellDef>年齢</th>
                  <td mat-cell *matCellDef="let element">{{element.age}}歳</td>
                </ng-container>

                <ng-container matColumnDef="gender">
                  <th mat-header-cell *matHeaderCellDef>性別</th>
                  <td mat-cell *matCellDef="let element">{{element.gender}}</td>
                </ng-container>

                <ng-container matColumnDef="purchase_amount">
                  <th mat-header-cell *matHeaderCellDef>購入金額</th>
                  <td mat-cell *matCellDef="let element">¥{{element.purchase_amount | number:'1.0-0'}}</td>
                </ng-container>

                <ng-container matColumnDef="satisfaction">
                  <th mat-header-cell *matHeaderCellDef>満足度</th>
                  <td mat-cell *matCellDef="let element">
                    <span class="satisfaction-badge satisfaction-{{element.satisfaction}}">
                      {{element.satisfaction}}
                    </span>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="customerDisplayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: customerDisplayedColumns;"></tr>
              </table>
              
              <mat-paginator
                [pageSizeOptions]="[10, 25, 50, 100]"
                [pageSize]="25"
                [showFirstLastButtons]="true"
                aria-label="顧客データのページング">
              </mat-paginator>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .table-container {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      min-width: 600px;
    }

    mat-card-content {
      padding: 0;
    }

    .mat-mdc-tab-body-wrapper {
      padding: 16px;
    }

    .satisfaction-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 12px;
      color: white;
      font-weight: 500;
      font-size: 12px;
      min-width: 20px;
      text-align: center;
    }

    .satisfaction-1,
    .satisfaction-2 {
      background-color: #f44336;
    }

    .satisfaction-3 {
      background-color: #ff9800;
    }

    .satisfaction-4,
    .satisfaction-5 {
      background-color: #4caf50;
    }

    mat-paginator {
      border-top: 1px solid #e0e0e0;
    }

    .mat-mdc-tab-group {
      width: 100%;
    }

    @media (max-width: 768px) {
      table {
        min-width: 500px;
      }
    }
  `]
})
export class DataTablesComponent {
  @Input() set salesData(data: SalesData[] | null) {
    this.salesDataSource = data?.slice(0, 100) || [];
  }

  @Input() set customerData(data: CustomerData[] | null) {
    this.customerDataSource = data?.slice(0, 100) || [];
  }

  salesDataSource: SalesData[] = [];
  customerDataSource: CustomerData[] = [];

  salesDisplayedColumns: string[] = ['date', 'sales', 'category', 'region'];
  customerDisplayedColumns: string[] = ['customer_id', 'age', 'gender', 'purchase_amount', 'satisfaction'];
}