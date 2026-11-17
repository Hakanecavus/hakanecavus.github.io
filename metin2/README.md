# HEC Metin2 Masası

Metin2 Okey Kartı ve Kralı Yakala etkinlikleri için kişisel takip ve antrenman uygulaması.

## Başlatma

ZIP arşivini çıkar ve `HEC-Okey-Masasi/index.html` dosyasını tarayıcıda aç. Windows'ta ZIP dosyasına sağ tıklayıp **Tümünü Ayıkla** seçeneğini kullanabilirsin. Chrome, Edge ve Firefox'un güncel sürümleri desteklenir. Kurulum, sunucu ve internet bağlantısı gerekmez.

## Okey Masası

- **Kart Takibi** Canlı etkinlikte kullandığın veya attığın kartı tıklayarak işaretle. Tekrar tıklayarak işareti kaldır. Tarayıcı yerel depolamaya izin verdiğinde işaretler sayfayı kapatsan da saklanır.
- **Antrenman** İlk beş kartı dağıt. Kartlara dokunarak onları aşağıdaki oyun alanına indir. Geçerli üçlü otomatik oynanır. Geçersiz üçlü masada kalır ve kartlara dokunarak onları eline geri alabilirsin. Bir kartı anında atmak için sağ tıkla veya klavyeyle karta odaklanıp Delete tuşuna bas. Dokunmatik ekranda **Kart atma** düğmesini etkinleştirip karta dokun. Son attığın kartı kart çekmeden veya üçlü oynamadan önce **Geri al** ile kurtarabilirsin. Antrenman turu sayfa yeniden açıldığında sıfırlanır.
- **Puan Rehberi** Üç kombinasyon türünü ve sandık eşiklerini gösterir.

## Kralı Yakala

- **Kral Not Defteri** Bir kare seçip kart değerini kaydet. Komşular için 5 ipucunu ayrıca işaretleyebilirsin. Tahta ve kart sayaçları güncellenir, notlar tarayıcıda saklanır. Bir notu sağ tıklayarak veya **Kareyi temizle** düğmesiyle kaldırabilirsin.
- **Kral Antrenmanı** Kapalı 25 karttan birini aç. Kartlar sırayla kullanılır. Son K kartıyla kralı tek tahminde yakalayabilirsin. Tamamlanan satır ve sütunlar +10 puan verir. Kapalı bir komşu 5 varsa son açılan karenin çevresindeki kapalı kartlar parlar. Elinde 5 varken puan vermeyecek komşu 5 tuzakları tahtada kırmızı olarak işaretlenir. **Antrenman Not Defteri** alanında kareleri elle işaretleyebilir veya **Son hamleyi not et** ile açılan kartı ve ipucunu kaydedebilirsin. Her yeni oyun karışık tahta üretir ve antrenman notlarını sıfırlar. Oyuncu eli resmî Wiki’deki 12 kartlık dağılımı izler.

`okey.js` ve `king.js` iki oyunun kurallarını içerir. `app.js` ortak navigasyonu ve Okey ekranlarını, `king-ui.js` Kralı Yakala ekranlarını yönetir. Arayüz `index.html` ve `styles.css` dosyalarındadır.

## Kaynaklar

- [Orijinal Metin2 Okey Kart Seti Not Defteri](https://metin2okeykartseti.blogspot.com/) · Kart işaretleme ve antrenman akışının referansı.
- [Metin2 Wiki – Okey Etkinliği](https://tr-wiki.metin2.gameforge.com/index.php/Okey_Etkinli%C4%9Fi_(Yaz)) · Okey Kart Seti, sandık ikonları ve puanlama.
- [Metin2 Wiki – Okey Card Game](https://en-wiki.metin2.gameforge.com/index.php/Okey_Card_Game) · Sandık eşikleri.
- [Gameforge – Metin2 oyun içi köy görüntüsü](https://images.assets-landingi.com/uc/d300d889-63a5-439b-b4cd-291cb1523c58/screen1.jpg).
- [Kralı Yakala orijinal not defteri ve antrenmanı](https://metin2kraliyakala.blogspot.com/) · Ekli HTML dosyası ekran akışının referansı.
- [Metin2 Wiki – Kralı Yakala](https://tr-wiki.metin2.gameforge.com/index.php/Kral%C4%B1_Yakala_Etkinli%C4%9Fi) ve [Catch the King](https://en-wiki.metin2.gameforge.com/index.php/Catch_the_King) · Kral kartları, ganimet ikonları, etkinlik görseli ve oyun kuralları.
- Instrument Sans ve Playfair Display yazı tiplerinin lisansları `assets` klasöründedir.

Metin2 görselleri WEBZEN / Gameforge'a aittir. HEC Metin2 Masası kişisel bir hayran uygulamasıdır.
