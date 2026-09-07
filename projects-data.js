const PROJECTS_DATA = [
    {
        id: "alara",
        title: {
            tr: "ALARA Portal",
            en: "ALARA Portal"
        },
        tag: {
            tr: "Enterprise · SAP B1",
            en: "Enterprise · SAP B1"
        },
        category: "enterprise",
        accentColor: "#10b981",
        gradient: "linear-gradient(135deg, #e6fffa 0%, #ebf8ff 100%)",
        icon: "🏭",
        summary: {
            tr: "SAP Business One ile entegre çalışan modern web portalı. Satış siparişleri, sevkiyat, stok transferleri, kalite ve operasyon yönetimi.",
            en: "Modern enterprise web portal integrated with SAP Business One. Manages sales orders, shipments, inventory transfers, quality control, and operations."
        },
        description: {
            tr: "ALARA, SAP Business One ERP ekosistemi üzerinde uçtan uca çalışan kurumsal bir web portalıdır. Şirket içi satış siparişi yönetimi, sevkiyat ve depo transfer süreçleri, kalite kontrol testleri ve yönetimsel raporlamaları tek platformda birleştirir. Kullanıcı dostu arayüzü sayesinde operasyonel karmaşıklığı azaltır ve iş akış sürelerini belirgin şekilde hızlandırır.",
            en: "ALARA is an end-to-end enterprise web portal built on top of the SAP Business One ERP ecosystem. It consolidates internal sales order management, logistics & warehouse transfers, quality control testing, and executive reporting into a single unified platform. Its user-friendly interface reduces operational complexity and significantly accelerates workflow execution."
        },
        features: {
            tr: [
                "SAP Business One ile gerçek zamanlı bi-directional entegrasyon",
                "Satış siparişleri, teklifler ve fatura oluşturma modülleri",
                "Depolar arası stok transferi ve barkod / RFID destekli ürün takibi",
                "DevExtreme ve Angular ile yüksek performanslı veri tabloları ve raporlama",
                "Role tabanlı yetkilendirme ve detaylı denetim izi (audit log) kaydı"
            ],
            en: [
                "Real-time bi-directional integration with SAP Business One",
                "Sales orders, quotations, and invoice generation modules",
                "Inter-warehouse stock transfers with barcode / RFID asset tracking",
                "High-performance data grids and executive reporting via DevExtreme & Angular",
                "Role-based access control (RBAC) and comprehensive audit logging"
            ]
        },
        tech: ["Angular", ".NET Core", "DevExtreme", "SAP B1", "SQL Server", "REST API"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "stockanalystai",
        title: {
            tr: "StockAnalystAI",
            en: "StockAnalystAI"
        },
        tag: {
            tr: "Fintech · Yapay Zekâ",
            en: "Fintech · AI"
        },
        category: "ai",
        accentColor: "#f59e0b",
        gradient: "linear-gradient(135deg, #fffbea 0%, #fff1f2 100%)",
        icon: "📈",
        summary: {
            tr: "Borsa şirketlerini teknik ve finansal verilerle analiz eden, deterministik hesaplamaları yapay zekâ destekli yorumlama ile birleştiren platform.",
            en: "Financial research platform analyzing public companies by combining deterministic quantitative computations with AI-driven Insights."
        },
        description: {
            tr: "StockAnalystAI, finansal piyasalardaki şirketlerin bilanço, gelir tablosu, rasyoları ve teknik göstergelerini işleyen akıllı bir finans araştırma platformudur. Geleneksel teknik/temel analiz formüllerini LLM (Büyük Dil Modelleri) ve özel ajan akışlarıyla birleştirerek yatırımcılara anlaşılır özetler, duyarlılık analizleri ve karar destek verileri sunar.",
            en: "StockAnalystAI is an intelligent financial intelligence platform processing company balance sheets, income statements, financial ratios, and technical indicators. By fusing traditional fundamental/technical analysis formulas with Large Language Models (LLMs) and custom autonomous agent workflows, it delivers concise executive summaries, sentiment analysis, and decision support data to investors."
        },
        features: {
            tr: [
                "Temel ve teknik analiz göstergelerinin otomatize edilmiş hesaplanması",
                "LLM / Yapay zeka ajanları ile finansal rapor özeti ve grafik yorumlama",
                "Geriye dönük test (Backtesting) ve senaryo analizi motoru",
                "Özelleştirilebilir alarm ve takip listesi (Watchlist) yönetimi"
            ],
            en: [
                "Automated computation of fundamental financial ratios and technical indicators",
                "Financial statement summaries and chart interpretations driven by LLM / AI agents",
                "Backtesting engine and custom scenario analysis framework",
                "Customizable price alerts and watchlist management system"
            ]
        },
        tech: ["AI / LLM", "Financial Analysis", "Python", "Technical Analysis", "Backtesting", "REST API"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "cuzdanim-mobile",
        title: {
            tr: "Cüzdanım Mobile",
            en: "Cüzdanım Mobile"
        },
        tag: {
            tr: "Mobile · FinTech",
            en: "Mobile · FinTech"
        },
        category: "mobile",
        accentColor: "#6366f1",
        gradient: "linear-gradient(135deg, #eef2ff 0%, #f3e8ff 100%)",
        icon: "💳",
        summary: {
            tr: "Gelir ve gider akışlarını özel kategoriler ve yerel veritabanı entegrasyonuyla takip etmeyi sağlayan minimalist mobil finans uygulaması.",
            en: "Minimalist mobile finance application tracking income and expenses via custom categories and offline-first local database."
        },
        description: {
            tr: "Cüzdanım Mobile, kişisel bütçe takibini karmaşıklıktan uzaklaştırarak kullanıcıya sade ve hızlı bir deneyim sunan mobil finans uygulamasıdır. İnternet bağlantısına ihtiyaç duymadan yerel veritabanı üzerinde çalışır. Görsel grafikler, harcama kategorileri ve aylık bütçe hedefleri belirleme özellikleriyle finansal farkındalığı artırır.",
            en: "Cüzdanım Mobile simplifies personal finance management by offering a sleek, distraction-free user experience. Operating fully offline via an embedded local database, it enhances financial mindfulness through visual analytics, customizable category management, and budget goal tracking."
        },
        features: {
            tr: [
                "İnternetsiz (Offline-first) çalışma mimarisi ve güvenli yerel depolama",
                "Dinamik harcama ve gelir kategorileri tanımlayabilme",
                "Aylık/haftalık harcama grafikleri ve bütçe aşım uyarıları",
                "Koyu ve açık tema desteği ile modern minimalist arayüz"
            ],
            en: [
                "Offline-first architecture with secure local data storage",
                "Dynamic income and expense category customization",
                "Weekly/monthly spending breakdown charts and budget threshold alerts",
                "Modern minimalist UI featuring native dark and light mode support"
            ]
        },
        tech: ["Flutter", "Dart", "Mobile UI/UX", "Local DB / SQLite", "Charts"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "tiny-wins",
        title: {
            tr: "Tiny Wins",
            en: "Tiny Wins"
        },
        tag: {
            tr: "Mobile · Habit Tracker",
            en: "Mobile · Habit Tracker"
        },
        category: "mobile",
        accentColor: "#f97316",
        gradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
        icon: "🔥",
        summary: {
            tr: "Kişisel gelişim ve mikro alışkanlık yönetimini davranışsal motivasyon prensipleriyle harmanlayan Flutter tabanlı mobil uygulama.",
            en: "Flutter-based mobile habit tracker fusing micro-habit management with behavioral psychology and gamification."
        },
        description: {
            tr: "Tiny Wins, kullanıcıların yeni alışkanlıklar edinme ve kişisel hedeflerini sürdürme süreçlerini oyunlaştırma (gamification) ve davranışsal psikoloji teknikleriyle destekleyen mobil bir uygulamadır. Günlük, haftalık ve aylık periyotlarda tanımlanan hedefler, renk kodlu kategori altyapısıyla görselleştirilir. Günlük hedeflerin tamamlanması durumunda tetiklenen dinamik seri (streak) algoritması ve etkileşimli başarı takvimi sayesinde kullanıcıların bağlılığı ve devamlılığı artırılır.",
            en: "Tiny Wins is a mobile habit tracking application designed to help users build lasting routines using gamification and behavioral psychology techniques. Habits categorized by custom color codes can be set across daily, weekly, or monthly cadences. Completing daily habits triggers a dynamic streak algorithm and lights up a visual success calendar to maximize retention and momentum."
        },
        features: {
            tr: [
                "Periyodik alışkanlık mimarisi (Günlük, haftalık ve aylık hedef zamanlamaları)",
                "Renk kodlu görsel kategori sistemi ve kişiselleştirilebilir takip kartları",
                "Oyunlaştırılmış seri (Streak) algoritması ve etkileşimli başarı takvimi",
                "Davranışsal motivasyon odaklı dinamik sürdürülebilirlik bildirimleri",
                "Flutter altyapısı ile yüksek performanslı, reaktif ve sezgisel UI/UX deneyimi"
            ],
            en: [
                "Flexible habit cadences (Daily, weekly, and monthly scheduling)",
                "Color-coded visual categorization and customizable tracking cards",
                "Gamified streak counter algorithm and interactive completion calendar",
                "Behavioral motivation triggers and dynamic retention messaging",
                "High-performance, reactive, and intuitive mobile UI built with Flutter"
            ]
        },
        tech: ["Flutter", "Dart", "Mobile UI/UX", "Habit Tracking", "Local DB", "State Management"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "otopark-odeme",
        title: {
            tr: "Akıllı Otopark Ödeme",
            en: "Smart Parking Payment"
        },
        tag: {
            tr: "SaaS · Mobility",
            en: "SaaS · Mobility"
        },
        category: "saas",
        accentColor: "#06b6d4",
        gradient: "linear-gradient(135deg, #ecfeff 0%, #eff6ff 100%)",
        icon: "🚗",
        summary: {
            tr: "Otoparklarda ödeme, plaka tanıma, kiosk ve mobil deneyimi bir araya getiren dijital ödeme altyapısı çözümü.",
            en: "Digital parking infrastructure unifying License Plate Recognition (ANPR), mobile web payments, and kiosk systems."
        },
        description: {
            tr: "Belediyeler, alışveriş merkezleri ve özel otopark işletmeleri için geliştirilen uçtan uca akıllı otopark yönetim ve ödeme altyapısıdır. Plaka tanıma kameraları (ANPR) ile araç giriş-çıkış takibi yapar, sürücülerin mobil cihazlarından veya self-servis kiosklardan kartsız/temassız ödeme yapmalarını sağlar.",
            en: "An end-to-end smart parking management and payment ecosystem tailored for municipalities, shopping centers, and private facility operators. Utilizing Automated Number Plate Recognition (ANPR) cameras, it tracks vehicle entry/exit seamlessly and empowers drivers to make contactless payments via mobile devices or self-service kiosks."
        },
        features: {
            tr: [
                "Kamera tabanlı otomatik plaka tanıma (Computer Vision / ANPR) entegrasyonu",
                "QR kod ve mobil web üzerinden hızlı temassız ödeme altyapısı",
                "Kiosk arayüzü ve pos entegrasyonları",
                "İşletmeciler için anlık doluluk oranı, gelir analitiği ve raporlama paneli"
            ],
            en: [
                "Computer Vision & ANPR integration for automatic license plate recognition",
                "Frictionless contactless payments via QR code and mobile web",
                "Self-service kiosk software interface and POS terminal integration",
                "Real-time occupancy metrics, revenue analytics, and admin reporting dashboard"
            ]
        },
        tech: ["SaaS", "Payment Gateway", "Computer Vision", "Mobile Web", "Cloud Architecture"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "erze-sap",
        title: {
            tr: "ERZE_SAP Entegrasyonu",
            en: "ERZE_SAP Integration"
        },
        tag: {
            tr: "B2B · Enterprise",
            en: "B2B · Enterprise"
        },
        category: "enterprise",
        accentColor: "#3b82f6",
        gradient: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
        icon: "🔄",
        summary: {
            tr: "SAP REST API üzerinden çalışan, operasyonel süreçleri kolaylaştıran ve SAP kullanım maliyetlerini %50 düşüren entegrasyon katmanı.",
            en: "Integration layer operating over SAP REST API, streamlining operational workflows and reducing SAP licensing costs by 50%."
        },
        description: {
            tr: "ERZE_SAP, fabrika ve saha çalışanlarının doğrudan SAP arayüzüne girmeden ihtiyaç duydukları veri ve işlemleri hızlıca yürütmesini sağlayan özel entegrasyon yazılımıdır. Özel geliştirilen .NET mimarisi ve SAP REST API ile kullanıcı lisans maliyetlerini ciddi oranda düşürürken veri giriş hatalarını da en aza indirir.",
            en: "ERZE_SAP is a proprietary integration solution enabling shop-floor operators and field staff to execute SAP operations without direct SAP GUI access. Developed with .NET and SAP REST API, it significantly lowers annual named-user licensing costs while reducing data entry errors on high-volume production lines."
        },
        features: {
            tr: [
                "SAP Business One REST API katmanı ile güvenli iletişim",
                "Saha ve ambar kullanıcıları için basitleştirilmiş arayüzler",
                "Yıllık SAP lisans maliyetlerinde %50'ye varan tasarruf",
                "Yüksek işlem hacimlerinde kesintisiz ve hızlı veri senkronizasyonu"
            ],
            en: [
                "Secure communication layer via SAP Business One REST API",
                "Simplified light-weight interfaces for warehouse and shop-floor personnel",
                "Up to 50% annual savings on SAP user licensing fees",
                "High-throughput data synchronization for heavy manufacturing environments"
            ]
        },
        tech: ["VB.NET / C#", "SAP REST API", "DevExpress", "MS SQL Server", "B2B Entegrasyon"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "itam-platform",
        title: {
            tr: "IT Asset Management",
            en: "IT Asset Management"
        },
        tag: {
            tr: "SaaS · IT Operations",
            en: "SaaS · IT Operations"
        },
        category: "saas",
        accentColor: "#8b5cf6",
        gradient: "linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)",
        icon: "💻",
        summary: {
            tr: "Kurumların donanım ve yazılım varlıklarını merkezi olarak yönetmesini sağlayan IT Asset Management SaaS platformu.",
            en: "Enterprise SaaS platform for centralized IT hardware, software license lifecycle management, and asset tracking."
        },
        description: {
            tr: "Şirketlerin envanterinde bulunan tüm bilgisayar, sunucu, lisans, çevre birimi ve mobil cihazların yaşam döngüsünü takip eden kurumsal ITAM çözümü. Zimmet yönetimi, yazılım lisans süreleri, bakım ve arıza takibini otomatize ederek IT ekiplerinin operasyonel yükünü hafifletir.",
            en: "An enterprise IT Asset Management (ITAM) platform monitoring the entire lifecycle of hardware assets, servers, peripherals, software licenses, and mobile devices. It automates employee asset assignments, warranty renewals, and maintenance ticketing, alleviating operational overhead for IT teams."
        },
        features: {
            tr: [
                "Varlık yaşam döngüsü (Edinme, Zimmet, Bakım, Hurda) takibi",
                "Otomatik lisans kullanım ve yenileme tarihi hatırlatıcıları",
                "Kullanıcı - Cihaz ilişkileri ve departman bazlı maliyet dağılımı",
                "Barkod / QR kod tarama ile hızlı envanter sayımı"
            ],
            en: [
                "Full asset lifecycle tracking (Procurement, Assignment, Maintenance, Retirement)",
                "Automated software license expiration and compliance alerts",
                "User-device relational mapping and departmental cost allocation",
                "Rapid inventory audits using integrated Barcode / QR code scanning"
            ]
        },
        tech: ["ITAM", "SaaS", "Asset Management", "Enterprise", "Automation", "REST API"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "payroll-saas",
        title: {
            tr: "Payroll SaaS",
            en: "Payroll SaaS"
        },
        tag: {
            tr: "Product · HR & Payroll",
            en: "Product · HR & Payroll"
        },
        category: "saas",
        accentColor: "#ec4899",
        gradient: "linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)",
        icon: "📊",
        summary: {
            tr: "Bordro ve çalışan süreçlerini dijitalleştirmeye yönelik, Spring Boot ve Angular tabanlı modern SaaS uygulaması.",
            en: "Cloud-native HR & payroll SaaS application engineered with Spring Boot microservices and Angular."
        },
        description: {
            tr: "İnsan kaynakları ve muhasebe departmanlarının bordro hesaplama, izin yönetimi, avans talepleri ve yan hak takibini dijitalleştiren bulut tabanlı mikroservis mimarili yazılım çözümü. Güncel mevzuatlara uygun esnek hesaplama motoru içerir.",
            en: "A cloud-native SaaS solution built with microservice architecture to digitize corporate HR operations, automated payroll calculation, leave management, advance payment workflows, and employee benefits tracking. Features a flexible rule engine compliant with labor regulations."
        },
        features: {
            tr: [
                "Spring Boot mikroservis mimarisi ve Angular frontend",
                "Otomatik bordro parametre hesaplamaları ve PDF bordro çıktısı",
                "Çalışan self-servis portalı (İzin, Avans ve Belge talepleri)",
                "Çoklu şirket ve çoklu şube desteği"
            ],
            en: [
                "Spring Boot microservices architecture with Angular SPA frontend",
                "Automated payroll parameter computation and dynamic PDF slip generation",
                "Employee self-service portal (Leave, cash advance, and document requests)",
                "Multi-tenant support for enterprise companies with multiple subsidiaries"
            ]
        },
        tech: ["Spring Boot", "Angular", "Java", "REST API", "PostgreSQL", "SaaS"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        id: "ai-products",
        title: {
            tr: "AI Otonom Ajanlar",
            en: "AI Autonomous Agents"
        },
        tag: {
            tr: "AI · Enterprise Workflows",
            en: "AI · Enterprise Workflows"
        },
        category: "ai",
        accentColor: "#10b981",
        gradient: "linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)",
        icon: "🤖",
        summary: {
            tr: "LLM'leri veri analizi, raporlama, karar destek ve otomasyon süreçlerinin bir parçası olarak kullanan ajan çözümleri.",
            en: "Suite of autonomous LLM agent systems integrating AI into enterprise analytics, decision support, and automation."
        },
        description: {
            tr: "Büyük Dil Modellerini (LLM) sadece sohbet arayüzlerinde değil; kurumsal veri analizi, doküman işleme, karar destek mekanizmaları ve otomatik iş akışlarında aktif ajanlar olarak konumlandıran yenilikçi ürün çalışmaları ve konsept projeler kümesi.",
            en: "A collection of innovative projects and concept prototypes positioning Large Language Models (LLMs) as autonomous agents embedded directly into enterprise data processing, document extraction, executive decision support, and automated business workflows."
        },
        features: {
            tr: [
                "RAG (Retrieval-Augmented Generation) ile kurum içi belge sorgulama",
                "Otonom ajan (Autonomous Agent) iş akışları ve görev dağıtımı",
                "Doğal dil ile veritabanı sorgulama ve grafik üretme sistemleri",
                "API bazlı LLM entegrasyonları ve maliyet/performans optimizasyonu"
            ],
            en: [
                "Retrieval-Augmented Generation (RAG) for internal document intelligence",
                "Autonomous agent task delegation and multi-step workflow execution",
                "Natural language to SQL database querying and dynamic chart generation",
                "API-level LLM integrations optimized for latency, cost, and accuracy"
            ]
        },
        tech: ["LLM", "AI Agents", "Python", "RAG Workflows", "LangChain / LlamaIndex", "Automation"],
        images: [],
        links: {
            github: "",
            demo: ""
        }
    }
];
