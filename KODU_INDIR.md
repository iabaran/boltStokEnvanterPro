# 💾 Kodu İndirme Rehberi

## Yöntem 1: Bu Projeyi Kopyala

### Adım 1: Yeni React Projesi Oluştur

Kendi bilgisayarında terminalde:

```bash
# Yeni proje oluştur
npm create vite@latest paper-inventory -- --template react-ts

# Proje dizinine gir
cd paper-inventory

# Bağımlılıkları yükle
npm install

# Supabase ve Lucide Icons ekle
npm install @supabase/supabase-js lucide-react
```

### Adım 2: Dosyaları Kopyala

Aşağıdaki dosyaları kopyala ve proje dizinine yapıştır:

#### 📁 src/lib/supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 📁 src/contexts/AuthContext.tsx
Bu dosyayı chat'ten kopyala (çok uzun olduğu için buraya sığmıyor)

#### 📁 src/components/Layout.tsx
Bu dosyayı chat'ten kopyala

#### 📁 src/pages/
Tüm sayfa dosyalarını (Dashboard.tsx, Products.tsx, vs.) kopyala

#### 📁 src/App.tsx
Ana App dosyasını kopyala

### Adım 3: Supabase Migration

Supabase Dashboard → SQL Editor'da çalıştır:

```sql
-- supabase/migrations/20251119143621_create_inventory_schema.sql
-- (SQL dosyasının tamamını chat'ten kopyala)
```

### Adım 4: Environment Variables

`.env` dosyası oluştur:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Adım 5: Başlat

```bash
npm run dev
```

---

## Yöntem 2: GitHub'dan Clone (Deploy Sonrası)

Eğer projeyi GitHub'a push ettiysen:

```bash
git clone https://github.com/YOUR_USERNAME/paper-inventory.git
cd paper-inventory
npm install
cp .env.example .env
# .env dosyasını düzenle
npm run dev
```

---

## Yöntem 3: ZIP İndirme

Eğer bu chat'te "Download" veya "Export" butonu varsa:

1. Projeyi ZIP olarak indir
2. ZIP'i aç
3. Terminal'de:
   ```bash
   cd paper-inventory
   npm install
   cp .env.example .env
   # .env dosyasını düzenle
   npm run dev
   ```

---

## 📋 Dosya Listesi

### React Components (src/)
- ✓ App.tsx
- ✓ main.tsx
- ✓ index.css
- ✓ vite-env.d.ts

### Contexts (src/contexts/)
- ✓ AuthContext.tsx

### Components (src/components/)
- ✓ Layout.tsx

### Pages (src/pages/)
- ✓ Dashboard.tsx
- ✓ Products.tsx
- ✓ StockMovements.tsx
- ✓ Clients.tsx
- ✓ Transactions.tsx
- ✓ Login.tsx

### Library (src/lib/)
- ✓ supabase.ts

### Database (supabase/migrations/)
- ✓ 20251119143621_create_inventory_schema.sql

### Config Files
- ✓ package.json
- ✓ vite.config.ts
- ✓ tsconfig.json
- ✓ tailwind.config.js
- ✓ .env.example
- ✓ .gitignore

### Documentation
- ✓ README.md
- ✓ QUICKSTART.md
- ✓ DEPLOYMENT.md
- ✓ USAGE.md
- ✓ OVERVIEW.md
- ✓ PROJECT_STRUCTURE.md
- ✓ SETUP_CHECKLIST.md
- ✓ START_HERE.md

---

## 🔍 Eksik Dosya Kontrolü

Tüm dosyaların listesi için:

```bash
ls -la
ls -la src/
ls -la src/pages/
ls -la src/components/
ls -la src/contexts/
ls -la src/lib/
ls -la supabase/migrations/
```

---

## 🆘 Sorun mu?

Eğer bir dosya eksikse, bu chat'ten dosya içeriğini kopyala:

```
Kullanıcı: "src/pages/Dashboard.tsx dosyasının içeriğini göster"
```

---

## ✅ Verifikasyon

Tüm dosyalar yerli yerine yerleştirildiğinde:

```bash
npm install
npm run build
```

Başarılı ise ✓ Hazır!

