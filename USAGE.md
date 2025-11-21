# Kullanım Kılavuzu

## İçindekiler
1. [Başlangıç](#başlangıç)
2. [Dashboard](#dashboard)
3. [Ürünler](#ürünler)
4. [Stok Hareketleri](#stok-hareketleri)
5. [Müşteriler](#müşteriler)
6. [Ödemeler](#ödemeler)
7. [Tips & Tricks](#tips--tricks)

---

## Başlangıç

### Giriş Yapma

1. Uygulamayı aç: `https://paper-inventory-xxxxx.vercel.app`
2. İlk kez mi? **"Kayıt Ol"**'a tıkla
3. Bilgileri doldur:
   - **Ad Soyad**: Tam adınız
   - **E-posta**: Geçerli email
   - **Şifre**: Güvenli bir şifre (8+ karakter önerilir)
4. **"Kayıt Ol"** tıkla
5. Otomatik olarak Dashboard'a yönlendirileceksin

### Çıkış Yapma

Sağ üstte **"Çıkış"** butonuna tıkla.

---

## Dashboard

Ana sayfada önemli KPI'lar görürsün:

### Gösterilen Veriler

| KPI | Açıklama |
|-----|----------|
| **Toplam Ürün** | Sisteme eklenen ürün sayısı |
| **Bugün Giriş** | Bugün giren toplam stok miktarı |
| **Bugün Çıkış** | Bugün çıkan toplam stok miktarı |
| **Toplam Müşteri** | Sisteme eklenen müşteri sayısı |
| **Toplam Bakiye** | Tüm müşterilerin toplam borç/alacak durumu |

### Güncel Stok Tablosu

Aşağıda her ürünün mevcut stok durumu gösterilir:
- **Ürün Adı**
- **Birim** (kg, adet, litre vb.)
- **Mevcut Stok** (kırmızı = negatif, siyah = pozitif)

---

## Ürünler

Stok takibi yapmak için önce ürün tanımlaması gerekir.

### Yeni Ürün Ekleme

1. Sol menüden **"Ürünler"** tıkla
2. **"Yeni Ürün"** butonuna tıkla
3. Form aç, bilgileri doldur:
   - **Ürün Adı**: Örn. "A4 Kağıt 80gsm"
   - **Birim**: Açılır menüden seç:
     - Kilogram (kg) - Paper weight
     - Adet - Sayılarla ölçülen ürünler
     - Litre - Sıvı ürünler
     - Metre - Uzunluk ölçüsü
     - Paket - Paket cinsinden
     - Koli - Koli cinsinden

4. **"Ekle"** tıkla

### Ürün Düzenleme

1. Ürün listesinde düzenlemek istediğin ürünü bul
2. Sağ tarafta **edit ikonu** (kalem) tıkla
3. Bilgileri güncelle
4. **"Güncelle"** tıkla

### Ürün Silme

1. Ürün listesinde sil istediğin ürünü bul
2. Sağ tarafta **delete ikonu** (çöp bin) tıkla
3. Onay ver
4. ✓ Silindi

---

## Stok Hareketleri

Ürünlerin depoya giriş veya çıkışını kaydedersin.

### Yeni Stok Hareketi Ekle

1. Sol menüden **"Stok Hareketleri"** tıkla
2. **"Yeni Hareket"** butonuna tıkla
3. Form aç:

#### Form Alanları

| Alan | Açıklama |
|------|----------|
| **Ürün** | Açılır menüden ürün seç |
| **Hareket Tipi** | Giriş (yeşil) veya Çıkış (kırmızı) |
| **Miktar** | Sayı gir (ondalık: 100.50) |
| **Birim Fiyat** | Opsiyonel - Her birim ne kadarsa onu yaz |
| **Tedarikçi** | Opsiyonel - Hangi firmadan geldiğini yaz |
| **Tarih** | Hareketi kaç tarihte gerçekleşti? |

#### Örnek: A4 Kağıt Giriş

```
Ürün: A4 Kağıt 80gsm
Hareket Tipi: Giriş
Miktar: 500
Birim Fiyat: 0.50
Tedarikçi: ABC Kağıt Ltd.
Tarih: 2024-11-20
```

Kayıt → Toplam Fiyat otomatik hesaplanır: 500 × 0.50 = 250 TL

### Hareketleri Filtreleme

Üstteki butonlarla filtrele:
- **Tümü**: Bütün hareketler
- **Giriş**: Sadece giren stok
- **Çıkış**: Sadece çıkan stok

---

## Müşteriler

Satış yaptığın müşterileri ve borç/alacaklarını takip et.

### Yeni Müşteri Ekle

1. Sol menüden **"Müşteriler"** tıkla
2. **"Yeni Müşteri"** butonuna tıkla
3. Bilgileri doldur:

| Alan | Açıklama |
|------|----------|
| **Ad** | Müşterinin adı |
| **Soyad** | Müşterinin soyadı |
| **Şirket** | Şirket/İşletme adı |
| **Telefon** | İletişim numarası |

4. **"Ekle"** tıkla

### Bakiye Nedir?

Her müşterinin bakiyesi otomatik hesaplanır:
- **Yeşil (+)**: Müşteri bize borçlu (alacağımız var)
- **Kırmızı (-)**: Biz müşteriye borçluyuz
- **Siyah (0)**: Hesap kapalı

---

## Ödemeler

Müşteri ödemeleri ve borç/alacakları takip et.

### Yeni İşlem Ekle

1. Sol menüden **"Ödemeler"** tıkla
2. **"Yeni İşlem"** butonuna tıkla
3. Formda:

| Alan | Seçenekler |
|------|-----------|
| **Müşteri** | Müşteri seç ya da Genel |
| **İşlem Tipi** | Ödeme / Alacak / Borç |
| **Tutar** | Toplam tutar |
| **Not** | Açıklama (örn: Fatura #123) |

#### Örnekler

**Müşteri Ödedi:**
- Müşteri: ABC İnşaat
- Tip: **Ödeme**
- Tutar: 1000 TL
- Not: Fatura #2024-001

**Müşteriye Borçluyuz:**
- Müşteri: XYZ Kağıt
- Tip: **Borç**
- Tutar: 500 TL
- Not: Henüz ödemeyen satın alma

**Müşteri Bize Borçlu:**
- Müşteri: DEF Baskı
- Tip: **Alacak**
- Tutar: 2500 TL
- Not: Satış Fatura #2024-005

---

## Tips & Tricks

### 1. Dashboard Güncel Kalıyor

Dashboard otomatik güncellenir. Yeni hareket ekledikten sonra Dashboard'a dön, yeni veriler görürsün.

### 2. Tarih Format

- **Input**: YYYY-MM-DD format (Takvim aç, tarih seç)
- **Gösterim**: Türkçe formatında (GG.AA.YYYY)

### 3. Ondalık Sayılar

- Doğru: `100.50`, `25.75`
- Yanlış: `100,50` (virgül kullanma)

### 4. Ürün Birim Seçimi

Dikkat: Birim sonra değiştiremezsin. Başlangıçta doğru seç.

```
Hatalı: A4 Kağıt = kg (Oysa "adet" olmalı)
→ Sonra değiştir: "adet" seç
```

### 5. Toplu Girimler

Aynı ürünü birden fazla giriş yap:

```
1. Giriş #1: 100 kg, tedarikçi A
2. Giriş #2: 150 kg, tedarikçi B
→ Dashboard'da toplam: 250 kg göstericek
```

### 6. Ürün Silme Uyarısı

Ürünü silersen, o ürünün stok harekete bile erişemezsin. Veri kaybı!
→ **Öneri**: Silmek yerine ürünü "inactive" işaretle

### 7. Müşteri Bakiyesi

Bakiye **sadece okunur**. Transactions'dan ayarlanır.

```
Müşteri ABC'nin bakiyesi: ₺500 (borçlu)
→ Müşteri hesabında direkt değiştiremezsin
→ Ödemeler'den işlem ekle
```

### 8. Export Gerek?

Verini Excel'e aktarabilirsin:
1. Tarayıcıda Ctrl+A (tümünü seç)
2. Ctrl+C (kopyala)
3. Excel'e yapıştır

---

## Sık Sorulan Sorular

### Stok negatif olabilir mi?

Evet! Örn:
- 100 kg girdi
- 120 kg çıktı
- Sonuç: -20 kg (borçlu durumdur)

Dashboard'da kırmızı gösterilir.

### Eski tarihi hareket ekleyebilir miyim?

Evet! **Tarih** alanında geçmiş tarihi seç.

### Ürün satış tutarını nereden görürüm?

Dashboard'da "Toplam Bakiye" veya müşteri detayında.

### Yanlış giriş yaptım, silme şansı var mı?

Şu anki versiyonda **Edit/Delete yok**, ama Supabase'de admin olarak silebilirsin:
1. Supabase Dashboard → SQL Editor
2. DELETE komutu çalıştır
3. Dikkat: Veri geri gelmez!

### Birden fazla kullanıcı aynı anda kullanabilir mi?

Evet! Herkese kendi hesabı ver, herkes login yapabilir.

---

## Veri Güvenliği

✓ Şifrelerin hashed
✓ Bağlantı HTTPS (şifreli)
✓ Database firewall korumalı
✓ Her kullanıcı kendi verisini görebilir

---

## Support

Sorun mu?

1. Tarayıcı konsolunu aç (F12)
2. Hata mesajını oku
3. DEPLOYMENT.md'de Troubleshooting bölümüne bak

---

**Başarılı bir stok takip sistemi kullanımı!** 📦
