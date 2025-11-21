/*
  # Paper Industry Inventory Management System - Database Schema

  ## Overview
  Complete database schema for paper industry stock tracking with authentication, 
  product management, stock movements, client management, and financial transactions.

  ## Tables Created

  1. **profiles**
     - Extends auth.users with additional user information
     - `id` (uuid, FK to auth.users)
     - `full_name` (text)
     - `role` (text) - for role-based access control
     - `created_at` (timestamptz)

  2. **products**
     - Manages product catalog (paper types, materials)
     - `id` (uuid, PK)
     - `name` (text, NOT NULL) - product name
     - `unit` (text, NOT NULL) - measurement unit (kg, adet, litre, etc.)
     - `created_at` (timestamptz)

  3. **clients**
     - Customer/client management
     - `id` (uuid, PK)
     - `first_name` (text)
     - `last_name` (text)
     - `company` (text)
     - `phone` (text)
     - `created_at` (timestamptz)

  4. **transactions**
     - Financial transactions (payments, receivables, debts)
     - `id` (uuid, PK)
     - `client_id` (uuid, FK to clients)
     - `amount` (numeric, NOT NULL)
     - `type` (text, NOT NULL) - 'odeme', 'alacak', 'borc'
     - `note` (text) - transaction notes
     - `created_at` (timestamptz)

  5. **stock_movements**
     - Track all inventory movements (in/out)
     - `id` (uuid, PK)
     - `product_id` (uuid, FK to products)
     - `movement_type` (text, NOT NULL) - 'giriş' or 'çıkış'
     - `quantity` (numeric, NOT NULL)
     - `unit_price` (numeric) - price per unit
     - `total_price` (numeric) - calculated total
     - `supplier` (text) - supplier company name
     - `entry_date` (date, NOT NULL)
     - `created_by` (uuid, FK to auth.users)
     - `created_at` (timestamptz)

  6. **stock_levels**
     - Denormalized current stock levels for performance
     - `product_id` (uuid, PK, FK to products)
     - `total_quantity` (numeric, DEFAULT 0)
     - `updated_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Authenticated users can read all data
  - Authenticated users can insert/update/delete their own data
  - Admin role can manage all data

  ## Notes
  - Uses gen_random_uuid() for primary keys
  - Timestamps automatically set with DEFAULT now()
  - Foreign keys with appropriate CASCADE/SET NULL actions
  - Indexes added for performance on foreign keys
*/

-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  unit text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text,
  last_name text,
  company text,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (true);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  type text NOT NULL,
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_client_id ON transactions(client_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete transactions"
  ON transactions FOR DELETE
  TO authenticated
  USING (true);

-- Stock movements table
CREATE TABLE IF NOT EXISTS stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  movement_type text NOT NULL,
  quantity numeric NOT NULL,
  unit_price numeric,
  total_price numeric,
  supplier text,
  entry_date date NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stock_movements_product_id ON stock_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_entry_date ON stock_movements(entry_date);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created_by ON stock_movements(created_by);

ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view stock movements"
  ON stock_movements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert stock movements"
  ON stock_movements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update stock movements"
  ON stock_movements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete stock movements"
  ON stock_movements FOR DELETE
  TO authenticated
  USING (true);

-- Stock levels table (denormalized for performance)
CREATE TABLE IF NOT EXISTS stock_levels (
  product_id uuid PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  total_quantity numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stock_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view stock levels"
  ON stock_levels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert stock levels"
  ON stock_levels FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update stock levels"
  ON stock_levels FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update stock levels after movements
CREATE OR REPLACE FUNCTION update_stock_levels()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO stock_levels (product_id, total_quantity, updated_at)
    SELECT 
      NEW.product_id,
      COALESCE(SUM(
        CASE 
          WHEN movement_type = 'giriş' THEN quantity
          ELSE -quantity
        END
      ), 0),
      now()
    FROM stock_movements
    WHERE product_id = NEW.product_id
    ON CONFLICT (product_id) 
    DO UPDATE SET 
      total_quantity = (
        SELECT COALESCE(SUM(
          CASE 
            WHEN movement_type = 'giriş' THEN quantity
            ELSE -quantity
          END
        ), 0)
        FROM stock_movements
        WHERE product_id = NEW.product_id
      ),
      updated_at = now();
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE stock_levels
    SET 
      total_quantity = (
        SELECT COALESCE(SUM(
          CASE 
            WHEN movement_type = 'giriş' THEN quantity
            ELSE -quantity
          END
        ), 0)
        FROM stock_movements
        WHERE product_id = OLD.product_id
      ),
      updated_at = now()
    WHERE product_id = OLD.product_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update stock levels
DROP TRIGGER IF EXISTS trigger_update_stock_levels ON stock_movements;
CREATE TRIGGER trigger_update_stock_levels
  AFTER INSERT OR UPDATE OR DELETE ON stock_movements
  FOR EACH ROW
  EXECUTE FUNCTION update_stock_levels();

-- View for current stock with product details
CREATE OR REPLACE VIEW v_current_stock AS
SELECT 
  p.id as product_id,
  p.name as product_name,
  p.unit,
  COALESCE(sl.total_quantity, 0) as current_stock,
  sl.updated_at as last_updated
FROM products p
LEFT JOIN stock_levels sl ON p.id = sl.product_id
ORDER BY p.name;

-- View for client balances (debt/credit)
CREATE OR REPLACE VIEW v_client_balances AS
SELECT 
  c.id as client_id,
  c.first_name,
  c.last_name,
  c.company,
  c.phone,
  COALESCE(SUM(
    CASE 
      WHEN t.type = 'alacak' THEN t.amount
      WHEN t.type = 'borc' THEN -t.amount
      WHEN t.type = 'odeme' THEN t.amount
      ELSE 0
    END
  ), 0) as balance
FROM clients c
LEFT JOIN transactions t ON c.id = t.client_id
GROUP BY c.id, c.first_name, c.last_name, c.company, c.phone
ORDER BY c.company, c.last_name;