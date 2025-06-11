import json
from abc import ABC, abstractmethod
from pathlib import Path
from typing import List

import numpy as np
import pandas as pd
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.domain.models import CustomerData, SalesData
from src.infrastructure.models import Category, Customer, Region, Sales


class SalesRepository(ABC):
    @abstractmethod
    async def get_sales_data(self) -> List[SalesData]:
        pass


class CustomerRepository(ABC):
    @abstractmethod
    async def get_customer_data(self) -> List[CustomerData]:
        pass


class PostgreSQLSalesRepository(SalesRepository):
    """PostgreSQL implementation of SalesRepository."""
    
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session
    
    async def get_sales_data(self) -> List[SalesData]:
        """Fetch sales data from PostgreSQL database."""
        stmt = (
            select(Sales)
            .options(
                selectinload(Sales.category),
                selectinload(Sales.region)
            )
            .order_by(Sales.date.desc())
        )
        
        result = await self.db_session.execute(stmt)
        sales_records = result.scalars().all()
        
        return [
            SalesData(
                date=record.date,
                sales=float(record.sales),
                category=record.category.name,
                region=record.region.name
            )
            for record in sales_records
        ]


class PostgreSQLCustomerRepository(CustomerRepository):
    """PostgreSQL implementation of CustomerRepository."""
    
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session
    
    async def get_customer_data(self) -> List[CustomerData]:
        """Fetch customer data from PostgreSQL database."""
        stmt = select(Customer).order_by(Customer.customer_id)
        
        result = await self.db_session.execute(stmt)
        customer_records = result.scalars().all()
        
        return [
            CustomerData(
                customer_id=record.customer_id,
                age=record.age,
                gender=record.gender,
                purchase_amount=float(record.purchase_amount),
                satisfaction=record.satisfaction
            )
            for record in customer_records
        ]


class FileSalesRepository(SalesRepository):
    def __init__(self, file_path: str = "data/sales_data.csv"):
        self.file_path = Path(file_path)

    async def get_sales_data(self) -> List[SalesData]:
        if self.file_path.exists():
            try:
                df = pd.read_csv(self.file_path)
                df["date"] = pd.to_datetime(df["date"])
                return [
                    SalesData(
                        date=row["date"],
                        sales=row["sales"],
                        category=row["category"],
                        region=row["region"]
                    )
                    for _, row in df.iterrows()
                ]
            except Exception:
                pass
        
        return self._generate_mock_sales_data()

    def _generate_mock_sales_data(self) -> List[SalesData]:
        dates = pd.date_range(start="2024-01-01", end="2024-12-31", freq="D")
        np.random.seed(42)
        sales = (
            np.random.normal(100000, 20000, len(dates))
            + np.sin(np.arange(len(dates)) * 2 * np.pi / 365) * 10000
        )
        sales = np.maximum(sales, 0)

        df = pd.DataFrame({
            "date": dates,
            "sales": sales,
            "category": np.random.choice(["電子機器", "衣類", "食品", "本"], len(dates)),
            "region": np.random.choice(["東京", "大阪", "名古屋", "福岡"], len(dates)),
        })

        return [
            SalesData(
                date=row["date"],
                sales=row["sales"],
                category=row["category"],
                region=row["region"]
            )
            for _, row in df.iterrows()
        ]


class FileCustomerRepository(CustomerRepository):
    def __init__(self, file_path: str = "data/customer_data.json"):
        self.file_path = Path(file_path)

    async def get_customer_data(self) -> List[CustomerData]:
        if self.file_path.exists():
            try:
                with open(self.file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                return [
                    CustomerData(
                        customer_id=item["customer_id"],
                        age=item["age"],
                        gender=item["gender"],
                        purchase_amount=item["purchase_amount"],
                        satisfaction=item["satisfaction"]
                    )
                    for item in data
                ]
            except Exception:
                pass
        
        return self._generate_mock_customer_data()

    def _generate_mock_customer_data(self) -> List[CustomerData]:
        np.random.seed(123)
        ages = np.random.normal(35, 12, 1000)
        ages = np.clip(ages, 18, 80).astype(int)

        customers = []
        for i in range(1000):
            customers.append(CustomerData(
                customer_id=i + 1,
                age=ages[i],
                gender=np.random.choice(["男性", "女性"]),
                purchase_amount=np.random.exponential(50000),
                satisfaction=np.random.choice([1, 2, 3, 4, 5], p=[0.05, 0.1, 0.2, 0.4, 0.25])
            ))
        
        return customers