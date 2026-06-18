-- ============================================================
-- Cafetería Esencia - Supabase Schema
-- Best practices applied:
--   - UUID primary keys (not serial)
--   - Timestamp with time zone
--   - Proper indexes (covering, partial, composite)
--   - Row-Level Security (RLS) enabled
--   - Named constraints for clarity
--   - Check constraints for data integrity
--   - ENUMs for constrained string fields
--   - Generated columns where applicable
--   - Full-text search support
-- ============================================================

-- --------------------
-- 1. CUSTOM TYPES
-- --------------------
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('transferencia', 'tarjeta');
CREATE TYPE invoice_type AS ENUM ('boleta', 'factura');

-- --------------------
-- 2. PROFILES (extends Supabase auth.users)
-- --------------------
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        user_role NOT NULL DEFAULT 'user',
  full_name   TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for admin lookups
CREATE INDEX idx_profiles_role ON profiles(role);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Trigger to sync auth.users -> profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'full_name', ''));
  RETURN new;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- --------------------
-- 3. CATEGORIES
-- --------------------
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- --------------------
-- 4. PRODUCTS
-- --------------------
CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT NOT NULL DEFAULT '',
  price         INTEGER NOT NULL CHECK (price >= 0),
  image_url     TEXT NOT NULL DEFAULT '',
  rating        NUMERIC(2,1) NOT NULL DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
  region        TEXT NOT NULL DEFAULT 'Lima',
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  is_available  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full-text search support
ALTER TABLE products ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (
    to_tsvector('spanish', coalesce(name, '') || ' ' || coalesce(description, ''))
  ) STORED;

CREATE INDEX idx_products_search ON products USING GIN(search_vector);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_available ON products(is_available) WHERE is_available = true;
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created ON products(created_at DESC);

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read available products"
  ON products FOR SELECT
  USING (is_available = true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- --------------------
-- 5. ORDERS
-- --------------------
CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status          order_status NOT NULL DEFAULT 'pending',
  payment_method  payment_method NOT NULL DEFAULT 'transferencia',
  invoice_type    invoice_type,
  shipping_address TEXT NOT NULL,
  shipping_district TEXT NOT NULL,
  shipping_price  INTEGER NOT NULL DEFAULT 0,
  subtotal        INTEGER NOT NULL CHECK (subtotal >= 0),
  total           INTEGER NOT NULL CHECK (total >= 0),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Partial index: only pending orders for admin dashboards
CREATE INDEX idx_orders_pending ON orders(created_at DESC) WHERE status = 'pending';
CREATE INDEX idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);

-- RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all orders"
  ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- --------------------
-- 6. ORDER ITEMS
-- --------------------
CREATE TABLE order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_name TEXT NOT NULL,
  unit_price  INTEGER NOT NULL CHECK (unit_price >= 0),
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  subtotal    INTEGER NOT NULL CHECK (subtotal >= 0)
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own order items"
  ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid()));

CREATE POLICY "Users can create their own order items"
  ON order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid()));

CREATE POLICY "Admins can read all order items"
  ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- --------------------
-- 7. AUTOMATED UPDATED_AT TRIGGER
-- --------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- --------------------
-- 8. SEED DATA (optional: run after schema creation)
-- --------------------
-- INSERT INTO categories (name, slug, description) VALUES
--   ('Café', 'cafe', 'Cafés de origen y especialidades'),
--   ('Postres', 'postres', 'Dulces y postres caseros'),
--   ('Bebidas', 'bebidas', 'Bebidas frías y calientes'),
--   ('Desayunos', 'desayunos', 'Opciones para empezar el día');
--
-- INSERT INTO products (name, slug, description, price, image_url, rating, region, category_id, is_featured) VALUES
--   ('Café Americano', 'cafe-americano', 'Clásico y reconfortante, ideal para cualquier momento.', 5, '/img/producto1.jpg', 4.5, 'Lima', (SELECT id FROM categories WHERE slug = 'cafe'), true);
-- -- ... add more products as needed
