from datetime import datetime
from typing import List, Optional, Tuple

from pydantic import BaseModel


class SalesDataResponse(BaseModel):
    date: datetime
    sales: float
    category: str
    region: str


class CustomerDataResponse(BaseModel):
    customer_id: int
    age: int
    gender: str
    purchase_amount: float
    satisfaction: int


class FilterRequest(BaseModel):
    date_range: Optional[Tuple[datetime, datetime]] = None
    categories: Optional[List[str]] = None
    regions: Optional[List[str]] = None
    sales_range: Optional[Tuple[float, float]] = None
    age_range: Optional[Tuple[int, int]] = None
    genders: Optional[List[str]] = None
    satisfaction_filter: Optional[str] = None


class MetricsResponse(BaseModel):
    total_sales: float
    avg_daily_sales: float
    total_customers: int
    avg_satisfaction: float


class ChartDataPoint(BaseModel):
    x: str
    y: float


class ChartDataResponse(BaseModel):
    line_chart: List[ChartDataPoint]
    pie_chart: List[ChartDataPoint]
    bar_chart: List[ChartDataPoint]
    histogram: List[int]


class FilterOptionsResponse(BaseModel):
    categories: List[str]
    regions: List[str]
    sales_range: Tuple[float, float]
    age_range: Tuple[int, int]
    genders: List[str]