# Deployment Rehberi - Adım Adım

## Özet

- **Database**: Supabase (Ücretsiz, Süreli Olmayan)
- **Frontend**: Vercel (Ücretsiz)
- **Repository**: GitHub (Ücretsiz)

Toplam maliyet: **0 TL** - Hiç ödeme gerekmez!

---

## Adım 1: Supabase Setup (Database)

### Supabase Nedir?
PostgreSQL database'i hosted olarak sağlayan servistir. Ücretsiz tier'ında sınırsız auth user, 500MB storage, 2GB bandwidth vardır. **Hiçbir zaman silinmez.**

### Kurulum

1. https://supabase.com adresine gidin
2. "Start your project" → "Sign up"
3. Email/GitHub ile giriş yapın
4. Yeni organization oluşturun
5. Yeni project oluşturun:
   - **Project name**: `paper-inventory` (ya da istediğiniz ad)
   - **Database Password**: Güçlü bir şifre belirleyin (kaydedin!)
   - **Region**: Türkiye'ye yakın region seçin (Europe)

### Database URL ve Key Alma

1. Project Dashboard'da **Settings** → **API** gidin
2. Şu bilgileri kopyalayın:
   ```
   SUPABASE_URL = https://xxxxx.supabase.co
   SUPABASE_ANON_KEY = eyJhbGc...
   ```

### Database Schema Kurma

1. Supabase Dashboard'da **SQL Editor**'e gidin
2. "New Query" → Paste et:
   - Dosya: `supabase/migrations/20251119143621_create_inventory_schema.sql`
3. "Run" butonuna tıklayın
4. Tüm tablolar otomatik oluşturulacak

**Bitti!** Database hazır. Süreli değil, süresiz.

---

## Adım 2: GitHub Repository

### GitHub Repository Oluşturma

1. https://github.com/new adresine gidin
2. Repository detaylarını doldur:
   - **Repository name**: `paper-inventory`
   - **Description**: "Paper industry inventory management system"
   - **Public** seçin (opsiyonel - private da olabilir)
   - "Create repository"

### Lokal Repo Push Etme

Terminalde projenin kök dizininde:

```bash
# Git initialize et (zaten yapılmış olabilir)
git init

# Supabase credentials'ı commit etmemek için .gitignore'u kontrol et
cat .gitignore
# .env dosyası listelenmiş mi? Varsa devam et, yoksa ekle:
echo ".env" >> .gitignore

# Değişiklikleri stage et
git add .

# Commit yap
git commit -m "Initial commit: Paper inventory management system"

# Remote branch ekle (GitHub'dan kopyalayın)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/paper-inventory.git

# Push et
git push -u origin main
```

**Bitti!** Repository GitHub'da.

---

## Adım 3: Vercel Deployment (Frontend)

### Vercel Nedir?
Next.js'in yapımcıları tarafından yapılmış. React uygulamalarını deploy etmek için en kolay yoltur. **Ücretsiz.**

### Deployment

1. https://vercel.com adresine gidin
2. GitHub ile giriş yapın (Sign up)
3. "Add New" → **Project** tıkla
4. GitHub repository'ni seç (`paper-inventory`)
5. "Import"
6. Project settings gösterilecek:
   - Framework: **Vite** (otomatik seçilir)
   - Root Directory: `./` (default)
   - "Deploy"

### Environment Variables Ayarlama

Deploy başlamadan önce:

1. **Settings** → **Environment Variables**
2. Ekle:
   ```
   Key: VITE_SUPABASE_URL
   Value: https://xxxxx.supabase.co

   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGc...
   ```
3. "Save"
4. Geri dön, **Deployments** → **Redeploy** tıkla

### Vercel URL

Deploy tamamlandıktan sonra:
```
https://paper-inventory-xxxxx.vercel.app
```

Bu link 24/7 açık kalacak. Ücretsiz, sınırsız.

**Bitti!** Uygulama production'da canlı!

---

## Adım 4: Kullanımı Başla

Uygulamaya git:
```
https://paper-inventory-xxxxx.vercel.app
```

1. Email ve şifre ile kayıt ol
2. Dashboard'u aç
3. Ürünleri, müşterileri, stok hareketlerini ekle

---

## Billing & Limitler

### Supabase Free Tier
| Feature | Limit | Yeterli Mi |
|---------|-------|-----------|
| Database Storage | 500 MB | Evet (10K satır ~5MB) |
| Bandwidth | 2 GB/month | Evet (~100K request) |
| Auth Users | Unlimited | Evet |
| Real-time | Unlimited | Evet |
| Edge Functions | 1M invocations | Evet |
| **Aylık Maliyet** | **0 TL** | ✓ |

Upgrade etmek ister misin?
- Pro: $25/ay (10GB storage + daha çok bandwidth)
- Enterprise: Custom

### Vercel Free Tier
| Feature | Limit |
|---------|-------|
| Deployments | Unlimited |
| Bandwidth | 100 GB/month |
| Serverless Functions | 1000 GB-hours/month |
| Domains | Unlimited |
| SSL | Free |
| **Aylık Maliyet** | **0 TL** |

---

## Production Best Practices

### 1. Güvenlik
- ✓ `.env` dosyası committed değil
- ✓ RLS policies aktif
- ✓ Email/password auth
- ✓ HTTPS (Vercel/Supabase tarafından)

### 2. Yedekleme
Supabase otomatik yedek alır. Manuel backup:
```bash
# Supabase CLI ile
supabase db pull
```

### 3. Monitoring
- Supabase Dashboard → Database
- Vercel Dashboard → Analytics

### 4. Custom Domain (Opsiyonel)
Vercel'de kendi domain'inizi bağlayabilirsiniz:
1. Domain satın alın (GoDaddy, Namecheap, Cloudflare)
2. Vercel: **Settings** → **Domains**
3. Domain ekle → DNS settings'ı güncelle
4. ✓ Canlı

---

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
npm run build
```

### Vercel deployment başarısız
1. Build logs'u kontrol et: Vercel Dashboard → Deployments
2. `.env` variables doğru mu?
3. `npm run build` lokal çalışıyor mu?

### Database connection hatası
1. Supabase URL doğru mu? (https://...supabase.co)
2. ANON_KEY doğru mu?
3. Network: Supabase firewall'ında herkes erişebilir

### Auth çalışmıyor
1. Supabase → Authentication → Providers → Email etkinmi?
2. Email confirmations disabled mi? (Tavsiye: disabled bırak)

---

## Güncellemeler & Maintenance

### Yeni feature eklemek?

1. Lokal geliştir
2. Git push et
3. Vercel otomatik redeploy edecek (30 saniye)

### Database migration?

1. SQL migration oluştur
2. Supabase SQL Editor'da çalıştır
3. Uygulamada kullan

### Supabase upgrade etmek?

1. Dashboard → Settings → Billing
2. Plan seç
3. Credit card ekle (stripe ile)

---

## Önemli Linkler

| Servis | Link |
|--------|------|
| Repository | https://github.com/YOUR_USERNAME/paper-inventory |
| Supabase Dashboard | https://app.supabase.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| Live App | https://paper-inventory-xxxxx.vercel.app |

---

**Tamamlandı!** Artık production'da bir stok takip uygulamanız var. Hiç ödeme yok, süresiz ve 24/7 çalışıyor.
