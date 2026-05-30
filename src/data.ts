import { Category, ArchiveItem, CaseStudy, SystemUser, AuditLog, SystemStats } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    nameEN: 'Royal Decrees & Treaties',
    nameAR: 'المراسيم الملكية والمعاهدات',
    code: 'CAT-DEC',
    descriptionEN: 'Historic official royal decrees, state treaties, and founding charters of the region.',
    descriptionAR: 'المراسيم الملكية الرسمية التاريخية والمعاهدات الدولية ووثائق التأسيس الأصلية للمنطقة.',
    itemCount: 42
  },
  {
    id: 'cat-2',
    nameEN: 'Photographic Heritage',
    nameAR: 'التراث الفوتوغرافي المرئي',
    code: 'CAT-IMG',
    descriptionEN: 'High-resolution historical images capturing Najd architecture, Hijaz life, and royal visits.',
    descriptionAR: 'صور تاريخية عالية الدقة توثق ملامح العمارة النجدية، وحياة الحجاز، والزيارات الملكية.',
    itemCount: 156
  },
  {
    id: 'cat-3',
    nameEN: 'Rare Manuscripts',
    nameAR: 'المخطوطات النادرة والكتب',
    code: 'CAT-MAN',
    descriptionEN: 'Handwritten Islamic scientific, astrological, and historical parchment codices.',
    descriptionAR: 'مخطوطات إسلامية نادرة مكتوبة بخط اليد تشمل العلوم والفلك والمدونات التاريخية على الرق.',
    itemCount: 28
  },
  {
    id: 'cat-4',
    nameEN: 'Oral History Recordings',
    nameAR: 'التسجيلات الشفهية والتاريخية',
    code: 'CAT-AUD',
    descriptionEN: 'Audio and video registers of elder family heads, tribal leaders, and regional keepers.',
    descriptionAR: 'تسجيلات مرئية وصوتية لأحاديث كبار السن، وزعماء القبائل، ورواد حفظ التاريخ الشفهي.',
    itemCount: 18
  },
  {
    id: 'cat-5',
    nameEN: 'Archaeological Maps',
    nameAR: 'الخرائط الأثرية والجغرافية',
    code: 'CAT-MAP',
    descriptionEN: 'Original hand-drawn pilotage and cartographic surveys of historical pilgrimage routes.',
    descriptionAR: 'خرائط ريادية ومسوحات جغرافية مرسومة يدويًا لطرق الحج القديمة ومسارات القوافل.',
    itemCount: 35
  }
];

export const INITIAL_ITEMS: ArchiveItem[] = [
  {
    id: 'item-1',
    code: 'IRTH-SA-1351',
    titleEN: 'The Unification National Charter',
    titleAR: 'ميثاق توحيد المملكة العربية السعودية',
    type: 'document',
    category: 'CAT-DEC',
    dateCreated: '1351 H / 1932 G',
    locationEN: 'Al-Murabba Palace, Riyadh',
    locationAR: 'قصر المربع، الرياض',
    ownerEN: 'King Abdulaziz Foundation (Darah)',
    ownerAR: 'دارة الملك عبدالعزيز',
    descriptionEN: 'The official public charter signed and sealed by the King, unifying the regions under the official name "Kingdom of Saudi Arabia". Includes original wax stamp.',
    descriptionAR: 'الميثاق الرسمي التاريخي الموقع والمختوم بختم الملك الموحد، لتوحيد أرجاء الدولة تحت المسمى الرسمي "المملكة العربية السعودية"، مع الختم الشمعي الأصلي.',
    tagsEN: ['Charter', 'Unification', 'Statehood', 'Royal'],
    tagsAR: ['ميثاق', 'التوحيد', 'الدولة', 'ملكي'],
    imageUrl: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=1200',
    fileSize: '48.5 MB',
    format: 'Preservation PDF/A',
    isFeatured: true
  },
  {
    id: 'item-2',
    code: 'IRTH-SA-1372',
    titleEN: 'Historical Streetscapes of Al-Balad, Jeddah',
    titleAR: 'لقطة تاريخية لأزقة جدة التاريخية (البلد)',
    type: 'image',
    category: 'CAT-IMG',
    dateCreated: '1372 H / 1953 G',
    locationEN: 'Al-Balad, Jeddah',
    locationAR: 'منطقة البلد، جدة',
    ownerEN: 'Ministry of Culture Archive',
    ownerAR: 'أرشيف وزارة الثقافة',
    descriptionEN: 'An extremely rare orthochromatic film photograph capturing the Roshan wooden balconies on traditional coral-stone buildings on a bustling market afternoon.',
    descriptionAR: 'صورة نادرة جدًا مأخوذة بفيلم أورثوكروماتيك تلتقط هندسة الرواشين الخشبية المحفورة على مباني الحجر المرجاني التقليدية في نهار أحد الأسواق النابضة بالحياة.',
    tagsEN: ['Roshan', 'Jeddah', 'Architecture', 'Traditional'],
    tagsAR: ['رواشين', 'جدة التاريخية', 'العمارة', 'تقليدي'],
    imageUrl: 'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?auto=format&fit=crop&q=80&w=1200',
    fileSize: '12.4 MB',
    format: 'High-Res TIFF',
    isFeatured: true
  },
  {
    id: 'item-3',
    code: 'IRTH-SA-1025',
    titleEN: 'The Al-Sufi Astrological Codex Page',
    titleAR: 'مخطوطة كتاب كواكب الأبراج للصوفي',
    type: 'document',
    category: 'CAT-MAN',
    dateCreated: '1025 H / 1616 G',
    locationEN: 'KAFD Historic Archive Library',
    locationAR: 'مكتبة الأرشيف التاريخي، مركز الملك عبد الله المالي',
    ownerEN: 'National Heritage Authority',
    ownerAR: 'هيئة التراث الوطنية',
    descriptionEN: 'Exquisitely illuminated parchment scroll detailing the stellar positions, hand-inked in black and premium gold leaf, featuring the constellation Cepheus.',
    descriptionAR: 'مخطوطة ممتازة ومذهبة بالتفصيل للأجرام والنجوم، مكتوبة يدويًا بالحبر الأسود وورق الذهب الفاخر المزين بدقة متناهية تظهر كوكبة قيفاوس الفلكية.',
    tagsEN: ['Astronomy', 'Manuscript', 'Gold Leaf', 'Islamic Science'],
    tagsAR: ['الفلك', 'مخطوطة', 'تذهيب', 'العلوم الإسلامية'],
    imageUrl: 'https://images.unsplash.com/photo-1503258594973-b1da0c1fe6f3?auto=format&fit=crop&q=80&w=1200',
    fileSize: '84.0 MB',
    format: 'Ultra-HD RAW JPEG',
    isFeatured: true
  },
  {
    id: 'item-4',
    code: 'IRTH-SA-1364',
    titleEN: 'Soundscape of Traditional Ardah Drumming',
    titleAR: 'تسجيل صوتي نادر لقرع طبول العرضة السعودية',
    type: 'video',
    category: 'CAT-AUD',
    dateCreated: '1364 H / 1945 G',
    locationEN: 'Ad-Diriyah Old Quarter',
    locationAR: 'الدرعية القديمة',
    ownerEN: 'Saudi Broadcasting Authority',
    ownerAR: 'هيئة الإذاعة والتلفزيون',
    descriptionEN: 'High fidelity audio recording of the traditional ceremonial dance, complete with surrounding crowds chanting historic Najd heroic poems.',
    descriptionAR: 'تسجيل صوتي عالي النقاء لأهازيج ورقصة العرضة النجدية الشهيرة، مصحوبًا بقرع الطبول التراثية وإلقاء القصائد الملحمية القديمة للفارس السعودي.',
    tagsEN: ['Ardah', 'Performing Arts', 'Najd', 'Folklore'],
    tagsAR: ['العرضة', 'الفنون الأدائية', 'نجد', 'الفولكلور'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    fileSize: '184.2 MB',
    format: 'Uncompressed FLAC',
    isFeatured: false
  },
  {
    id: 'item-5',
    code: 'IRTH-SA-1104',
    titleEN: 'Ottoman Hegira Pilgrim Trail Survey',
    titleAR: 'خريطة مسار قوافل الحج العثمانية التاريخية',
    type: 'document',
    category: 'CAT-MAP',
    dateCreated: '1104 H / 1693 G',
    locationEN: 'Al-Ula Heritage Oasis',
    locationAR: 'واحة العلا التراثية',
    ownerEN: 'Al-Madinah Regional Museum',
    ownerAR: 'متحف منطقة المدينة المنورة',
    descriptionEN: 'A hand-drawn navigational map illustrating fresh water wells, fortresses, and post riders along the inland pilgrim routes from Sham to Madinah.',
    descriptionAR: 'خريطة ملاحية مرسومة ومفصلة بخط اليد توضح آبار المياه العذبة والحصون ومحطات خيالة البريد على طول مسارات الحج الداخلي من الشام للمدينة المنورة.',
    tagsEN: ['Pilgrimage', 'Cartography', 'Al-Ula', 'Route'],
    tagsAR: ['الحقبة', 'الخرائط', 'العلا', 'مسارات'],
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=1200',
    fileSize: '36.8 MB',
    format: 'Preservation PDF/A',
    isFeatured: false
  },
  {
    id: 'item-6',
    code: 'IRTH-SA-1367',
    titleEN: 'Chronicle of Founding Diriyah Restoration',
    titleAR: 'فيلم وثائقي لترميم حي الطريف بالدرعية',
    type: 'video',
    category: 'CAT-MAN',
    dateCreated: '1440 H / 2019 G',
    locationEN: 'At-Turaif District, Diriyah',
    locationAR: 'حي الطريف التاريخي، الدرعية',
    ownerEN: 'Diriyah Gate Development Authority (DGDA)',
    ownerAR: 'هيئة تطوير بوابة الدرعية',
    descriptionEN: 'A full archival footage compiling the traditional mudbrick plastering restoration operations of the UNESCO world heritage palaces.',
    descriptionAR: 'مجموعة لقطات أرشيفية ممتازة توثق عمليات اللياسة الطينية التقليدية لترميم قصور حي الطريف التاريخي المدرج باليونسكو.',
    tagsEN: ['Diriyah', 'Restoration', 'UNESCO', 'Clay Architecture'],
    tagsAR: ['الدرعية', 'الترميم', 'اليونسكو', 'اللبن والتراب'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    fileSize: '450.0 MB',
    format: 'Archive MP4 4K',
    isFeatured: true
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    titleEN: 'Preserving Al-Khozama Royal Correspondence (1340-1360 H)',
    titleAR: 'حفظ المراسلات الملكية لقصر الخزامى (١٣٤٠-١٣٦٠ هـ)',
    clientEN: 'Ministry of Foreign Affairs Digital Vault',
    clientAR: 'أرصدة وزارة الخارجية الرقمية',
    year: '2024',
    summaryEN: 'Digitalization and cataloging of high-value historic correspondence letters, implementing custom Arabic handwriting character indexation.',
    summaryAR: 'رقمنة وفهرسة المراسلات الدبلوماسية والشخصية التاريخية عالية القيمة، وتطبيق نماذج الفهرسة اليدوية للخطوط العربية القديمة.',
    outcomesEN: [
      'Over 2,400 state communications restored',
      'Lossless high density color profiles locked',
      'Advanced regional keyword indexing mapped successfully'
    ],
    outcomesAR: [
      'ترميم وفهرسة ما يزيد عن ٢٤٠٠ مراسلة رسمية',
      'إنشاء ملفات لونية رقمية فائقة الدقة لحفظ خصائص الورق',
      'صياغة نظام الكلمات المفتاحية الذكي حسب الألقاب والقرى'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=800',
    category: 'Sovereign Archives'
  },
  {
    id: 'case-2',
    titleEN: 'Restoration & Storage of Al-Nakhla Agricultural Records',
    titleAR: 'ترميم وتوثيق سجلات الواحات الزراعية في الأحساء',
    clientEN: 'Al-Ahsa Irrigation Foundation',
    clientAR: 'المؤسسة العامة للري بالأحساء',
    year: '2025',
    summaryEN: 'Securing the centuries-old traditional irrigation agreements, water shares, and tribal palm lineage registries',
    summaryAR: 'تأمين سجلات تقسيم مياه عيون الأحساء وسجلات أنساب أشجار النخيل والاتفاقيات العرفية الموقعة منذ قرنين.',
    outcomesEN: [
      '1,250 unique agreements scanned and classified',
      'Interactive maps links overlaid to historic wells',
      'Public access terminal deployed for verified descendants'
    ],
    outcomesAR: [
      'مسح ضوئي وتصنيف لـ ١٢٥٠ اتفاقية فريدة لسبل المياه',
      'ربط السجلات بالخرائط الجغرافية المحدثة للعيون والأقنية',
      'توفير منصة مراجعة آمنة للأسر وملاك المزارع التراثية'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800',
    category: 'Agrarian History'
  }
];

export const INITIAL_USERS: SystemUser[] = [
  {
    id: 'user-1',
    name: 'Faisal Al-Saud',
    email: 'faisal.saud@irth.sa',
    role: 'Administrator',
    status: 'Active',
    departmentEN: 'Royal Archiving Division',
    departmentAR: 'شعبة الأرشيفات السيادية والمراسيم',
    lastActive: '2026-05-30 08:34'
  },
  {
    id: 'user-2',
    name: 'Noura Al-Ghamdi',
    email: 'noura.g@irth.sa',
    role: 'Archivist',
    status: 'Active',
    departmentEN: 'Manuscript Restoration Team',
    departmentAR: 'فريق ترميم وفهرسة المخطوطات القديمة',
    lastActive: '2026-05-30 09:12'
  },
  {
    id: 'user-3',
    name: 'Abdullah Qahtani',
    email: 'a.qahtani@darah.org.sa',
    role: 'Viewer',
    status: 'Active',
    departmentEN: 'King Abdulaziz Foundation Desk',
    departmentAR: 'مكتب دارة الملك عبدالعزيز الوطني',
    lastActive: '2026-05-29 18:20'
  },
  {
    id: 'user-4',
    name: 'Sarah Al-Moneef',
    email: 's.moneef@irth.sa',
    role: 'Archivist',
    status: 'Suspended',
    departmentEN: 'Visual Media Library',
    departmentAR: 'مكتبة الوسائط المرئية والسمعية القديمة',
    lastActive: '2026-05-15 14:10'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    user: 'Faisal Al-Saud',
    actionEN: 'Approved restoration release of Unification Charter record',
    actionAR: 'وافق على إتاحة وثيقة ميثاق التوحيد للجمهور المصرح لهم',
    target: 'IRTH-SA-1351',
    timestamp: '2026-05-30 08:32',
    status: 'Success'
  },
  {
    id: 'log-2',
    user: 'Noura Al-Ghamdi',
    actionEN: 'Uploaded high density manuscript scan file',
    actionAR: 'قام برفع ملف المسح الضوئي عالي الدقة للمخطوطة الأثرية',
    target: 'IRTH-SA-1025',
    timestamp: '2026-05-30 07:15',
    status: 'Success'
  },
  {
    id: 'log-3',
    user: 'Noura Al-Ghamdi',
    actionEN: 'Created category "Rare Manuscripts (CAT-MAN)"',
    actionAR: 'أنشأ التصنيف الرئيسي الجديد "المخطوطات النادرة والكتب"',
    target: 'CAT-MAN',
    timestamp: '2026-05-30 06:40',
    status: 'Success'
  },
  {
    id: 'log-4',
    user: 'Abdullah Qahtani',
    actionEN: 'Attempted to delete high-value sovereign decree dec-12',
    actionAR: 'محاولة حذف غير مصرح بها لمرسوم سيادي هام رقم dec-12',
    target: 'IRTH-SA-1351',
    timestamp: '2026-05-29 17:45',
    status: 'Failed'
  }
];

export const INITIAL_STATS: SystemStats = {
  totalItems: 279,
  totalCategories: 5,
  storageUsedGB: 184.6,
  storageLimitGB: 500.0,
  activeUsers: 8
};
