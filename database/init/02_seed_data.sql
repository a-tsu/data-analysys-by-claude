-- Seed data for Data Analysis Dashboard
-- Insert master data

-- Insert categories
INSERT INTO categories (name) VALUES 
    ('電子機器'),
    ('衣類'),
    ('食品'),
    ('本');

-- Insert regions
INSERT INTO regions (name) VALUES 
    ('東京'),
    ('大阪'),
    ('名古屋'),
    ('福岡');

-- Insert sample sales data (based on existing CSV data)
INSERT INTO sales (date, sales, category_id, region_id) VALUES 
    ('2024-01-01', 89234.56, (SELECT id FROM categories WHERE name = '電子機器'), (SELECT id FROM regions WHERE name = '東京')),
    ('2024-01-01', 123456.78, (SELECT id FROM categories WHERE name = '衣類'), (SELECT id FROM regions WHERE name = '大阪')),
    ('2024-01-01', 76543.21, (SELECT id FROM categories WHERE name = '食品'), (SELECT id FROM regions WHERE name = '名古屋')),
    ('2024-01-01', 98765.43, (SELECT id FROM categories WHERE name = '本'), (SELECT id FROM regions WHERE name = '福岡')),
    ('2024-01-02', 95432.10, (SELECT id FROM categories WHERE name = '電子機器'), (SELECT id FROM regions WHERE name = '大阪')),
    ('2024-01-02', 87654.32, (SELECT id FROM categories WHERE name = '衣類'), (SELECT id FROM regions WHERE name = '東京')),
    ('2024-01-02', 112233.44, (SELECT id FROM categories WHERE name = '食品'), (SELECT id FROM regions WHERE name = '福岡')),
    ('2024-01-02', 67890.12, (SELECT id FROM categories WHERE name = '本'), (SELECT id FROM regions WHERE name = '名古屋')),
    ('2024-01-03', 134567.89, (SELECT id FROM categories WHERE name = '電子機器'), (SELECT id FROM regions WHERE name = '名古屋')),
    ('2024-01-03', 78901.23, (SELECT id FROM categories WHERE name = '衣類'), (SELECT id FROM regions WHERE name = '福岡')),
    ('2024-01-03', 101234.56, (SELECT id FROM categories WHERE name = '食品'), (SELECT id FROM regions WHERE name = '東京')),
    ('2024-01-03', 56789.01, (SELECT id FROM categories WHERE name = '本'), (SELECT id FROM regions WHERE name = '大阪')),
    ('2024-01-04', 145678.90, (SELECT id FROM categories WHERE name = '電子機器'), (SELECT id FROM regions WHERE name = '福岡')),
    ('2024-01-04', 89012.34, (SELECT id FROM categories WHERE name = '衣類'), (SELECT id FROM regions WHERE name = '名古屋')),
    ('2024-01-05', 156789.01, (SELECT id FROM categories WHERE name = '電子機器'), (SELECT id FROM regions WHERE name = '東京')),
    ('2024-01-05', 90123.45, (SELECT id FROM categories WHERE name = '衣類'), (SELECT id FROM regions WHERE name = '大阪'));

-- Insert sample customer data (based on existing JSON data)
INSERT INTO customers (customer_id, age, gender, purchase_amount, satisfaction) VALUES 
    (1, 28, '男性', 45000, 4),
    (2, 35, '女性', 67000, 5),
    (3, 42, '男性', 23000, 3),
    (4, 29, '女性', 89000, 5),
    (5, 55, '男性', 34000, 2),
    (6, 31, '女性', 56000, 4),
    (7, 38, '男性', 78000, 5),
    (8, 26, '女性', 43000, 3),
    (9, 47, '男性', 92000, 4),
    (10, 33, '女性', 61000, 5);

-- Add some additional sample data for better testing
INSERT INTO sales (date, sales, category_id, region_id)
SELECT 
    DATE '2024-01-06' + (random() * 30)::int as date,
    50000 + (random() * 100000)::decimal(12,2) as sales,
    (random() * 3 + 1)::int as category_id,
    (random() * 3 + 1)::int as region_id
FROM generate_series(1, 100);

-- Add more customer data for better analytics
INSERT INTO customers (customer_id, age, gender, purchase_amount, satisfaction)
SELECT 
    i + 10 as customer_id,
    18 + (random() * 62)::int as age,
    CASE WHEN random() > 0.5 THEN '男性' ELSE '女性' END as gender,
    20000 + (random() * 80000)::decimal(12,2) as purchase_amount,
    (random() * 4 + 1)::int as satisfaction
FROM generate_series(1, 100) i;

-- Create summary statistics
CREATE OR REPLACE VIEW sales_summary AS
SELECT 
    COUNT(*) as total_records,
    MIN(date) as earliest_date,
    MAX(date) as latest_date,
    SUM(sales) as total_sales,
    AVG(sales) as avg_sales,
    COUNT(DISTINCT category_id) as category_count,
    COUNT(DISTINCT region_id) as region_count
FROM sales;

CREATE OR REPLACE VIEW customer_summary AS
SELECT 
    COUNT(*) as total_customers,
    MIN(age) as min_age,
    MAX(age) as max_age,
    AVG(age) as avg_age,
    AVG(purchase_amount) as avg_purchase_amount,
    AVG(satisfaction::decimal) as avg_satisfaction,
    COUNT(CASE WHEN gender = '男性' THEN 1 END) as male_count,
    COUNT(CASE WHEN gender = '女性' THEN 1 END) as female_count
FROM customers;