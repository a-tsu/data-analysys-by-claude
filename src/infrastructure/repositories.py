from abc import ABC, abstractmethod
from typing import List

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