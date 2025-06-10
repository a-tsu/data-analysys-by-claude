import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DataService } from '../../services/data.service';
import { FilterOptions, FilterRequest } from '../../models/data.models';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="filter-panel">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>filter_list</mat-icon>
            フィルター設定
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          
          <!-- 期間設定 -->
          <div class="filter-section">
            <h3>📅 期間設定</h3>
            <mat-form-field appearance="outline">
              <mat-label>開始日</mat-label>
              <input matInput type="date" [(ngModel)]="filters.date_range![0]" (change)="onFiltersChange()">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>終了日</mat-label>
              <input matInput type="date" [(ngModel)]="filters.date_range![1]" (change)="onFiltersChange()">
            </mat-form-field>
          </div>

          <!-- カテゴリ設定 -->
          <div class="filter-section">
            <h3>🏷️ カテゴリ設定</h3>
            <mat-checkbox 
              [(ngModel)]="selectAllCategories" 
              (change)="onSelectAllCategories()">
              全カテゴリを選択
            </mat-checkbox>
            <mat-form-field appearance="outline" *ngIf="!selectAllCategories">
              <mat-label>カテゴリを選択</mat-label>
              <mat-select multiple [(ngModel)]="filters.categories" (selectionChange)="onFiltersChange()">
                <mat-option *ngFor="let category of filterOptions?.categories" [value]="category">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- 地域設定 -->
          <div class="filter-section">
            <h3>🗺️ 地域設定</h3>
            <mat-checkbox 
              [(ngModel)]="selectAllRegions" 
              (change)="onSelectAllRegions()">
              全地域を選択
            </mat-checkbox>
            <mat-form-field appearance="outline" *ngIf="!selectAllRegions">
              <mat-label>地域を選択</mat-label>
              <mat-select multiple [(ngModel)]="filters.regions" (selectionChange)="onFiltersChange()">
                <mat-option *ngFor="let region of filterOptions?.regions" [value]="region">
                  {{region}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- 売上範囲 -->
          <div class="filter-section">
            <h3>💰 売上範囲</h3>
            <mat-slider
              min="0"
              [max]="filterOptions?.sales_range?.[1] || 100000"
              step="10000"
              discrete
              [displayWith]="formatSales">
              <input matSliderStartThumb [(ngModel)]="filters.sales_range![0]" (ngModelChange)="onFiltersChange()">
              <input matSliderEndThumb [(ngModel)]="filters.sales_range![1]" (ngModelChange)="onFiltersChange()">
            </mat-slider>
            <div class="range-display">
              ¥{{filters.sales_range![0] | number}} - ¥{{filters.sales_range![1] | number}}
            </div>
          </div>

          <!-- 年齢範囲 -->
          <div class="filter-section">
            <h3>👥 年齢範囲</h3>
            <mat-slider
              min="18"
              max="80"
              step="1"
              discrete>
              <input matSliderStartThumb [(ngModel)]="filters.age_range![0]" (ngModelChange)="onFiltersChange()">
              <input matSliderEndThumb [(ngModel)]="filters.age_range![1]" (ngModelChange)="onFiltersChange()">
            </mat-slider>
            <div class="range-display">
              {{filters.age_range![0]}}歳 - {{filters.age_range![1]}}歳
            </div>
          </div>

          <!-- 性別 -->
          <div class="filter-section">
            <h3>👤 性別</h3>
            <mat-form-field appearance="outline">
              <mat-label>性別を選択</mat-label>
              <mat-select multiple [(ngModel)]="filters.genders" (selectionChange)="onFiltersChange()">
                <mat-option *ngFor="let gender of filterOptions?.genders" [value]="gender">
                  {{gender}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- 満足度 -->
          <div class="filter-section">
            <h3>⭐ 満足度フィルター</h3>
            <mat-form-field appearance="outline">
              <mat-label>満足度</mat-label>
              <mat-select [(ngModel)]="filters.satisfaction_filter" (selectionChange)="onFiltersChange()">
                <mat-option value="">全て</mat-option>
                <mat-option value="高満足度 (4-5)">高満足度 (4-5)</mat-option>
                <mat-option value="中満足度 (3)">中満足度 (3)</mat-option>
                <mat-option value="低満足度 (1-2)">低満足度 (1-2)</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .filter-panel {
      width: 100%;
      max-width: 320px;
    }

    .filter-section {
      margin-bottom: 24px;
    }

    .filter-section h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 500;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 8px;
    }

    mat-slider {
      width: 100%;
      margin: 8px 0;
    }

    .range-display {
      text-align: center;
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }

    mat-checkbox {
      margin-bottom: 8px;
    }

    mat-card-content {
      padding: 16px;
    }
  `]
})
export class FilterPanelComponent implements OnInit {
  filterOptions: FilterOptions | null = null;
  selectAllCategories = true;
  selectAllRegions = true;

  filters: FilterRequest = {
    date_range: ['2024-01-01', '2024-12-31'],
    categories: [],
    regions: [],
    sales_range: [0, 100000],
    age_range: [18, 80],
    genders: [],
    satisfaction_filter: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadFilterOptions();
  }

  loadFilterOptions() {
    this.dataService.getFilterOptions().subscribe(options => {
      this.filterOptions = options;
      this.initializeFilters();
    });
  }

  initializeFilters() {
    if (this.filterOptions) {
      this.filters = {
        date_range: ['2024-01-01', '2024-12-31'],
        categories: [...this.filterOptions.categories],
        regions: [...this.filterOptions.regions],
        sales_range: [...this.filterOptions.sales_range],
        age_range: [...this.filterOptions.age_range],
        genders: [...this.filterOptions.genders],
        satisfaction_filter: ''
      };
      this.onFiltersChange();
    }
  }

  onSelectAllCategories() {
    if (this.selectAllCategories && this.filterOptions) {
      this.filters.categories = [...this.filterOptions.categories];
    } else {
      this.filters.categories = [];
    }
    this.onFiltersChange();
  }

  onSelectAllRegions() {
    if (this.selectAllRegions && this.filterOptions) {
      this.filters.regions = [...this.filterOptions.regions];
    } else {
      this.filters.regions = [];
    }
    this.onFiltersChange();
  }

  onFiltersChange() {
    this.dataService.updateFilters(this.filters);
  }

  formatSales(value: number): string {
    return `¥${value.toLocaleString()}`;
  }
}