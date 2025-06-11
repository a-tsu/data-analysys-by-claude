"""SQLAlchemy ORM models for PostgreSQL."""

from datetime import datetime
from typing import Optional

from sqlalchemy import (
    DECIMAL,
    CheckConstraint,
    Column,
    Date,
    ForeignKey,
    Integer,
    String,
    TIMESTAMP,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from src.infrastructure.database import Base


class Category(Base):
    """Category model for sales categorization."""
    
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    
    # Relationships
    sales = relationship("Sales", back_populates="category")


class Region(Base):
    """Region model for geographical data."""
    
    __tablename__ = "regions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    
    # Relationships
    sales = relationship("Sales", back_populates="region")


class Sales(Base):
    """Sales model for transaction data."""
    
    __tablename__ = "sales"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False, index=True)
    sales = Column(DECIMAL(12, 2), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    region_id = Column(Integer, ForeignKey("regions.id"), nullable=False)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    
    # Constraints
    __table_args__ = (
        CheckConstraint("sales >= 0", name="check_sales_positive"),
    )
    
    # Relationships
    category = relationship("Category", back_populates="sales")
    region = relationship("Region", back_populates="sales")


class Customer(Base):
    """Customer model for customer data."""
    
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, unique=True, nullable=False)
    age = Column(Integer, nullable=False, index=True)
    gender = Column(String(10), nullable=False, index=True)
    purchase_amount = Column(DECIMAL(12, 2), nullable=False)
    satisfaction = Column(Integer, nullable=False, index=True)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    
    # Constraints
    __table_args__ = (
        CheckConstraint("age >= 0 AND age <= 150", name="check_age_range"),
        CheckConstraint("gender IN ('男性', '女性')", name="check_gender_values"),
        CheckConstraint("purchase_amount >= 0", name="check_purchase_amount_positive"),
        CheckConstraint("satisfaction >= 1 AND satisfaction <= 5", name="check_satisfaction_range"),
    )