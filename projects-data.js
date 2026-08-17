const PROJECTS_DATA = [
    {
        id: "alara",
        title: "ALARA Portal",
        tag: "Enterprise · SAP B1",
        category: "enterprise",
        accentColor: "#10b981",
        gradient: "linear-gradient(135deg, #e6fffa 0%, #ebf8ff 100%)",
        icon: "🏭",
        summary: "SAP Business One ile entegre çalışan modern web portalı. Satış siparişleri, sevkiyat, stok transferleri, kalite ve operasyon yönetimi.",
        description: "ALARA, SAP Business One ERP ekosistemi üzerinde uçtan uca çalışan kurumsal bir web portalıdır. Şirket içi satış siparişi yönetimi, sevkiyat ve depo transfer süreçleri, kalite kontrol testleri ve yönetimsel raporlamaları tek platformda birleştirir. Kullanıcı dostu arayüzü sayesinde operasyonel karmaşıklığı azaltır ve iş akış sürelerini belirgin şekilde hızlandırır.",
        features: [
            "SAP Business One ile gerçek zamanlı bi-directional entegrasyon",
            "Satış siparişleri, teklifler ve fatura oluşturma modülleri",
            "Depolar arası stok transferi ve barkod / RFID destekli ürün takibi",
            "DevExtreme ve Angular ile yüksek performanslı veri tabloları ve raporlama",
            "Role tabanlı yetkilendirme ve detaylı denetim izi (audit log) kaydı"
        ],
        tech: ["Angular", ".NET Core", "DevExtreme", "SAP B1", "SQL Server", "REST API"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "stockanalystai",
        title: "StockAnalystAI",
        tag: "Fintech · Yapay Zekâ",
        category: "ai",
        accentColor: "#f59e0b",
        gradient: "linear-gradient(135deg, #fffbea 0%, #fff1f2 100%)",
        icon: "📈",
        summary: "Borsa şirketlerini teknik ve finansal verilerle analiz eden, deterministik hesaplamaları yapay zekâ destekli yorumlama ile birleştiren platform.",
        description: "StockAnalystAI, finansal piyasalardaki şirketlerin bilanço, gelir tablosu, rasyoları ve teknik göstergelerini işleyen akıllı bir finans araştırma platformudur. Geleneksel teknik/temel analiz formüllerini LLM (Büyük Dil Modelleri) ve özel ajan akışlarıyla birleştirerek yatırımcılara anlaşılır özetler, duyarlılık analizleri ve karar destek verileri sunar.",
        features: [
            "Temel ve teknik analiz göstergelerinin otomatize edilmiş hesaplanması",
            "LLM / Yapay zeka ajanları ile finansal rapor özeti ve grafik yorumlama",
            "Geriye dönük test (Backtesting) ve senaryo analizi motoru",
            "Özelleştirilebilir alarm ve takip listesi (Watchlist) yönetimi"
        ],
        tech: ["AI / LLM", "Financial Analysis", "Python", "Technical Analysis", "Backtesting", "REST API"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "cuzdanim-mobile",
        title: "Cüzdanım Mobile",
        tag: "Mobile · FinTech",
        category: "mobile",
        accentColor: "#6366f1",
        gradient: "linear-gradient(135deg, #eef2ff 0%, #f3e8ff 100%)",
        icon: "💳",
        summary: "Gelir ve gider akışlarını özel kategoriler ve yerel veritabanı entegrasyonuyla takip etmeyi sağlayan minimalist mobil finans uygulaması.",
        description: "Cüzdanım Mobile, kişisel bütçe takibini karmaşıklıktan uzaklaştırarak kullanıcıya sade ve hızlı bir deneyim sunan mobil finans uygulamasıdır. İnternet bağlantısına ihtiyaç duymadan yerel veritabanı üzerinde çalışır. Görsel grafikler, harcama kategorileri ve aylık bütçe hedefleri belirleme özellikleriyle finansal farkındalığı artırır.",
        features: [
            "İnternetsiz (Offline-first) çalışma mimarisi ve güvenli yerel depolama",
            "Dinamik harcama ve gelir kategorileri tanımlayabilme",
            "Aylık/haftalık harcama grafikleri ve bütçe aşım uyarıları",
            "Koyu ve açık tema desteği ile modern minimalist arayüz"
        ],
        tech: ["Flutter", "Dart", "Mobile UI/UX", "Local DB / SQLite", "Charts"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "tiny-wins",
        title: "Tiny Wins",
        tag: "Mobile · Habit Tracker",
        category: "mobile",
        accentColor: "#f97316",
        gradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
        icon: "🔥",
        summary: "Kişisel gelişim ve mikro alışkanlık yönetimini davranışsal motivasyon prensipleriyle harmanlayan Flutter tabanlı mobil uygulama.",
        description: "Tiny Wins, kullanıcıların yeni alışkanlıklar edinme ve kişisel hedeflerini sürdürme süreçlerini oyunlaştırma (gamification) ve davranışsal psikoloji teknikleriyle destekleyen mobil bir uygulamadır. Günlük, haftalık ve aylık periyotlarda tanımlanan hedefler, renk kodlu kategori altyapısıyla görselleştirilir. Günlük hedeflerin tamamlanması durumunda tetiklenen dinamik seri (streak) algoritması ve etkileşimli başarı takvimi sayesinde kullanıcıların bağlılığı ve devamlılığı artırılır.",
        features: [
            "Periyodik alışkanlık mimarisi (Günlük, haftalık ve aylık hedef zamanlamaları)",
            "Renk kodlu görsel kategori sistemi ve kişiselleştirilebilir takip kartları",
            "Oyunlaştırılmış seri (Streak) algoritması ve etkileşimli başarı takvimi",
            "Davranışsal motivasyon odaklı dinamik sürdürülebilirlik bildirimleri",
            "Flutter altyapısı ile yüksek performanslı, reaktif ve sezgisel UI/UX deneyimi"
        ],
        tech: ["Flutter", "Dart", "Mobile UI/UX", "Habit Tracking", "Local DB", "State Management"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "otopark-odeme",
        title: "Akıllı Otopark Ödeme",
        tag: "SaaS · Mobility",
        category: "saas",
        accentColor: "#06b6d4",
        gradient: "linear-gradient(135deg, #ecfeff 0%, #eff6ff 100%)",
        icon: "🚗",
        summary: "Otoparklarda ödeme, plaka tanıma, kiosk ve mobil deneyimi bir araya getiren dijital ödeme altyapısı çözümü.",
        description: "Belediyeler, alışveriş merkezleri ve özel otopark işletmeleri için geliştirilen uçtan uca akıllı otopark yönetim ve ödeme altyapısıdır. Plaka tanıma kameraları (ANPR) ile araç giriş-çıkış takibi yapar, sürücülerin mobil cihazlarından veya self-servis kiosklardan kartsız/temassız ödeme yapmalarını sağlar.",
        features: [
            "Kamera tabanlı otomatik plaka tanıma (Computer Vision / ANPR) entegrasyonu",
            "QR kod ve mobil web üzerinden hızlı temassız ödeme altyapısı",
            "Kiosk arayüzü ve pos entegrasyonları",
            "İşletmeciler için anlık doluluk oranı, gelir analitiği ve raporlama paneli"
        ],
        tech: ["SaaS", "Payment Gateway", "Computer Vision", "Mobile Web", "Cloud Architecture"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "erze-sap",
        title: "ERZE_SAP Entegrasyonu",
        tag: "B2B · Enterprise",
        category: "enterprise",
        accentColor: "#3b82f6",
        gradient: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
        icon: "🔄",
        summary: "SAP REST API üzerinden çalışan, operasyonel süreçleri kolaylaştıran ve SAP kullanım maliyetlerini %50 düşüren entegrasyon katmanı.",
        description: "ERZE_SAP, fabrika ve saha çalışanlarının doğrudan SAP arayüzüne girmeden ihtiyaç duydukları veri ve işlemleri hızlıca yürütmesini sağlayan özel entegrasyon yazılımıdır. Özel geliştirilen .NET mimarisi ve SAP REST API ile kullanıcı lisans maliyetlerini ciddi oranda düşürürken veri giriş hatalarını da en aza indirir.",
        features: [
            "SAP Business One REST API katmanı ile güvenli iletişim",
            "Saha ve ambar kullanıcıları için basitleştirilmiş arayüzler",
            "Yıllık SAP lisans maliyetlerinde %50'ye varan tasarruf",
            "Yüksek işlem hacimlerinde kesintisiz ve hızlı veri senkronizasyonu"
        ],
        tech: ["VB.NET / C#", "SAP REST API", "DevExpress", "MS SQL Server", "B2B Entegrasyon"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "itam-platform",
        title: "IT Asset Management",
        tag: "SaaS · IT Operations",
        category: "saas",
        accentColor: "#8b5cf6",
        gradient: "linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)",
        icon: "💻",
        summary: "Kurumların donanım ve yazılım varlıklarını merkezi olarak yönetmesini sağlayan IT Asset Management SaaS platformu.",
        description: "Şirketlerin envanterinde bulunan tüm bilgisayar, sunucu, lisans, çevre birimi ve mobil cihazların yaşam döngüsünü takip eden kurumsal ITAM çözümü. Zimmet yönetimi, yazılım lisans süreleri, bakım ve arıza takibini otomatize ederek IT ekiplerinin operasyonel yükünü hafifletir.",
        features: [
            "Varlık yaşam döngüsü (Edinme, Zimmet, Bakım, Hurda) takibi",
            "Otomatik lisans kullanım ve yenileme tarihi hatırlatıcıları",
            "Kullanıcı - Cihaz ilişkileri ve departman bazlı maliyet dağılımı",
            "Barkod / QR kod tarama ile hızlı envanter sayımı"
        ],
        tech: ["ITAM", "SaaS", "Asset Management", "Enterprise", "Automation", "REST API"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "payroll-saas",
        title: "Payroll SaaS",
        tag: "Product · HR & Payroll",
        category: "saas",
        accentColor: "#ec4899",
        gradient: "linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)",
        icon: "📊",
        summary: "Bordro ve çalışan süreçlerini dijitalleştirmeye yönelik, Spring Boot ve Angular tabanlı modern SaaS uygulaması.",
        description: "İnsan kaynakları ve muhasebe departmanlarının bordro hesaplama, izin yönetimi, avans talepleri ve yan hak takibini dijitalleştiren bulut tabanlı mikroservis mimarili yazılım çözümü. Güncel mevzuatlara uygun esnek hesaplama motoru içerir.",
        features: [
            "Spring Boot mikroservis mimarisi ve Angular frontend",
            "Otomatik bordro parametre hesaplamaları ve PDF bordro çıktısı",
            "Çalışan self-servis portalı (İzin, Avans ve Belge talepleri)",
            "Çoklu şirket ve çoklu şube desteği"
        ],
        tech: ["Spring Boot", "Angular", "Java", "REST API", "PostgreSQL", "SaaS"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "ai-products",
        title: "AI Otonom Ajanlar",
        tag: "AI · Enterprise Workflows",
        category: "ai",
        accentColor: "#10b981",
        gradient: "linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)",
        icon: "🤖",
        summary: "LLM'leri veri analizi, raporlama, karar destek ve otomasyon süreçlerinin bir parçası olarak kullanan ajan çözümleri.",
        description: "Büyük Dil Modellerini (LLM) sadece sohbet arayüzlerinde değil; kurumsal veri analizi, doküman işleme, karar destek mekanizmaları ve otomatik iş akışlarında aktif ajanlar olarak konumlandıran yenilikçi ürün çalışmaları ve konsept projeler kümesi.",
        features: [
            "RAG (Retrieval-Augmented Generation) ile kurum içi belge sorgulama",
            "Otonom ajan (Autonomous Agent) iş akışları ve görev dağıtımı",
            "Doğal dil ile veritabanı sorgulama ve grafik üretme sistemleri",
            "API bazlı LLM entegrasyonları ve maliyet/performans optimizasyonu"
        ],
        tech: ["LLM", "AI Agents", "Python", "RAG Workflows", "LangChain / LlamaIndex", "Automation"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    }
];
