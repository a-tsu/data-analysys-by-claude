import os

import numpy as np
import pandas as pd
import plotly.express as px
import streamlit as st

os.environ["STREAMLIT_BROWSER_GATHER_USAGE_STATS"] = "false"
os.environ["STREAMLIT_TELEMETRY_DISABLED"] = "true"
os.environ["PLOTLY_RENDERER"] = "json"

st.set_page_config(
    page_title="データ分析ダッシュボード",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("📊 データ分析ダッシュボード")
st.markdown("---")


@st.cache_data
def generate_mock_sales_data():
    dates = pd.date_range(start="2024-01-01", end="2024-12-31", freq="D")
    np.random.seed(42)
    sales = (
        np.random.normal(100000, 20000, len(dates))
        + np.sin(np.arange(len(dates)) * 2 * np.pi / 365) * 10000
    )
    sales = np.maximum(sales, 0)

    return pd.DataFrame(
        {
            "date": dates,
            "sales": sales,
            "category": np.random.choice(
                ["電子機器", "衣類", "食品", "本"], len(dates)
            ),
            "region": np.random.choice(["東京", "大阪", "名古屋", "福岡"], len(dates)),
        }
    )


@st.cache_data
def generate_mock_customer_data():
    np.random.seed(123)
    ages = np.random.normal(35, 12, 1000)
    ages = np.clip(ages, 18, 80).astype(int)

    return pd.DataFrame(
        {
            "customer_id": range(1, 1001),
            "age": ages,
            "gender": np.random.choice(["男性", "女性"], 1000),
            "purchase_amount": np.random.exponential(50000, 1000),
            "satisfaction": np.random.choice(
                [1, 2, 3, 4, 5], 1000, p=[0.05, 0.1, 0.2, 0.4, 0.25]
            ),
        }
    )


sales_data = generate_mock_sales_data()
customer_data = generate_mock_customer_data()

sidebar = st.sidebar
sidebar.header("📋 フィルター設定")

with sidebar:
    st.subheader("📅 期間設定")
    date_range = st.date_input(
        "期間を選択",
        value=(sales_data["date"].min(), sales_data["date"].max()),
        min_value=sales_data["date"].min(),
        max_value=sales_data["date"].max(),
    )

    st.subheader("🏷️ カテゴリ設定")
    select_all_categories = st.checkbox("全カテゴリを選択", value=True, key="cat_all")
    if select_all_categories:
        selected_categories = sales_data["category"].unique().tolist()
    else:
        selected_categories = st.multiselect(
            "カテゴリを選択",
            options=sales_data["category"].unique(),
            default=[],
        )

    st.subheader("🗺️ 地域設定")
    select_all_regions = st.checkbox("全地域を選択", value=True, key="reg_all")
    if select_all_regions:
        selected_regions = sales_data["region"].unique().tolist()
    else:
        selected_regions = st.multiselect(
            "地域を選択",
            options=sales_data["region"].unique(),
            default=[],
        )

    st.subheader("💰 売上範囲")
    min_sales = int(sales_data["sales"].min())
    max_sales = int(sales_data["sales"].max())
    sales_range = st.slider(
        "売上範囲を選択",
        min_value=min_sales,
        max_value=max_sales,
        value=(min_sales, max_sales),
        step=10000,
        format="¥%d",
    )

    st.subheader("👥 顧客設定")
    age_range = st.slider(
        "年齢範囲",
        min_value=int(customer_data["age"].min()),
        max_value=int(customer_data["age"].max()),
        value=(int(customer_data["age"].min()), int(customer_data["age"].max())),
        step=1,
    )

    selected_genders = st.multiselect(
        "性別を選択",
        options=customer_data["gender"].unique(),
        default=customer_data["gender"].unique(),
    )

    satisfaction_filter = st.selectbox(
        "満足度フィルター",
        options=["全て", "高満足度 (4-5)", "中満足度 (3)", "低満足度 (1-2)"],
        index=0,
    )

filtered_sales = sales_data[
    (sales_data["date"] >= pd.to_datetime(date_range[0]))
    & (sales_data["date"] <= pd.to_datetime(date_range[1]))
    & (sales_data["category"].isin(selected_categories))
    & (sales_data["region"].isin(selected_regions))
    & (sales_data["sales"] >= sales_range[0])
    & (sales_data["sales"] <= sales_range[1])
]

filtered_customer_data = customer_data[
    (customer_data["age"] >= age_range[0])
    & (customer_data["age"] <= age_range[1])
    & (customer_data["gender"].isin(selected_genders))
]

if satisfaction_filter == "高満足度 (4-5)":
    filtered_customer_data = filtered_customer_data[
        filtered_customer_data["satisfaction"] >= 4
    ]
elif satisfaction_filter == "中満足度 (3)":
    filtered_customer_data = filtered_customer_data[
        filtered_customer_data["satisfaction"] == 3
    ]
elif satisfaction_filter == "低満足度 (1-2)":
    filtered_customer_data = filtered_customer_data[
        filtered_customer_data["satisfaction"] <= 2
    ]

col1, col2, col3, col4 = st.columns(4)

with col1:
    total_sales = filtered_sales["sales"].sum()
    st.metric("総売上", f"¥{total_sales:,.0f}", f"+{np.random.randint(5, 15)}%")

with col2:
    avg_daily_sales = filtered_sales["sales"].mean()
    st.metric(
        "平均日次売上", f"¥{avg_daily_sales:,.0f}", f"+{np.random.randint(2, 8)}%"
    )

with col3:
    total_customers = len(filtered_customer_data)
    st.metric(
        "フィルター適用顧客数", f"{total_customers:,}", f"全体: {len(customer_data):,}"
    )

with col4:
    if len(filtered_customer_data) > 0:
        avg_satisfaction = filtered_customer_data["satisfaction"].mean()
        st.metric(
            "平均満足度",
            f"{avg_satisfaction:.1f}/5",
            f"全体: {customer_data['satisfaction'].mean():.1f}",
        )
    else:
        st.metric("平均満足度", "データなし", "フィルター条件を変更")

st.markdown("---")

col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("📈 売上推移")
    fig_line = px.line(
        filtered_sales.groupby("date")["sales"].sum().reset_index(),
        x="date",
        y="sales",
        title="日次売上推移",
    )
    fig_line.update_layout(height=400)
    st.plotly_chart(
        fig_line,
        use_container_width=True,
        config={
            "displayModeBar": False,
            "staticPlot": True,
            "displaylogo": False,
            "toImageButtonOptions": {"format": "png"},
            "plotlyServerURL": "",
        },
    )

with col2:
    st.subheader("🥧 カテゴリ別売上構成")
    category_sales = filtered_sales.groupby("category")["sales"].sum()
    fig_pie = px.pie(
        values=category_sales.values,
        names=category_sales.index,
        title="カテゴリ別売上シェア",
    )
    fig_pie.update_layout(height=400)
    st.plotly_chart(
        fig_pie,
        use_container_width=True,
        config={
            "displayModeBar": False,
            "staticPlot": True,
            "displaylogo": False,
            "plotlyServerURL": "",
        },
    )

st.markdown("---")

col1, col2 = st.columns(2)

with col1:
    st.subheader("🗺️ 地域別売上")
    region_sales = filtered_sales.groupby("region")["sales"].sum().reset_index()
    fig_bar = px.bar(
        region_sales,
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
        config={
            "displayModeBar": False,
            "staticPlot": True,
            "displaylogo": False,
            "plotlyServerURL": "",
        },
    )

with col2:
    st.subheader("👥 顧客年齢分布")
    if len(filtered_customer_data) > 0:
        fig_hist = px.histogram(
            filtered_customer_data,
            x="age",
            nbins=20,
            title="フィルター適用顧客年齢分布",
            color_discrete_sequence=["#1f77b4"],
        )
        fig_hist.update_layout(height=400)
        st.plotly_chart(
            fig_hist,
            use_container_width=True,
            config={
                "displayModeBar": False,
                "staticPlot": True,
                "displaylogo": False,
                "plotlyServerURL": "",
            },
        )
    else:
        st.info("フィルター条件に該当する顧客データがありません")

st.markdown("---")

st.subheader("📊 詳細データテーブル")

tab1, tab2 = st.tabs(["売上データ", "顧客データ"])

with tab1:
    st.dataframe(filtered_sales.head(100), use_container_width=True, hide_index=True)

with tab2:
    st.dataframe(
        filtered_customer_data.head(100), use_container_width=True, hide_index=True
    )

st.markdown("---")
st.markdown("*このダッシュボードはモックアップデータを使用しています。*")
