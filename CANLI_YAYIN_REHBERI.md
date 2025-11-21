# 🚀 CANLI YAYINA ALMA REHBERİ

## 🎯 Hedef

1 kişi (admin) bu uygulamaya web üzerinden giriş yapacak ve stok takibi yapacak.

**Son Durum**: `https://your-app.vercel.app` gibi bir link olacak, oraya gir, kayıt ol, kullan!

---

## ⚡ HIZLI BAŞLANGIÇ (15 Dakika)

### ADIM 1: Supabase Database (5 dakika)

#### 1.1. Hesap Oluştur
```
https://supabase.com
```
- "Start your project" tıkla
- Email ile kayıt ol (ya da GitHub ile)

#### 1.2. Yeni Proje Oluştur
- "New Project" tıkla
- **Project Name**: `paper-inventory`
- **Database Password**: Güçlü bir şifre (KAYDET!)
- **Region**: Europe (Frankfurt ya da London)
- "Create new project" tıkla
- ⏱️ 2-3 dakika bekle (database hazırlanıyor)

#### 1.3. API Keys Al
Proje hazır olunca:
1. Sol menü → **Settings** → **API**
2. Şu 2 bilgiyi kopyala:

```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGc...
```

**ÖNEMLİ**: Bu bilgileri bir yere kaydet (Notepad, not defteri)

#### 1.4. Database Schema Oluştur
1. Sol menü → **SQL Editor**
2. "New Query"
3. Bu dosyanın içeriğini kopyala:
   `supabase/migrations/20251119143621_create_inventory_schema.sql`
4. Paste et
5. **"RUN"** tıkla
6. ✅ Success göreceksin

**BİTTİ!** Database hazır.

---

### ADIM 2: Vercel'e Deploy (5 dakika)

#### 2.1. Vercel Hesabı
```
https://vercel.com
```
- GitHub ile giriş yap (Sign up with GitHub)

#### 2.2. GitHub Repository
Önce kodu GitHub'a yüklemen gerek.

**Seçenek A**: Bu chat'te Download butonu varsa
1. Projeyi ZIP olarak indir
2. Bilgisayarında aç
3. Terminal aç, proje dizininde:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/paper-inventory.git
git push -u origin main
```

**Seçenek B**: GitHub'da manuel oluştur
1. https://github.com/new
2. `paper-inventory` ismiyle repo oluştur
3. Dosyaları upload et

#### 2.3. Vercel'e Bağla
1. Vercel Dashboard → **"Add New"** → **"Project"**
2. GitHub repository seç: `paper-inventory`
3. **"Import"** tıkla

#### 2.4. Environment Variables Ekle
Deploy etmeden ÖNCE:

1. **"Environment Variables"** bölümünü bul
2. Ekle:

```
Name: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co (Supabase'den aldığın)

Name: VITE_SUPABASE_ANON_KEY  
Value: eyJhbGc... (Supabase'den aldığın)
```

3. **"Deploy"** tıkla

#### 2.5. Bekle
⏱️ 1-2 dakika bekle, deployment tamamlanacak.

#### 2.6. Live URL Al
Deployment bitince:

```
🎉 https://paper-inventory-xyz123.vercel.app
```

Bu senin canlı uygulamanın linki!

**BİTTİ!** Uygulama canlıda.

---

### ADIM 3: İlk Admin Girişi (2 dakika)

#### 3.1. Uygulamaya Git
```
https://paper-inventory-xyz123.vercel.app
```

#### 3.2. Kayıt Ol
1. **"Kayıt Ol"** tıkla
2. Bilgileri doldur:
   - **Ad Soyad**: Admin Kullanıcı
   - **E-posta**: admin@sirketiniz.com (geçerli email)
   - **Şifre**: Güçlü bir şifre
3. **"Kayıt Ol"** tıkla

#### 3.3. Giriş Yap
Otomatik olarak dashboard'a yönlendirileceksin.

✅ **HAZIR!** Artık stok takibi yapabilirsin.

---

## 📱 KULLANIM

### Dashboard
- Toplam ürün, stok giriş/çıkış, müşteri sayısı
- Güncel stok durumu

### Ürünler Ekle
1. Sol menü → **"Ürünler"**
2. **"Yeni Ürün"** tıkla
3. Ürün adı ve birim seç
4. Kaydet

### Stok Hareketi Ekle
1. Sol menü → **"Stok Hareketleri"**
2. **"Yeni Hareket"** tıkla
3. Ürün seç, giriş/çıkış, miktar
4. Kaydet

### Müşteri Ekle
1. Sol menü → **"Müşteriler"**
2. **"Yeni Müşteri"** tıkla
3. Bilgileri doldur
4. Kaydet

### Ödeme/Borç Ekle
1. Sol menü → **"Ödemeler"**
2. **"Yeni İşlem"** tıkla
3. Müşteri seç, tutar, tip
4. Kaydet

---

## 🔗 ÖNEMLİ LİNKLER

Şu linkleri bookmark yap:

| Servis | Link | Kullanım |
|--------|------|----------|
| **Canlı Uygulama** | https://your-app.vercel.app | Günlük kullanım |
| **Vercel Dashboard** | https://vercel.com/dashboard | Uygulama yönetimi |
| **Supabase Dashboard** | https://app.supabase.com | Database yönetimi |
| **GitHub Repo** | https://github.com/YOUR_USERNAME/paper-inventory | Kod |

---

## 💰 MALİYET

**0 TL / Ay**

- Supabase Free: 500MB database (yeterli)
- Vercel Free: Unlimited deploys
- Süresiz, hiç ödeme yok

**Upgrade gerekirse:**
- Supabase Pro: $25/ay
- Vercel Pro: $20/ay

---

## 🔐 GÜVENLİK

✅ HTTPS ile şifrelenmiş
✅ Supabase authentication
✅ Row Level Security
✅ Şifreler hashed
✅ Automatic backups

---

## 📱 MOBİL KULLANIM

Uygulamaya telefondan da girebilirsin:
- Responsive tasarım
- Mobil tarayıcıda çalışır
- Safari / Chrome uyumlu

---

## 👥 ÇOKLU KULLANICI

**Şu anda**: 1 admin kullanıcı

**Gelecekte**: Daha fazla kullanıcı ekleyebilirsin:
1. Her kullanıcı kendi email/şifre ile kayıt olur
2. Supabase → Authentication → Users'ta görebilirsin
3. İstersen role-based permissions eklenebilir

---

## 🆘 SORUN ÇIKARSA?

### "Cannot find Supabase URL"
- Vercel → Settings → Environment Variables
- `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` var mı?
- Yoksa ekle, redeploy et

### "Authentication failed"
- Supabase → Authentication → Providers
- Email provider enabled mi?

### "Database error"
- Supabase SQL Editor'da migration çalıştı mı?
- Tables oluştu mu kontrol et (Table Editor'dan)

### "Sayfa yüklenmiyor"
- Vercel deployment başarılı mı?
- Logs'u kontrol et

---

## 📊 ÖRNEK SENARYO

**İlk Gün:**
1. ✅ Deploy et: `https://paper-inventory-xyz.vercel.app`
2. ✅ Kayıt ol: `admin@sirket.com`
3. ✅ 5 ürün ekle (A4 Kağıt, Kraft, vb.)
4. ✅ 3 müşteri ekle
5. ✅ İlk stok girişini kaydet

**Her Gün:**
1. Linke git: `https://paper-inventory-xyz.vercel.app`
2. Email/şifre ile giriş yap
3. Dashboard'da özeti gör
4. Yeni hareket ekle (giriş/çıkış)
5. Ödemeleri kaydet

---

## 🎯 ÖZET

| Adım | Süre | Sonuç |
|------|------|-------|
| 1. Supabase | 5 dk | Database hazır |
| 2. Vercel Deploy | 5 dk | URL: `https://your-app.vercel.app` |
| 3. İlk Giriş | 2 dk | Admin hesabı ✓ |
| **TOPLAM** | **12 dk** | **CANLI!** 🎉 |

---

## 🔄 GÜNCELLEMELER

Kod değişikliği yaparsan:

```bash
git add .
git commit -m "Güncelleme"
git push
```

Vercel otomatik redeploy eder (~30 saniye).

---

## ✅ KONTROL LİSTESİ

- [ ] Supabase hesabı ✓
- [ ] Database oluşturuldu ✓
- [ ] Migration çalıştırıldı ✓
- [ ] API keys alındı ✓
- [ ] GitHub repo oluşturuldu ✓
- [ ] Vercel'e bağlandı ✓
- [ ] Environment variables eklendi ✓
- [ ] Deploy tamamlandı ✓
- [ ] Live URL test edildi ✓
- [ ] İlk admin kayıt oldu ✓
- [ ] Dashboard görüldü ✓

---

**HAZIRSSIN!** 🚀

Canlı link: `https://your-app.vercel.app`

Gir, kullan, stok takibi yap!

