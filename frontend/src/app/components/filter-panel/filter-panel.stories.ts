import type { Meta, StoryObj } from '@storybook/angular';
import { FilterPanelComponent } from './filter-panel.component';
import { DataService } from '../../services/data.service';
import { FilterOptions } from '../../models/data.models';
import { of } from 'rxjs';

const mockFilterOptions: FilterOptions = {
  categories: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'],
  regions: ['東京', '大阪', '名古屋', '福岡', '札幌'],
  sales_range: [0, 500000],
  age_range: [18, 80],
  genders: ['男性', '女性']
};

// Mock DataService
class MockDataService {
  getFilterOptions() {
    return of(mockFilterOptions);
  }
  
  updateFilters(filters: any) {
    // Mock method
  }
}

const meta: Meta<FilterPanelComponent> = {
  title: 'Components/FilterPanel',
  component: FilterPanelComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      ...story(),
      providers: [
        { provide: DataService, useClass: MockDataService }
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FilterPanelComponent>;

export const Default: Story = {};

export const WithLimitedOptions: Story = {
  decorators: [
    (story) => ({
      ...story(),
      providers: [
        {
          provide: DataService,
          useValue: {
            getFilterOptions: () => of({
              categories: ['Books', 'Electronics'],
              regions: ['東京', '大阪'],
              sales_range: [0, 100000],
              age_range: [25, 65],
              genders: ['男性', '女性']
            }),
            updateFilters: () => {}
          }
        }
      ],
    }),
  ],
};

export const WithExtensiveOptions: Story = {
  decorators: [
    (story) => ({
      ...story(),
      providers: [
        {
          provide: DataService,
          useValue: {
            getFilterOptions: () => of({
              categories: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports', 'Automotive', 'Health', 'Beauty', 'Toys', 'Garden'],
              regions: ['東京', '大阪', '名古屋', '福岡', '札幌', '広島', '仙台', '神戸', '京都', '横浜'],
              sales_range: [0, 1000000],
              age_range: [16, 85],
              genders: ['男性', '女性', 'その他']
            }),
            updateFilters: () => {}
          }
        }
      ],
    }),
  ],
};

export const EmptyOptions: Story = {
  decorators: [
    (story) => ({
      ...story(),
      providers: [
        {
          provide: DataService,
          useValue: {
            getFilterOptions: () => of({
              categories: [],
              regions: [],
              sales_range: [0, 0],
              age_range: [0, 0],
              genders: []
            }),
            updateFilters: () => {}
          }
        }
      ],
    }),
  ],
};