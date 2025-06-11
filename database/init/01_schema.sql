-- Data Analysis Dashboard Database Schema
-- PostgreSQL 16 compatible

-- Create categories table (normalized)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create regions table (normalized)
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    sales DECIMAL(12,2) NOT NULL CHECK (sales >= 0),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    region_id INTEGER NOT NULL REFERENCES regions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER UNIQUE NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 150),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('男性', '女性')),
    purchase_amount DECIMAL(12,2) NOT NULL CHECK (purchase_amount >= 0),
    satisfaction INTEGER NOT NULL CHECK (satisfaction >= 1 AND satisfaction <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance optimization
CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_sales_category_id ON sales(category_id);
CREATE INDEX idx_sales_region_id ON sales(region_id);
CREATE INDEX idx_sales_date_category ON sales(date, category_id);
CREATE INDEX idx_sales_date_region ON sales(date, region_id);

CREATE INDEX idx_customers_age ON customers(age);
CREATE INDEX idx_customers_gender ON customers(gender);
CREATE INDEX idx_customers_satisfaction ON customers(satisfaction);
CREATE INDEX idx_customers_purchase_amount ON customers(purchase_amount);

-- Create composite indexes for common query patterns
CREATE INDEX idx_customers_age_gender ON customers(age, gender);
CREATE INDEX idx_customers_satisfaction_gender ON customers(satisfaction, gender);

-- Create views for common queries
CREATE VIEW sales_with_details AS
SELECT 
    s.id,
    s.date,
    s.sales,
    c.name as category,
    r.name as region,
    s.created_at
FROM sales s
JOIN categories c ON s.category_id = c.id
JOIN regions r ON s.region_id = r.id;

-- Create function for date range filtering
CREATE OR REPLACE FUNCTION get_sales_by_date_range(
    start_date DATE,
    end_date DATE
) RETURNS TABLE (
    id INTEGER,
    date DATE,
    sales DECIMAL(12,2),
    category VARCHAR(50),
    region VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.date,
        s.sales,
        c.name as category,
        r.name as region
    FROM sales s
    JOIN categories c ON s.category_id = c.id
    JOIN regions r ON s.region_id = r.id
    WHERE s.date BETWEEN start_date AND end_date
    ORDER BY s.date DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;