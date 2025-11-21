# Kağıt Sektörü Stok Takip Sistemi

Basit, güvenli ve kullanışlı bir web uygulaması kağıt sektörü stok yönetimi için.

## Özellikler

- **Kullanıcı Yönetimi**: Secure email/password authentication
- **Stok Takibi**: Giriş/çıkış kayıtları, güncel stok durumu
- **Ürün Yönetimi**: Ürün kataloğu, birim tanımlama
- **Müşteri Yönetimi**: Müşteri bilgileri, borç/alacak takibi
- **Ödeme Takibi**: Finansal işlemler (ödeme, alacak, borç)
- **Dashboard**: Gerçek zamanlı KPI'lar ve özet görünüm
- **Responsive Tasarım**: Mobil ve desktop uyumlu arayüz

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth (Email/Password)
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## Kurulum & Başlangıç

### 1. Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. Proje ayarlarında (Settings → API) bulun:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### 2. Lokal Geliştirme Ortamı

```bash
# Repository'yi klonlayın
git clone https://github.com/yourusername/paper-inventory.git
cd paper-inventory

# Bağımlılıkları yükleyin
npm install

# .env dosyası oluşturun
cp .env.example .env

# Supabase anahtarlarınızı .env dosyasına ekleyin
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

### 3. Database Setup (İlk Kez)

Supabase Dashboard'da SQL Editor'a gidin ve aşağıdaki dosyayı çalıştırın:

```bash
supabase/migrations/20251119143621_create_inventory_schema.sql
```

Tüm tabloları, RLS politikalarını ve view'leri otomatik olarak oluşturacaktır.

## Kullanım

### 1. İlk Giriş
- E-mail ve şifre ile kayıt yapın
- Otomatik olarak profil oluşturulacaktır

### 2. Dashboard
- Toplam stok, günlük giriş/çıkış miktar özeti
- Müşteri sayısı ve toplam bakiye
- Güncel stok durumu tablo

### 3. Ürünler
- Yeni ürün ekleyin (ad, birim: kg, adet, litre vb.)
- Ürünleri düzenleyin/silin

### 4. Stok Hareketleri
- Stok giriş/çıkış kaydı oluşturun
- Tedarikçi ve birim fiyat bilgileri ekleyin
- Tarih bazlı filtreleme

### 5. Müşteriler
- Müşteri ad/soyad, şirket, telefon bilgilerini yönetin
- Otomatik borç/alacak bakiye takibi
- Müşteri düzenleme/silme

### 6. Ödemeler
- Ödeme/alacak/borç işlemleri kaydı
- Müşteri bazlı işlem takibi
- Genel not ekleme

## Deployment

### A. Supabase Database (Ücretsiz, Süreli Olmayan)

Supabase'in free tier'ı şunları içerir:
- **500 MB** database storage
- **2 GB** bandwidth
- **50,000** API requests / ay
- **Unlimited** auth users (email/password)
- **Otomatik yedekleme** ve recovery

**Süresiz kullanım**: Free tier hiçbir zaman otomatik silinmez. İstediğiniz kadar kullanabilirsiniz.

### B. Frontend Deployment (Vercel - Ücretsiz)

1. **Repository'yi GitHub'a push edin**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Vercel'e bağlayın**
   - [Vercel](https://vercel.com) hesabı oluşturun (GitHub ile)
   - "Add New" → "Project"
   - Repository'yi seçin
   - "Deploy"

3. **Environment Variables Ayarlayın**
   - Vercel Dashboard → Settings → Environment Variables
   - Ekleyin:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Redeploy Edin**
   - Vercel Dashboard → Deployments
   - "Redeploy" butonuna tıklayın

### C. Production URL'ler

Deployment sonrasında:
- **Frontend**: `https://your-project.vercel.app`
- **Database**: Supabase tarafından yönetilir

## Database Yapısı

### Tablolar

| Tablo | Amaç |
|-------|------|
| `profiles` | Kullanıcı profilleri |
| `products` | Ürün kataloğu |
| `clients` | Müşteri bilgileri |
| `stock_movements` | Stok giriş/çıkış |
| `transactions` | Finansal işlemler |
| `stock_levels` | Güncel stok (denormalize) |

### Views

| View | Amaç |
|------|------|
| `v_current_stock` | Güncel stok ile ürün detayları |
| `v_client_balances` | Müşteri bakiyesi özeti |

Tüm tablolarda Row Level Security (RLS) aktiftir. Kullanıcılar sadece authenticated olarak veri erişebilir.

## Geliştirme Notları

### Stok Hesaplaması
Database trigger otomatik olarak stok seviyelerini günceller:
- Giriş: `+quantity`
- Çıkış: `-quantity`

### Bakiye Hesaplaması
Müşteri bakiyesi otomatik olarak hesaplanır:
- Alacak: `+amount`
- Borç: `-amount`
- Ödeme: `+amount`

### RLS Politikaları
- Authenticated kullanıcılar tüm veriyi görüp yönetebilir
- Her tablo için SELECT, INSERT, UPDATE, DELETE politikaları

## Üretim Kontrol Listesi

- [ ] Supabase database oluşturuldu
- [ ] `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` alındı
- [ ] `.env` dosyası dolduruldu
- [ ] GitHub repository oluşturuldu
- [ ] Repository push edild
- [ ] Vercel project bağlandı
- [ ] Environment variables Vercel'de ayarlandı
- [ ] Uygulama başarıyla deploy edildi

## Sorun Giderme

### "Missing Supabase environment variables"
- `.env` dosyasının doğru konumda olup olmadığını kontrol edin
- `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` doldurulmuş mu?

### "Authentication failed"
- Supabase Authentication (Auth) etkinleştirilmiş mi?
- Email/password provider açık mı?

### "Database connection error"
- Supabase URL doğru mu?
- API key valid mi?
- Database aktif mi?

## Destek ve İletişim

Sorularınız için:
1. Supabase Docs: https://supabase.com/docs
2. React Docs: https://react.dev
3. Vite Docs: https://vitejs.dev

## Lisans

MIT - Açık kaynak olarak kullanabilirsiniz

---

**Yapılışı**: 2025 - Kağıt Sektörü Stok Takip Sistemi
