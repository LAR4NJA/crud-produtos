CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(100),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
