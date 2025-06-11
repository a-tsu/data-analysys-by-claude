from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from backend.api.models import (
    ChartDataPoint,
    ChartDataResponse,
    CustomerDataResponse,
    FilterOptionsResponse,
    FilterRequest,
    MetricsResponse,
    SalesDataResponse,
)
from src.application.use_cases import DataAnalysisUseCase
from src.config import DIContainer
from src.domain.models import FilterCriteria
from src.infrastructure.database import get_database

router = APIRouter()


async def get_use_case(db: AsyncSession = Depends(get_database)) -> DataAnalysisUseCase:
    container = DIContainer(db_session=db)
    return container.data_analysis_use_case


@router.get("/api/filter-options", response_model=FilterOptionsResponse)
async def get_filter_options(use_case: DataAnalysisUseCase = Depends(get_use_case)):
    sales_data = await use_case.sales_repository.get_sales_data()
    customer_data = await use_case.customer_repository.get_customer_data()
    
    categories = list(set(sale.category for sale in sales_data))
    regions = list(set(sale.region for sale in sales_data))
    sales_range = (
        min(sale.sales for sale in sales_data),
        max(sale.sales for sale in sales_data)
    )
    age_range = (
        min(customer.age for customer in customer_data),
        max(customer.age for customer in customer_data)
    )
    genders = list(set(customer.gender for customer in customer_data))
    
    return FilterOptionsResponse(
        categories=categories,
        regions=regions,
        sales_range=sales_range,
        age_range=age_range,
        genders=genders
    )


@router.post("/api/sales", response_model=List[SalesDataResponse])
async def get_sales_data(
    filter_request: FilterRequest,
    use_case: DataAnalysisUseCase = Depends(get_use_case)
):
    filters = FilterCriteria(
        date_range=filter_request.date_range,
        categories=filter_request.categories,
        regions=filter_request.regions,
        sales_range=filter_request.sales_range,
        age_range=filter_request.age_range,
        genders=filter_request.genders,
        satisfaction_filter=filter_request.satisfaction_filter
    )
    
    sales_data = await use_case.get_filtered_sales_data(filters)
    
    return [
        SalesDataResponse(
            date=sale.date,
            sales=sale.sales,
            category=sale.category,
            region=sale.region
        )
        for sale in sales_data
    ]


@router.post("/api/customers", response_model=List[CustomerDataResponse])
async def get_customer_data(
    filter_request: FilterRequest,
    use_case: DataAnalysisUseCase = Depends(get_use_case)
):
    filters = FilterCriteria(
        date_range=filter_request.date_range,
        categories=filter_request.categories,
        regions=filter_request.regions,
        sales_range=filter_request.sales_range,
        age_range=filter_request.age_range,
        genders=filter_request.genders,
        satisfaction_filter=filter_request.satisfaction_filter
    )
    
    customer_data = await use_case.get_filtered_customer_data(filters)
    
    return [
        CustomerDataResponse(
            customer_id=customer.customer_id,
            age=customer.age,
            gender=customer.gender,
            purchase_amount=customer.purchase_amount,
            satisfaction=customer.satisfaction
        )
        for customer in customer_data
    ]


@router.post("/api/metrics", response_model=MetricsResponse)
async def get_metrics(
    filter_request: FilterRequest,
    use_case: DataAnalysisUseCase = Depends(get_use_case)
):
    filters = FilterCriteria(
        date_range=filter_request.date_range,
        categories=filter_request.categories,
        regions=filter_request.regions,
        sales_range=filter_request.sales_range,
        age_range=filter_request.age_range,
        genders=filter_request.genders,
        satisfaction_filter=filter_request.satisfaction_filter
    )
    
    sales_data = await use_case.get_filtered_sales_data(filters)
    customer_data = await use_case.get_filtered_customer_data(filters)
    
    metrics = use_case.calculate_metrics(sales_data, customer_data)
    
    return MetricsResponse(
        total_sales=metrics.total_sales,
        avg_daily_sales=metrics.avg_daily_sales,
        total_customers=metrics.total_customers,
        avg_satisfaction=metrics.avg_satisfaction
    )


@router.post("/api/chart-data", response_model=ChartDataResponse)
async def get_chart_data(
    filter_request: FilterRequest,
    use_case: DataAnalysisUseCase = Depends(get_use_case)
):
    filters = FilterCriteria(
        date_range=filter_request.date_range,
        categories=filter_request.categories,
        regions=filter_request.regions,
        sales_range=filter_request.sales_range,
        age_range=filter_request.age_range,
        genders=filter_request.genders,
        satisfaction_filter=filter_request.satisfaction_filter
    )
    
    sales_data = await use_case.get_filtered_sales_data(filters)
    customer_data = await use_case.get_filtered_customer_data(filters)
    
    chart_data = use_case.generate_chart_data(sales_data, customer_data)
    
    line_chart = [
        ChartDataPoint(x=date.strftime("%Y-%m-%d"), y=sales)
        for date, sales in chart_data.line_chart_data
    ]
    
    pie_chart = [
        ChartDataPoint(x=category, y=sales)
        for category, sales in chart_data.pie_chart_data
    ]
    
    bar_chart = [
        ChartDataPoint(x=region, y=sales)
        for region, sales in chart_data.bar_chart_data
    ]
    
    return ChartDataResponse(
        line_chart=line_chart,
        pie_chart=pie_chart,
        bar_chart=bar_chart,
        histogram=chart_data.histogram_data
    )