from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional


@dataclass
class SalesData:
    date: datetime
    sales: float
    category: str
    region: str


@dataclass
class CustomerData:
    customer_id: int
    age: int
    gender: str
    purchase_amount: float
    satisfaction: int


@dataclass
class FilterCriteria:
    date_range: Optional[tuple[datetime, datetime]] = None
    categories: Optional[List[str]] = None
    regions: Optional[List[str]] = None
    sales_range: Optional[tuple[float, float]] = None
    age_range: Optional[tuple[int, int]] = None
    genders: Optional[List[str]] = None
    satisfaction_filter: Optional[str] = None


@dataclass
class SalesMetrics:
    total_sales: float
    avg_daily_sales: float
    total_customers: int
    avg_satisfaction: float


@dataclass
class ChartData:
    line_chart_data: List[tuple[datetime, float]]
    pie_chart_data: List[tuple[str, float]]
    bar_chart_data: List[tuple[str, float]]
    histogram_data: List[int]