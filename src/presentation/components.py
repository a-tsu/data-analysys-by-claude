from datetime import datetime
from typing import List, Tuple

import plotly.express as px
import streamlit as st

from src.domain.models import ChartData, FilterCriteria, SalesMetrics


class FilterComponent:
    @staticmethod
    def render_filters(
        sales_categories: List[str],
        sales_regions: List[str], 
        sales_min: float,
        sales_max: float,
        customer_ages: Tuple[int, int],
        customer_genders: List[str]
    ) -> FilterCriteria:
        sidebar = st.sidebar
        sidebar.header("📋 フィルター設定")

        with sidebar:
            st.subheader("📅 期間設定")
            date_range = st.date_input(
                "期間を選択",
                value=(datetime(2024, 1, 1), datetime(2024, 12, 31)),
                min_value=datetime(2024, 1, 1),
                max_value=datetime(2024, 12, 31),
            )

            st.subheader("🏷️ カテゴリ設定")
            select_all_categories = st.checkbox("全カテゴリを選択", value=True, key="cat_all")
            if select_all_categories:
                selected_categories = sales_categories
            else:
                selected_categories = st.multiselect(
                    "カテゴリを選択",
                    options=sales_categories,
                    default=[],
                )

            st.subheader("🗺️ 地域設定")
            select_all_regions = st.checkbox("全地域を選択", value=True, key="reg_all")
            if select_all_regions:
                selected_regions = sales_regions
            else:
                selected_regions = st.multiselect(
                    "地域を選択",
                    options=sales_regions,
                    default=[],
                )

            st.subheader("💰 売上範囲")
            sales_range = st.slider(
                "売上範囲を選択",
                min_value=int(sales_min),
                max_value=int(sales_max),
                value=(int(sales_min), int(sales_max)),
                step=10000,
                format="¥%d",
            )

            st.subheader("👥 顧客設定")
            age_range = st.slider(
                "年齢範囲",
                min_value=customer_ages[0],
                max_value=customer_ages[1],
                value=customer_ages,
                step=1,
            )

            selected_genders = st.multiselect(
                "性別を選択",
                options=customer_genders,
                default=customer_genders,
            )

            satisfaction_filter = st.selectbox(
                "満足度フィルター",
                options=["全て", "高満足度 (4-5)", "中満足度 (3)", "低満足度 (1-2)"],
                index=0,
            )

        return FilterCriteria(
            date_range=(datetime.combine(date_range[0], datetime.min.time()), 
                       datetime.combine(date_range[1], datetime.min.time())),
            categories=selected_categories,
            regions=selected_regions,
            sales_range=sales_range,
            age_range=age_range,
            genders=selected_genders,
            satisfaction_filter=satisfaction_filter if satisfaction_filter != "全て" else None,
        )


class MetricsComponent:
    @staticmethod
    def render_metrics(metrics: SalesMetrics, total_customers_original: int):
        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric("総売上", f"¥{metrics.total_sales:,.0f}", "+5%")

        with col2:
            st.metric("平均日次売上", f"¥{metrics.avg_daily_sales:,.0f}", "+3%")

        with col3:
            st.metric(
                "フィルター適用顧客数", 
                f"{metrics.total_customers:,}", 
                f"全体: {total_customers_original:,}"
            )

        with col4:
            if metrics.total_customers > 0:
                st.metric(
                    "平均満足度",
                    f"{metrics.avg_satisfaction:.1f}/5",
                    "全体平均と比較"
                )
            else:
                st.metric("平均満足度", "データなし", "フィルター条件を変更")


class ChartComponent:
    @staticmethod
    def render_charts(chart_data: ChartData):
        st.markdown("---")

        col1, col2 = st.columns([2, 1])

        with col1:
            st.subheader("📈 売上推移")
            if chart_data.line_chart_data:
                import pandas as pd
                line_df = pd.DataFrame(chart_data.line_chart_data, columns=["date", "sales"])
                fig_line = px.line(
                    line_df,
                    x="date",
                    y="sales",
                    title="日次売上推移",
                )
                fig_line.update_layout(height=400)
                st.plotly_chart(
                    fig_line,
                    use_container_width=True,
                    config=ChartComponent._get_chart_config(),
                )
            else:
                st.info("データがありません")

        with col2:
            st.subheader("🥧 カテゴリ別売上構成")
            if chart_data.pie_chart_data:
                categories, values = zip(*chart_data.pie_chart_data)
                fig_pie = px.pie(
                    values=values,
                    names=categories,
                    title="カテゴリ別売上シェア",
                )
                fig_pie.update_layout(height=400)
                st.plotly_chart(
                    fig_pie,
                    use_container_width=True,
                    config=ChartComponent._get_chart_config(),
                )
            else:
                st.info("データがありません")

        st.markdown("---")

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("🗺️ 地域別売上")
            if chart_data.bar_chart_data:
                import pandas as pd
                bar_df = pd.DataFrame(chart_data.bar_chart_data, columns=["region", "sales"])
                fig_bar = px.bar(
                    bar_df,
                    x="region",
                    y="sales",
                    title="地域別売上比較",
                    color="sales",
                    color_continuous_scale="Blues",
                )
                fig_bar.update_layout(height=400)
                st.plotly_chart(
                    fig_bar,
                    use_container_width=True,
                    config=ChartComponent._get_chart_config(),
                )
            else:
                st.info("データがありません")

        with col2:
            st.subheader("👥 顧客年齢分布")
            if chart_data.histogram_data:
                import pandas as pd
                hist_df = pd.DataFrame({"age": chart_data.histogram_data})
                fig_hist = px.histogram(
                    hist_df,
                    x="age",
                    nbins=20,
                    title="フィルター適用顧客年齢分布",
                    color_discrete_sequence=["#1f77b4"],
                )
                fig_hist.update_layout(height=400)
                st.plotly_chart(
                    fig_hist,
                    use_container_width=True,
                    config=ChartComponent._get_chart_config(),
                )
            else:
                st.info("フィルター条件に該当する顧客データがありません")

    @staticmethod
    def _get_chart_config():
        return {
            "displayModeBar": False,
            "staticPlot": True,
            "displaylogo": False,
            "toImageButtonOptions": {"format": "png"},
            "plotlyServerURL": "",
        }


class DataTableComponent:
    @staticmethod
    def render_data_tables(sales_data: List, customer_data: List):
        st.markdown("---")
        st.subheader("📊 詳細データテーブル")

        tab1, tab2 = st.tabs(["売上データ", "顧客データ"])

        with tab1:
            if sales_data:
                import pandas as pd
                sales_df = pd.DataFrame([
                    {
                        "日付": sale.date.strftime("%Y-%m-%d"),
                        "売上": f"¥{sale.sales:,.0f}",
                        "カテゴリ": sale.category,
                        "地域": sale.region
                    }
                    for sale in sales_data[:100]
                ])
                st.dataframe(sales_df, use_container_width=True, hide_index=True)
            else:
                st.info("表示するデータがありません")

        with tab2:
            if customer_data:
                import pandas as pd
                customer_df = pd.DataFrame([
                    {
                        "顧客ID": customer.customer_id,
                        "年齢": customer.age,
                        "性別": customer.gender,
                        "購入金額": f"¥{customer.purchase_amount:,.0f}",
                        "満足度": customer.satisfaction
                    }
                    for customer in customer_data[:100]
                ])
                st.dataframe(customer_df, use_container_width=True, hide_index=True)
            else:
                st.info("表示するデータがありません")