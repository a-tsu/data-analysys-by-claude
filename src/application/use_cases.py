from datetime import datetime
from typing import List

import pandas as pd

from src.domain.models import (
    ChartData,
    CustomerData,
    FilterCriteria,
    SalesData,
    SalesMetrics,
)
from src.infrastructure.repositories import CustomerRepository, SalesRepository


class DataAnalysisUseCase:
    def __init__(
        self, 
        sales_repository: SalesRepository,
        customer_repository: CustomerRepository
    ):
        self.sales_repository = sales_repository
        self.customer_repository = customer_repository

    async def get_filtered_sales_data(self, filters: FilterCriteria) -> List[SalesData]:
        sales_data = await self.sales_repository.get_sales_data()
        
        if not filters:
            return sales_data
        
        filtered_data = []
        for sale in sales_data:
            if self._matches_sales_filters(sale, filters):
                filtered_data.append(sale)
        
        return filtered_data

    async def get_filtered_customer_data(self, filters: FilterCriteria) -> List[CustomerData]:
        customer_data = await self.customer_repository.get_customer_data()
        
        if not filters:
            return customer_data
        
        filtered_data = []
        for customer in customer_data:
            if self._matches_customer_filters(customer, filters):
                filtered_data.append(customer)
        
        return filtered_data

    def calculate_metrics(
        self, 
        sales_data: List[SalesData], 
        customer_data: List[CustomerData]
    ) -> SalesMetrics:
        total_sales = sum(sale.sales for sale in sales_data)
        avg_daily_sales = total_sales / len(sales_data) if sales_data else 0
        total_customers = len(customer_data)
        avg_satisfaction = (
            sum(customer.satisfaction for customer in customer_data) / len(customer_data)
            if customer_data else 0
        )
        
        return SalesMetrics(
            total_sales=total_sales,
            avg_daily_sales=avg_daily_sales,
            total_customers=total_customers,
            avg_satisfaction=avg_satisfaction,
        )

    def generate_chart_data(
        self, 
        sales_data: List[SalesData], 
        customer_data: List[CustomerData]
    ) -> ChartData:
        df_sales = pd.DataFrame([
            {"date": sale.date, "sales": sale.sales, "category": sale.category, "region": sale.region}
            for sale in sales_data
        ])
        
        line_chart_data = []
        if not df_sales.empty:
            daily_sales = df_sales.groupby("date")["sales"].sum()
            line_chart_data = [(date, sales) for date, sales in daily_sales.items()]
        
        pie_chart_data = []
        if not df_sales.empty:
            category_sales = df_sales.groupby("category")["sales"].sum()
            pie_chart_data = [(category, sales) for category, sales in category_sales.items()]
        
        bar_chart_data = []
        if not df_sales.empty:
            region_sales = df_sales.groupby("region")["sales"].sum()
            bar_chart_data = [(region, sales) for region, sales in region_sales.items()]
        
        histogram_data = [customer.age for customer in customer_data] if customer_data else []
        
        return ChartData(
            line_chart_data=line_chart_data,
            pie_chart_data=pie_chart_data,
            bar_chart_data=bar_chart_data,
            histogram_data=histogram_data,
        )

    def _matches_sales_filters(self, sale: SalesData, filters: FilterCriteria) -> bool:
        if filters.date_range:
            sale_date = sale.date.date() if hasattr(sale.date, 'date') else sale.date
            start_date = filters.date_range[0].date() if hasattr(filters.date_range[0], 'date') else filters.date_range[0]
            end_date = filters.date_range[1].date() if hasattr(filters.date_range[1], 'date') else filters.date_range[1]
            if not (start_date <= sale_date <= end_date):
                return False
        
        if filters.categories and sale.category not in filters.categories:
            return False
        
        if filters.regions and sale.region not in filters.regions:
            return False
        
        if filters.sales_range and not (
            filters.sales_range[0] <= sale.sales <= filters.sales_range[1]
        ):
            return False
        
        return True

    def _matches_customer_filters(self, customer: CustomerData, filters: FilterCriteria) -> bool:
        if filters.age_range and not (
            filters.age_range[0] <= customer.age <= filters.age_range[1]
        ):
            return False
        
        if filters.genders and customer.gender not in filters.genders:
            return False
        
        if filters.satisfaction_filter:
            if filters.satisfaction_filter == "高満足度 (4-5)" and customer.satisfaction < 4:
                return False
            elif filters.satisfaction_filter == "中満足度 (3)" and customer.satisfaction != 3:
                return False
            elif filters.satisfaction_filter == "低満足度 (1-2)" and customer.satisfaction > 2:
                return False
        
        return True