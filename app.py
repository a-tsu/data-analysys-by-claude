import streamlit as st

from src.config import DIContainer
from src.presentation.components import (
    ChartComponent,
    DataTableComponent,
    FilterComponent,
    MetricsComponent,
)

container = DIContainer()

st.set_page_config(
    page_title="データ分析ダッシュボード",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("📊 データ分析ダッシュボード")
st.markdown("---")

@st.cache_data
def load_initial_data():
    use_case = container.data_analysis_use_case
    sales_data = use_case.sales_repository.get_sales_data()
    customer_data = use_case.customer_repository.get_customer_data()
    return sales_data, customer_data

sales_data, customer_data = load_initial_data()

sales_categories = list(set(sale.category for sale in sales_data))
sales_regions = list(set(sale.region for sale in sales_data))
sales_min = min(sale.sales for sale in sales_data)
sales_max = max(sale.sales for sale in sales_data)
customer_ages = (
    min(customer.age for customer in customer_data),
    max(customer.age for customer in customer_data),
)
customer_genders = list(set(customer.gender for customer in customer_data))

filters = FilterComponent.render_filters(
    sales_categories=sales_categories,
    sales_regions=sales_regions,
    sales_min=sales_min,
    sales_max=sales_max,
    customer_ages=customer_ages,
    customer_genders=customer_genders,
)

use_case = container.data_analysis_use_case
filtered_sales = use_case.get_filtered_sales_data(filters)
filtered_customers = use_case.get_filtered_customer_data(filters)

metrics = use_case.calculate_metrics(filtered_sales, filtered_customers)
chart_data = use_case.generate_chart_data(filtered_sales, filtered_customers)

MetricsComponent.render_metrics(metrics, len(customer_data))
ChartComponent.render_charts(chart_data)
DataTableComponent.render_data_tables(filtered_sales, filtered_customers)

st.markdown("---")
st.markdown("*このダッシュボードはモックアップデータを使用しています。*")
