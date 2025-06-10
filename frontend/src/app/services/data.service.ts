import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { 
  SalesData, 
  CustomerData, 
  FilterRequest, 
  Metrics, 
  ChartData, 
  FilterOptions 
} from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = 'http://localhost:8000/api';
  private filtersSubject = new BehaviorSubject<FilterRequest>({});
  
  public filters$ = this.filtersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFilterOptions(): Observable<FilterOptions> {
    return this.http.get<FilterOptions>(`${this.apiUrl}/filter-options`);
  }

  getSalesData(filters: FilterRequest): Observable<SalesData[]> {
    return this.http.post<SalesData[]>(`${this.apiUrl}/sales`, filters);
  }

  getCustomerData(filters: FilterRequest): Observable<CustomerData[]> {
    return this.http.post<CustomerData[]>(`${this.apiUrl}/customers`, filters);
  }

  getMetrics(filters: FilterRequest): Observable<Metrics> {
    return this.http.post<Metrics>(`${this.apiUrl}/metrics`, filters);
  }

  getChartData(filters: FilterRequest): Observable<ChartData> {
    return this.http.post<ChartData>(`${this.apiUrl}/chart-data`, filters);
  }

  updateFilters(filters: FilterRequest): void {
    this.filtersSubject.next(filters);
  }

  getCurrentFilters(): FilterRequest {
    return this.filtersSubject.value;
  }
}