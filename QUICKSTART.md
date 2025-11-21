# 🚀 Hızlı Başlangıç (5 Dakika)

## 1️⃣ Supabase Database (3 dakika)

```bash
1. https://supabase.com → Sign Up
2. Create Organization → Create Project
3. Settings → API → Kopyala:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY

4. SQL Editor'a git
5. Bu dosyayı çalıştır:
   supabase/migrations/20251119143621_create_inventory_schema.sql
6. ✓ Database hazır
```

## 2️⃣ GitHub Push (1 dakika)

```bash
# Terminalde proje dizininde
git add .
git commit -m "Initial: Paper inventory"
git push origin main
```

## 3️⃣ Vercel Deploy (1 dakika)

```bash
1. https://vercel.com → GitHub ile giriş
2. "Add New" → "Project" → Repository seç
3. Environment Variables ekle:
   VITE_SUPABASE_URL = ...
   VITE_SUPABASE_ANON_KEY = ...
4. Deploy
```

## ✅ Bitti!

**Uygulama LIVE:** `https://your-project.vercel.app`

---

## Kodu Lokal Test Etmek İstersen

```bash
# .env oluştur
cp .env.example .env

# Supabase credentials ekle
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Başlat
npm install
npm run dev

# Tarayıcı: http://localhost:5173
```

---

## Kolay Linkler

| İşlem | Link |
|-------|------|
| **Depo Linkini Git** | https://github.com/YOUR_USERNAME/paper-inventory |
| **Canlı Uygulama** | https://your-project.vercel.app |
| **Supabase Dashboard** | https://app.supabase.com |
| **Vercel Dashboard** | https://vercel.com/dashboard |

---

## Sonraki Adımlar

1. **USAGE.md** oku - Uygulamayı nasıl kullanacağını öğren
2. **DEPLOYMENT.md** oku - Detaylı deployment info
3. Ürün ekle → Hareket ekle → Müşteri ekle

---

**Deploy edipdin mi? Tebrikler! 🎉**
