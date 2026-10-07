-- =============================================================================
-- HAMANGIA STUDIO — Supabase Database Schema (v1.0)
-- Domeniu: hamangiastudio.ro
-- Rulați în Supabase Dashboard → SQL Editor
-- =============================================================================

-- 1. TABEL CLIENȚI
CREATE TABLE IF NOT EXISTS customers (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name           TEXT NOT NULL,
  email               TEXT UNIQUE NOT NULL,
  phone               TEXT NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TABEL PRODUSE
CREATE TABLE IF NOT EXISTS products (
  id                  TEXT PRIMARY KEY, -- ex: 'cavalerul-woodcut'
  title               TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL,
  tagline             TEXT,
  description         TEXT,
  price_ron           NUMERIC(10, 2) NOT NULL, -- preț în LEI (ex: 189.00)
  sizes               TEXT[] NOT NULL DEFAULT '{"S", "M", "L", "XL", "XXL"}',
  colors              TEXT[] NOT NULL DEFAULT '{"Black"}',
  gsm                 INTEGER NOT NULL DEFAULT 240,
  fit                 TEXT NOT NULL DEFAULT 'Boxy Heavyweight',
  images              TEXT[] NOT NULL DEFAULT '{}',
  print_asset_url     TEXT, -- Link master grafică DTF 300 DPI
  category            TEXT NOT NULL DEFAULT 'flagship',
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABEL COMENZI
CREATE TABLE IF NOT EXISTS orders (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number          SERIAL, -- Număr secvențial lizibil (ex: #1001)
  
  -- Relație Client
  customer_id           UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name         TEXT NOT NULL,
  customer_email        TEXT NOT NULL,
  customer_phone        TEXT NOT NULL,

  -- Metodă de plată și status financiar
  payment_method        TEXT NOT NULL CHECK (payment_method IN ('stripe_card', 'ramburs')),
  payment_status        TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_session_id     TEXT UNIQUE,
  stripe_payment_intent TEXT,

  -- Livrare & Sameday Easybox
  delivery_type         TEXT NOT NULL CHECK (delivery_type IN ('easybox', 'courier_address')),
  easybox_locker_id     TEXT, -- Cod locker (ex: 'RO_B_0421')
  easybox_address       TEXT, -- Adresă locker
  shipping_county       TEXT, -- Județ
  shipping_city         TEXT, -- Oraș
  shipping_address      TEXT, -- Stradă, număr (curier adresă)
  shipping_cost_ron     NUMERIC(10, 2) NOT NULL DEFAULT 0.00,

  -- Totaluri financiare
  subtotal_ron          NUMERIC(10, 2) NOT NULL,
  total_ron             NUMERIC(10, 2) NOT NULL,

  -- Status Operațional Fulfillment
  fulfillment_status    TEXT NOT NULL DEFAULT 'new' 
                        CHECK (fulfillment_status IN ('new', 'in_production', 'shipped', 'delivered', 'cancelled')),
  
  -- Integrări Externe
  sameday_awb_number    TEXT,
  oblio_invoice_id      TEXT,
  oblio_invoice_link    TEXT,
  workshop_notified     BOOLEAN NOT NULL DEFAULT FALSE,

  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABEL ELEMENTE COMANDĂ (Order Items)
CREATE TABLE IF NOT EXISTS order_items (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id              UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id            TEXT NOT NULL REFERENCES products(id),
  product_title         TEXT NOT NULL,
  size                  TEXT NOT NULL,
  color                 TEXT NOT NULL DEFAULT 'Black',
  quantity              INTEGER NOT NULL DEFAULT 1,
  unit_price_ron        NUMERIC(10, 2) NOT NULL
);

-- ─── INDEXURI DE PERFORMANȚĂ ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_customer_email     ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status     ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_fulfillment_status ON orders(fulfillment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at         ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id      ON order_items(order_id);

-- ─── TRIGGER AUTOMAT PENTRU updated_at ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_order_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_order_timestamp ON orders;
CREATE TRIGGER trg_update_order_timestamp
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_order_timestamp();

-- ─── VIEW PENTRU STATISTICI RAPIDE (DASHBOARD) ───────────────────────────────
CREATE OR REPLACE VIEW order_stats AS
SELECT
  COUNT(*)                                                    AS total_orders,
  COUNT(*) FILTER (WHERE payment_status = 'paid')             AS paid_orders,
  COUNT(*) FILTER (WHERE payment_method = 'ramburs')          AS ramburs_orders,
  COUNT(*) FILTER (WHERE fulfillment_status = 'in_production') AS in_production,
  COUNT(*) FILTER (WHERE fulfillment_status = 'shipped')      AS shipped,
  COALESCE(SUM(total_ron) FILTER (WHERE payment_status = 'paid'), 0) AS total_revenue_ron
FROM orders;

-- ─── SECURITATE RLS (Row Level Security) ──────────────────────────────────────
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Politici RLS
-- 1. Produsele active pot fi citite de oricine (public / anon)
DROP POLICY IF EXISTS "Public products view" ON products;
CREATE POLICY "Public products view" ON products
  FOR SELECT USING (is_active = true);

-- 2. În timpul checkout-ului, rolul anon poate insera comenzi și detalii
DROP POLICY IF EXISTS "Anon insert orders" ON orders;
CREATE POLICY "Anon insert orders" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anon insert order items" ON order_items;
CREATE POLICY "Anon insert order items" ON order_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anon insert customers" ON customers;
CREATE POLICY "Anon insert customers" ON customers FOR INSERT WITH CHECK (true);

-- ─── SEED PRODUSE DROP 01 (Colecția Arhaică // Expedition to the Roots) ───────
INSERT INTO products (id, title, slug, tagline, description, price_ron, sizes, colors, gsm, fit, images, category)
VALUES
  (
    'cavalerul-woodcut',
    'Cavalerul / Sf. Gheorghe (Woodcut Heavy Tee)',
    'cavalerul-woodcut',
    '240 GSM Heavyweight Cotton, Croială Boxy Oversized, Print DTF de înaltă definiție.',
    'Piesă emblematică inspirată din gravura medievală pe lemn și motivul arhaic al Cavalerului / Sf. Gheorghe. Confecționat din bumbac organic de 240 GSM, cu o cădere boxy / oversized impunătoare și guler gros ranforsat. Print DTF de înaltă rezoluție (300 DPI) realizat în atelier local din România.',
    189.00,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Black'],
    240,
    'Boxy Heavyweight',
    ARRAY['/Assets/Images/Hamangia/cavalerul-woodcut.png'],
    'flagship'
  ),
  (
    'chilim-cocos-white',
    'Chilim Geometric Cocos - Vintage White',
    'chilim-cocos-white',
    'Simetrii arhaice neolitice pe bumbac heavyweight 240g Vintage White.',
    'Simbolistica arhaică a cocoșului solar din chilimurile tradiționale românești, reinterpretată curat într-un registru streetwear brutalist. Bumbac dens de 240 GSM, croială boxy relaxată.',
    169.00,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Vintage White'],
    240,
    'Boxy Heavyweight',
    ARRAY['/Assets/Images/Hamangia/chilim-cocos-white.png'],
    'essentials'
  ),
  (
    'chilim-cocos-black',
    'Chilim Geometric Cocos - Washed Black',
    'chilim-cocos-black',
    'Geometrie arhaică românească pe bumbac dens washed black.',
    'Contrast puternic între simbolistica ancestrală și textura densă a bumbacului pieptănat de 240 GSM. Linii tăiate curat, fără kitsch, pură expresie a formei și a identității arhaice.',
    169.00,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Washed Black'],
    240,
    'Boxy Heavyweight',
    ARRAY['/Assets/Images/Hamangia/chilim-cocos-black.png'],
    'essentials'
  ),
  (
    'angel-wings-black',
    'Angel Wings - Oversized Black',
    'angel-wings-black',
    'Dark folklore și aripi în gravură aspră pe bumbac greu de 240g.',
    'Gravură xilogravată de inspirație dark folklore. Pânză grea din bumbac 100% organic pieptănat, 240 GSM, croială boxy cu umeri căzuți și guler înalt ranforsat.',
    169.00,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Black'],
    240,
    'Boxy Heavyweight',
    ARRAY['/Assets/Images/Hamangia/angel-wings-black.png', '/Assets/Images/Hamangia/angel-wings-mockup.png'],
    'individuals'
  ),
  (
    'horizon-roots-tee',
    'Horizon Roots Tee',
    'horizon-roots-tee',
    'Rădăcini arhaice și orizont liber în stil streetwear urban.',
    'Compoziție minimalistă inspirată din legătura primordială cu pământul și orizontul. Material heavyweight 240 GSM bumbac de înaltă densitate, finisaj moale și rezistență la uzură.',
    149.00,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Black'],
    240,
    'Boxy Heavyweight',
    ARRAY['/Assets/Images/Hamangia/horizon-roots.png'],
    'individuals'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price_ron = EXCLUDED.price_ron,
  description = EXCLUDED.description,
  tagline = EXCLUDED.tagline,
  images = EXCLUDED.images;
