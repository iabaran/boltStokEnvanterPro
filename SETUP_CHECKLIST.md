# ✅ Kurulum Kontrol Listesi

## Lokal Geliştirme Ortamı

- [ ] Node.js 16+ yüklü (`node --version`)
- [ ] Git yüklü (`git --version`)
- [ ] Proje klonlanmış
- [ ] `npm install` çalıştırıldı
- [ ] `.env` dosyası oluşturuldu

## Supabase Setup

- [ ] Supabase hesabı oluşturdu
- [ ] Yeni project oluşturdu
- [ ] Database password kaydetted
- [ ] API URL kopyaladı (VITE_SUPABASE_URL)
- [ ] API Key kopyaladı (VITE_SUPABASE_ANON_KEY)
- [ ] `.env` dosyasına ekledi
- [ ] SQL migration çalıştırdı (schema oluştu)
- [ ] Supabase Authentication etkinleştirdi

## Lokal Test

- [ ] `npm run dev` çalıştı
- [ ] http://localhost:5173 açıldı
- [ ] Kayıt sayfası yüklendi
- [ ] Email/password ile test kaydı yaptı
- [ ] Dashboard görüldü
- [ ] Ürün ekle/düzenle/sil test yaptı
- [ ] Stok hareket ekledi
- [ ] Müşteri ekledi

## GitHub Repository

- [ ] GitHub hesabı oluşturdu
- [ ] Yeni repository oluşturdu
- [ ] Repository adı: `paper-inventory`
- [ ] `.env` file .gitignore'da listelenmiş
- [ ] `git init` (gerekirse)
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git push origin main`

## Vercel Deployment

- [ ] Vercel hesabı oluşturdu
- [ ] GitHub ile bağlantı kurdu
- [ ] Repository'i Vercel'e import etti
- [ ] Build settings kontrol etti (Vite)
- [ ] Environment variables ekledi:
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
- [ ] Deploy başlatıldı
- [ ] Deployment tamamlandı
- [ ] Live URL erişilebilir

## Production Verification

- [ ] Vercel URL'sine git
- [ ] Kayıt sayfası yüklendi
- [ ] Email/password ile test kaydı yaptı
- [ ] Dashboard görüldü
- [ ] Tüm sayfalar erişilebilir
- [ ] Database bağlantı çalışıyor
- [ ] SSL certificate aktif (HTTPS)

## Documentation

- [ ] README.md okudu
- [ ] QUICKSTART.md okudu
- [ ] DEPLOYMENT.md okudu
- [ ] USAGE.md okudu
- [ ] OVERVIEW.md okudu

## Güvenlik Kontrol

- [ ] `.env` file local'de
- [ ] Production credentials environment variables'da
- [ ] RLS policies aktif (Supabase)
- [ ] HTTPS bağlantısı (Vercel + Supabase)
- [ ] Database firewall enable
- [ ] Backup ayarları kontrol

## Final Steps

- [ ] Repository linkini kaydet
- [ ] Vercel production URL'yi kaydet
- [ ] Supabase dashboard linkini kaydet
- [ ] Takım üyelerine credentials ver
- [ ] Ilk kullanıcı hesapları oluştur
- [ ] Training planı hazırla (opsiyonel)

---

## Troubleshooting

Sorun olduysa kontrol et:

- [ ] VITE_SUPABASE_URL formatı kontrol (https://...supabase.co)
- [ ] ANON_KEY boş değil mi?
- [ ] Database migration error yok mu?
- [ ] npm run build lokal başarılı mı?
- [ ] GitHub push başarılı mı?
- [ ] Vercel deployment logs'ta error yok mu?
- [ ] Supabase > Authentication > Providers > Email enabled mi?

---

## Sonra Ne?

- [ ] Ürün ekleyin
- [ ] Müşteri ekleyin
- [ ] Stok hareketi test edin
- [ ] Ödeme kaydı ekleyin
- [ ] Dashboard raporu kontrol edin
- [ ] Mobil tarayıcıda test edin
- [ ] Takımın kullanıma başlaması

---

## Backlog (İsteğe Bağlı)

- [ ] Custom domain bağlama
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Bulk import/export
- [ ] Mobile app
- [ ] Real-time collaboration
- [ ] Custom branding

---

**Yapıldı mı? Tebrikler! 🎉**

Sorularınız? → README.md Troubleshooting bölümü
