#!/usr/bin/env python3
"""
Data migration script to move CSV/JSON data to PostgreSQL.
Usage: python database/migrations/migrate_data.py
"""

import asyncio
import json
import os
import sys
from pathlib import Path

import pandas as pd
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

# Add src to Python path
sys.path.append(str(Path(__file__).parent.parent.parent))

from src.infrastructure.database import AsyncSessionLocal, engine
from src.infrastructure.models import Category, Customer, Region, Sales


async def migrate_categories_and_regions():
    """Migrate categories and regions from CSV data."""
    print("📊 Migrating categories and regions...")
    
    async with AsyncSessionLocal() as session:
        # Read CSV file to get unique categories and regions
        csv_path = Path("data/sales_data.csv")
        if not csv_path.exists():
            print(f"❌ CSV file not found: {csv_path}")
            return
        
        df = pd.read_csv(csv_path)
        
        # Get unique categories
        unique_categories = df['category'].unique()
        for category_name in unique_categories:
            # Check if category already exists
            stmt = select(Category).where(Category.name == category_name)
            result = await session.execute(stmt)
            existing = result.scalar_one_or_none()
            
            if not existing:
                new_category = Category(name=category_name)
                session.add(new_category)
                print(f"  ✅ Added category: {category_name}")
        
        # Get unique regions
        unique_regions = df['region'].unique()
        for region_name in unique_regions:
            # Check if region already exists
            stmt = select(Region).where(Region.name == region_name)
            result = await session.execute(stmt)
            existing = result.scalar_one_or_none()
            
            if not existing:
                new_region = Region(name=region_name)
                session.add(new_region)
                print(f"  ✅ Added region: {region_name}")
        
        await session.commit()
        print("✅ Categories and regions migration completed!")


async def migrate_sales_data():
    """Migrate sales data from CSV to PostgreSQL."""
    print("💰 Migrating sales data...")
    
    async with AsyncSessionLocal() as session:
        # Read CSV file
        csv_path = Path("data/sales_data.csv")
        if not csv_path.exists():
            print(f"❌ CSV file not found: {csv_path}")
            return
        
        df = pd.read_csv(csv_path)
        df['date'] = pd.to_datetime(df['date']).dt.date
        
        # Get category and region mappings
        categories_stmt = select(Category)
        categories_result = await session.execute(categories_stmt)
        categories = {cat.name: cat.id for cat in categories_result.scalars().all()}
        
        regions_stmt = select(Region)
        regions_result = await session.execute(regions_stmt)
        regions = {reg.name: reg.id for reg in regions_result.scalars().all()}
        
        # Check existing sales records to avoid duplicates
        existing_stmt = select(Sales)
        existing_result = await session.execute(existing_stmt)
        existing_count = len(existing_result.scalars().all())
        
        if existing_count > 0:
            print(f"  ℹ️ Found {existing_count} existing sales records, skipping duplicate migration")
            return
        
        # Migrate sales data
        sales_records = []
        for _, row in df.iterrows():
            sales_record = Sales(
                date=row['date'],
                sales=float(row['sales']),
                category_id=categories[row['category']],
                region_id=regions[row['region']]
            )
            sales_records.append(sales_record)
        
        session.add_all(sales_records)
        await session.commit()
        
        print(f"  ✅ Migrated {len(sales_records)} sales records")
        print("✅ Sales data migration completed!")


async def migrate_customer_data():
    """Migrate customer data from JSON to PostgreSQL."""
    print("👥 Migrating customer data...")
    
    async with AsyncSessionLocal() as session:
        # Read JSON file
        json_path = Path("data/customer_data.json")
        if not json_path.exists():
            print(f"❌ JSON file not found: {json_path}")
            return
        
        with open(json_path, 'r', encoding='utf-8') as f:
            customer_data = json.load(f)
        
        # Check existing customer records to avoid duplicates
        existing_stmt = select(Customer)
        existing_result = await session.execute(existing_stmt)
        existing_count = len(existing_result.scalars().all())
        
        if existing_count > 0:
            print(f"  ℹ️ Found {existing_count} existing customer records, skipping duplicate migration")
            return
        
        # Migrate customer data
        customer_records = []
        for customer in customer_data:
            customer_record = Customer(
                customer_id=customer['customer_id'],
                age=customer['age'],
                gender=customer['gender'],
                purchase_amount=float(customer['purchase_amount']),
                satisfaction=customer['satisfaction']
            )
            customer_records.append(customer_record)
        
        session.add_all(customer_records)
        await session.commit()
        
        print(f"  ✅ Migrated {len(customer_records)} customer records")
        print("✅ Customer data migration completed!")


async def verify_migration():
    """Verify the migration was successful."""
    print("🔍 Verifying migration...")
    
    async with AsyncSessionLocal() as session:
        # Count records
        categories_count = len((await session.execute(select(Category))).scalars().all())
        regions_count = len((await session.execute(select(Region))).scalars().all())
        sales_count = len((await session.execute(select(Sales))).scalars().all())
        customers_count = len((await session.execute(select(Customer))).scalars().all())
        
        print(f"  📊 Categories: {categories_count}")
        print(f"  🗺️ Regions: {regions_count}")
        print(f"  💰 Sales records: {sales_count}")
        print(f"  👥 Customer records: {customers_count}")
        
        # Sample queries
        if sales_count > 0:
            sample_sales = (await session.execute(
                select(Sales)
                .options(selectinload(Sales.category), selectinload(Sales.region))
                .limit(3)
            )).scalars().all()
            
            print("  📈 Sample sales records:")
            for sale in sample_sales:
                print(f"    - {sale.date}: ¥{sale.sales:,.0f} ({sale.category.name}, {sale.region.name})")
        
        if customers_count > 0:
            sample_customers = (await session.execute(
                select(Customer).limit(3)
            )).scalars().all()
            
            print("  👤 Sample customer records:")
            for customer in sample_customers:
                print(f"    - ID {customer.customer_id}: {customer.age}歳 {customer.gender}, 満足度{customer.satisfaction}")
    
    print("✅ Migration verification completed!")


async def main():
    """Main migration function."""
    print("🚀 Starting data migration to PostgreSQL...")
    print("=" * 50)
    
    try:
        # Wait for database to be ready
        print("⏳ Waiting for database connection...")
        async with engine.begin() as conn:
            # Test connection
            await conn.execute("SELECT 1")
        print("✅ Database connection established!")
        
        # Run migrations
        await migrate_categories_and_regions()
        await migrate_sales_data()
        await migrate_customer_data()
        await verify_migration()
        
        print("=" * 50)
        print("🎉 Data migration completed successfully!")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        raise
    
    finally:
        await engine.dispose()


if __name__ == "__main__":
    # Set database URL if not set
    if not os.getenv("DATABASE_URL"):
        os.environ["DATABASE_URL"] = "postgresql://postgres:postgres@localhost:5432/data_analysis"
    
    asyncio.run(main())