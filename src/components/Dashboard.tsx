import React, { useState } from 'react';
import { 
  Folder, FileText, Image, Video, FileSpreadsheet, Search, Filter, 
  Upload, Trash2, Edit3, Plus, ArrowUp, ArrowDown, ExternalLink, 
  Tag, Compass, Calendar, User, Eye, Check, X, MoveHorizontal, ListFilter
} from 'lucide-react';
import { Language, ArchiveItem, Category, SectionType } from '../types';
import { INITIAL_CASE_STUDIES } from '../data';

interface DashboardProps {
  lang: Language;
  items: ArchiveItem[];
  categories: Category[];
  setItems: React.Dispatch<React.SetStateAction<ArchiveItem[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  userDisplayName: string;
  userRole: string;
  addAuditLog: (actionEN: string, actionAR: string, target: string) => void;
}

export default function Dashboard({ 
  lang, 
  items, 
  categories, 
  setItems, 
  setCategories,
  userDisplayName,
  userRole,
  addAuditLog
}: DashboardProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('archive');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Edit / Creation Modals & states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<ArchiveItem | null>(null);

  // New item inputs
  const [newTitleEN, setNewTitleEN] = useState('');
  const [newTitleAR, setNewTitleAR] = useState('');
  const [newType, setNewType] = useState<'image' | 'video' | 'document' | 'report' | 'relic'>('document');
  const [newCategoryCode, setNewCategoryCode] = useState('');
  const [newDateCreated, setNewDateCreated] = useState('');
  const [newLocationEN, setNewLocationEN] = useState('');
  const [newLocationAR, setNewLocationAR] = useState('');
  const [newOwnerEN, setNewOwnerEN] = useState('');
  const [newOwnerAR, setNewOwnerAR] = useState('');
  const [newDescriptionEN, setNewDescriptionEN] = useState('');
  const [newDescriptionAR, setNewDescriptionAR] = useState('');
  const [newTagsEN, setNewTagsEN] = useState('');
  const [newTagsAR, setNewTagsAR] = useState('');

  // Category management toggle & creation
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategoryNameEN, setNewCategoryNameEN] = useState('');
  const [newCategoryNameAR, setNewCategoryNameAR] = useState('');
  const [newCategoryCodeInput, setNewCategoryCodeInput] = useState('');
  const [newCategoryDescEN, setNewCategoryDescEN] = useState('');
  const [newCategoryDescAR, setNewCategoryDescAR] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Active viewing item detail sidebar
  const [activeItemDetail, setActiveItemDetail] = useState<ArchiveItem | null>(null);

  const text = {
    EN: {
      dashTitle: 'Sovereign Preservation Hub',
      dashDesc: 'Catalog, arrange, and search private registers.',
      searchPlace: 'Search via code number, title, keywords or tag bindings...',
      categoryFilter: 'Category Archive Select',
      typeFilter: 'Resource Type Filter',
      all: 'All collections',
      totalFound: 'Matching assets indexed: ',
      uploadBtn: 'Incorporate New Heritage Asset',
      manageCatBtn: 'Configure Category Manifests',
      reorderTip: 'Reorder for curation hierarchy',
      codeLabel: 'Vault Archive Code',
      titleLabel: 'Archival Identification',
      locationLabel: 'Source Coordinates',
      ownerLabel: 'Attributed Custodian / Institution',
      dateLabel: 'Creation Record Epoch',
      descriptionLabel: 'Contextual Historiographical Narrative',
      tagsLabel: 'Keyword Identifiers',
      editTitle: 'Modify Archival Index Details',
      deleteTitle: 'Permanently purge heritage register',
      uploadTitle: 'Archive New Historical Resource',
      creationSuccess: 'Resource incorporated into permanent vaults.',
      editSuccess: 'Metadata records updated.',
      deleteSuccess: 'Asset purged from the archiving servers.',
      catSuccess: 'Category index updated successfully.',
      dragDropLabel: 'Drag & Drop original high-resolution assets here (TIFF, PDF/A, WAV, RAW) or click to choose from system files',
      comingSoon: 'Coming Soon — Oracle OCI Riyadh Live Integration',
      comingSoonDesc: 'Phase 2 capabilities including smart OCR transliteration, audio indexing, and public museum views are scheduled upon next infrastructure sequence.',
      museumComingTitle: 'Sovereign Virtual Museum (Under construction)',
      museumComingDesc: 'Interactive 3D tour experiences of traditional Saudi architecture, holographic rendering of manuscripts, and public access portals are scheduled for Phase 2.',
      categoryManagerTitle: 'Heritage Category Structures',
      newCategoryTitle: 'Formulate New Category',
      categoryNameEN: 'Category Name (English)',
      categoryNameAR: 'Category Name (Arabic)',
      categoryCode: 'Unique Scheme Code (e.g. CAT-SAD)',
      categoryDescEN: 'Historical significance summary (English)',
      categoryDescAR: 'Historical significance summary (Arabic)',
      addCategory: 'Create Institutional Category',
      ownerDesc: 'Owner/Custodian',
      detailsTitle: 'Detailed Archival Metadata Codex',
      close: 'Hide Drawer',
      dragTip: 'Format support: Preservation PDF/A // Multi-gigapixel TIFF // Uncompressed Audio',
      validationError: 'Please provide valid credentials and complete the required inputs.'
    },
    AR: {
      dashTitle: 'منظومة الحفظ الرقمي والتوثيق السيادي',
      dashDesc: 'فهرسة وتصنيف وتنظيم الأصول التاريخية والوثائق النادرة.',
      searchPlace: 'ابحث برمز الوثيقة، العنوان، الكلمات المفتاحية، أو التصنيفات...',
      categoryFilter: 'تصفية حسب التصنيف والفرع',
      typeFilter: 'تصفية حسب نوع الأصل التاريخي',
      all: 'جميع أرصدة المنصة',
      totalFound: 'إجمالي الأصول المفهرسة المطابقة: ',
      uploadBtn: 'أرشفة أصل تاريخي جديد',
      manageCatBtn: 'تنظيم تصنيفات الأرشيف',
      reorderTip: 'إعادة الترتيب التقييمي للأصول لترتيب العرض',
      codeLabel: 'رمز الحفظ في الخزانة',
      titleLabel: 'العنوان التعريفي المقيد',
      locationLabel: 'الإحداثيات ومكان النشوء',
      ownerLabel: 'المالك الحالي / جهة الحفظ والأيلولة',
      dateLabel: 'الحقبة والعهد التاريخي',
      descriptionLabel: 'السياق التاريخي والوصف التفصيلي للأصل',
      tagsLabel: 'علامات الفهرسة والكلمات المفتاحية',
      editTitle: 'تعديل بيانات القيد والبطاقة التعريفية',
      deleteTitle: 'حذف الأصل نهائياً من أرصدة الأرشيف',
      uploadTitle: 'إدخال وأرشفة وثيقة جديدة',
      creationSuccess: 'تم إنهاء إدراج الوثيقة في الحافظة الرقمية ومزامنتها بنجاح.',
      editSuccess: 'تم تحديث بيانات المعطيات والبطاقة التعريفية للوثيقة.',
      deleteSuccess: 'تم مسح الأصل والملف المصاحب له من الخوادم الرقمية بنجاح.',
      catSuccess: 'تم تحديث سجل قائمة التصنيفات بنجاح.',
      dragDropLabel: 'اسحب وأفلت الملفات عالية الدقة الأصلية هنا (TIFF، PDF/A، WAV) أو اضغط للاختيار يدوياً',
      comingSoon: 'قريباً جداً — تفعيل الترابط الحي مع سحابة أوراكل بالرياض',
      comingSoonDesc: 'ميزات المرحلة الثانية التي تشمل الفهرسة الذكية والنصوص المنسوخة آلياً وصوتيات التاريخ الشفهي وجناح المتاحف العامة تحت التطوير في الخوادم.',
      museumComingTitle: 'الأجنحة الافتراضية للمتحف الوطني (قريباً)',
      museumComingDesc: 'خدمات الجولات ثلاثية الأبعاد في الأحياء التاريخية كحي الطريف وقصر المربع وعروض مخطوطات الفلك المجسمة ستتوفر تدريجياً في المرحلة المقبلة.',
      categoryManagerTitle: 'تنظيم وتصنيف الهياكل الأرشيفية',
      newCategoryTitle: 'تأسيس تصنيف أرشيفي مؤسسي جديد',
      categoryNameEN: 'اسم التصنيف (بالإنجليزي)',
      categoryNameAR: 'اسم التصنيف (بالعربي)',
      categoryCode: 'رمز التصنيف الخاص (مثال: CAT-XYZ)',
      categoryDescEN: 'الملخص التاريخي للتصنيف (بالإنجليزي)',
      categoryDescAR: 'الملخص التاريخي للتصنيف (بالعربي)',
      addCategory: 'اعتماد هذا التصنيف بالمنظومة',
      ownerDesc: 'جهة الحفظ الأثرية',
      detailsTitle: 'البطاقة التعريفية ومجلد المعطيات والنسب',
      close: 'إخفاء اللوحة التوضيحية',
      dragTip: 'الصيغ الموصى بها: PDF/A المتحفي الدولي // ملفات صور TIFF ثنائية الطبقات // صوتيات FLAC',
      validationError: 'يرجى تقديم بيانات صحيحة ومكتملة للعملية.'
    }
  };

  const currentText = text[lang];

  // Section mapping
  const sectionsList: { id: SectionType; titleEN: string; titleAR: string }[] = [
    { id: 'archive', titleEN: 'Main Index / Archive', titleAR: 'الأرشيف والفهرس العام' },
    { id: 'images', titleEN: 'Photographs & Visuals', titleAR: 'المكتبة الفوتوغرافية التراثية' },
    { id: 'videos', titleEN: 'Video Chronicles', titleAR: 'مكتبة التسجيلات والأفلام ووثائقيات' },
    { id: 'reports', titleEN: 'Audit Reports & Surveys', titleAR: 'التقارير التاريخية والمسوحات الجغرافية' },
    { id: 'documents', titleEN: 'Documents & Title Deeds', titleAR: 'الوثائق الملكية والمبايعات والسكوك' },
    { id: 'cases', titleEN: 'Case Studies Center', titleAR: 'مركز دراسات حفظ التجارب' },
    { id: 'museum', titleEN: 'Sovereign Museum Lobby', titleAR: 'بهو المعروضات الافتراضي' },
  ];

  // Helper check status for active nav
  const handleSectionSelect = (sectionId: SectionType) => {
    setActiveSection(sectionId);
    // Auto preset proper resource type filter
    if (sectionId === 'images') setSelectedType('image');
    else if (sectionId === 'videos') setSelectedType('video');
    else if (sectionId === 'documents') setSelectedType('document');
    else if (sectionId === 'reports') setSelectedType('report');
    else setSelectedType('all');
  };

  // Reorder algorithm (moves item up or down)
  const handleReorder = (index: number, direction: 'up' | 'down') => {
    if (userRole === 'Viewer') {
      alert(lang === 'AR' ? 'عفواً، لا يملك حساب العرض صلاحية التعديل والترتيب.' : 'Viewer account lacks curation layout authorities.');
      return;
    }
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
    addAuditLog(
      `Reordered workspace layout item "${temp.titleEN}"`,
      `قام بإعادة ترتيب عرض الوثيقة "${temp.titleAR}" في الفهرس`,
      temp.code
    );
  };

  // Delete Action
  const handleDeleteItem = (itemId: string, itemCode: string, itemTitleEN: string, itemTitleAR: string) => {
    if (userRole === 'Viewer') {
      alert(lang === 'AR' ? 'عفواً، لا تملك رتبتك صلاحية حذف وإتلاف الأصول التاريخية.' : 'Your role lacks critical asset destruction privileges.');
      return;
    }
    const confirmed = window.confirm(
      lang === 'AR' 
        ? `هل أنت متأكد تمامًا من رغبتك في حذف وإقصاء الوثيقة: ${itemTitleAR} (كود: ${itemCode})؟` 
        : `Are you absolutely certain you wish to purge the historic asset record: ${itemTitleEN} (${itemCode})?`
    );

    if (confirmed) {
      setItems(prev => prev.filter(i => i.id !== itemId));
      addAuditLog(
        `Purged asset record "${itemTitleEN}"`,
        `قام بإجراء حذف كلي وقاطع للوثيقة مقيدة برمز "${itemTitleAR}"`,
        itemCode
      );
      if (activeItemDetail?.id === itemId) {
        setActiveItemDetail(null);
      }
      alert(currentText.deleteSuccess);
    }
  };

  // Upload (incorporation) submit handler
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEN || !newTitleAR || !newCategoryCode) {
      alert(currentText.validationError);
      return;
    }

    const codeNumber = `IRTH-SA-${1400 + Math.floor(Math.random() * 50)}`;
    const newItem: ArchiveItem = {
      id: `uploaded-${Date.now()}`,
      code: codeNumber,
      titleEN: newTitleEN,
      titleAR: newTitleAR,
      type: newType,
      category: newCategoryCode,
      dateCreated: newDateCreated || '1447 H / 2026 G',
      locationEN: newLocationEN || 'Historic Riyadh Archives',
      locationAR: newLocationAR || 'أرشيف الرياض التاريخي',
      ownerEN: newOwnerEN || 'Sovereign Family Trust',
      ownerAR: newOwnerAR || 'الخزانة العائلية العريقة للأسرة',
      descriptionEN: newDescriptionEN || 'Freshly incorporated heritage asset waiting for full spectral scans alignment.',
      descriptionAR: newDescriptionAR || 'أصل أرشيفي تم ضمه وتأثيث بطاقة معلومات هويته تمهيدًا لمطابقة القياس وعمل المسح الطيفي الكامل.',
      tagsEN: newTagsEN ? newTagsEN.split(',').map(t => t.trim()) : ['New Incorporated'],
      tagsAR: newTagsAR ? newTagsAR.split(',').map(t => t.trim()) : ['قيد جديد مستحدث'],
      imageUrl: newType === 'image' || newType === 'relic' 
        ? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1503258594973-b1da0c1fe6f3?auto=format&fit=crop&q=80&w=600',
      fileSize: '15.4 MB',
      format: 'JPEG high-fidelity archive copy'
    };

    setItems(prev => [newItem, ...prev]);

    // Update parent categories item count
    setCategories(prev => prev.map(cat => {
      if (cat.code === newCategoryCode) {
        return { ...cat, itemCount: cat.itemCount + 1 };
      }
      return cat;
    }));

    addAuditLog(
      `Archived new historical register "${newTitleEN}"`,
      `قام برقمنة وإضافة أصل تاريخي جديد ومستند باسم "${newTitleAR}"`,
      codeNumber
    );

    // Reset inputs
    setNewTitleEN('');
    setNewTitleAR('');
    setNewDateCreated('');
    setNewLocationEN('');
    setNewLocationAR('');
    setNewOwnerEN('');
    setNewOwnerAR('');
    setNewDescriptionEN('');
    setNewDescriptionAR('');
    setNewTagsEN('');
    setNewTagsAR('');
    setShowUploadModal(false);
    alert(currentText.creationSuccess);
  };

  // Open edit modal
  const handleOpenEdit = (item: ArchiveItem) => {
    if (userRole === 'Viewer') {
      alert(lang === 'AR' ? 'عفواً، حساب العرض لا يمتلك صلاحية التعديل.' : 'Viewer account not permitted to modify archives.');
      return;
    }
    setSelectedItemForEdit(item);
    setShowEditModal(true);
  };

  // Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForEdit) return;

    setItems(prev => prev.map(i => i.id === selectedItemForEdit.id ? selectedItemForEdit : i));
    
    addAuditLog(
      `Edited details for archive index "${selectedItemForEdit.titleEN}"`,
      `أجرى تعديلاً في بيانات ومطابقات الوثيقة المقيدة رقم "${selectedItemForEdit.titleAR}"`,
      selectedItemForEdit.code
    );

    setShowEditModal(false);
    setSelectedItemForEdit(null);
    alert(currentText.editSuccess);
  };

  // Category Operations Handlers
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryNameEN || !newCategoryNameAR || !newCategoryCodeInput) {
      alert(currentText.validationError);
      return;
    }

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      nameEN: newCategoryNameEN,
      nameAR: newCategoryNameAR,
      code: newCategoryCodeInput,
      descriptionEN: newCategoryDescEN,
      descriptionAR: newCategoryDescAR,
      itemCount: 0
    };

    setCategories(prev => [...prev, newCat]);
    addAuditLog(
      `Created category framework "${newCategoryNameEN}"`,
      `أنشأ هيكلًا وتصنيفًا جديدًا ومستقلًا باسم "${newCategoryNameAR}"`,
      newCategoryCodeInput
    );

    setNewCategoryNameEN('');
    setNewCategoryNameAR('');
    setNewCategoryCodeInput('');
    setNewCategoryDescEN('');
    setNewCategoryDescAR('');
    alert(currentText.catSuccess);
  };

  const handleDeleteCategory = (catId: string, catCode: string, catNameAR: string, catNameEN: string) => {
    if (userRole === 'Viewer') {
      alert(lang === 'AR' ? 'صلاحيات حساب العرض لا تسمح بحذف الفئات.' : 'Viewer account can not purge categories.');
      return;
    }
    const hasItems = items.some(i => i.category === catCode);
    if (hasItems) {
      alert(
        lang === 'AR'
          ? `عذرًا، لا يمكن حذف التصنيف المختار لوجود أصول مقيدة ومسجلة عليه حاليًا.`
          : `Cannot delete category. There are archived items currently tied with this category scheme.`
      );
      return;
    }

    const confirmDel = window.confirm(
      lang === 'AR'
        ? `هل تود حذف الفئة "${catNameAR}" نهائيًا من هياكل المنصة؟`
        : `Delete empty category "${catNameEN}" permanently?`
    );

    if (confirmDel) {
      setCategories(prev => prev.filter(c => c.id !== catId));
      addAuditLog(
        `Removed empty category structure "${catNameEN}"`,
        `قام بإسقاط تصنيف الفئة الفارغة "${catNameAR}" من قائمة المخطط`,
        catCode
      );
    }
  };

  // Dynamic filter lists
  const filteredItems = items.filter(item => {
    // Section match check
    const matchesSectionType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategoryCode === 'all' || item.category === selectedCategoryCode;

    // Search query multi match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.code.toLowerCase().includes(q) ||
      item.titleEN.toLowerCase().includes(q) ||
      item.titleAR.includes(q) ||
      item.locationEN.toLowerCase().includes(q) ||
      item.locationAR.includes(q) ||
      item.descriptionEN.toLowerCase().includes(q) ||
      item.descriptionAR.includes(q) ||
      item.tagsEN.some(t => t.toLowerCase().includes(q)) ||
      item.tagsAR.some(t => t.includes(q));

    return matchesSectionType && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8" style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
      
      {/* Upper Command Suite / Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-stone-900 border border-amber-500/10 rounded-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-amber-400 flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-500 animate-spin-slow" />
            <span>{currentText.dashTitle}</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">{currentText.dashDesc}</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            id="manage-categories-trigger"
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold bg-stone-950 border border-emerald-800/40 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500 transition rounded"
          >
            <Folder className="w-4 h-4" />
            {currentText.manageCatBtn}
          </button>
          
          <button
            id="upload-asset-trigger"
            onClick={() => {
              if (userRole === 'Viewer') {
                alert(lang === 'AR' ? 'صلاحيات حساب العرض الحالي لا تسمح برفع أصول جديدة.' : 'The currently loaded viewer profile is restricted to read-only.');
                return;
              }
              setShowUploadModal(true);
            }}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 border border-amber-500/20 text-stone-100 hover:text-stone-500 shadow transition rounded cursor-pointer"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            {currentText.uploadBtn}
          </button>
        </div>
      </div>

      {/* Sidebar navigation tabs inside Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider font-mono text-stone-500 uppercase px-2">
              {lang === 'AR' ? 'أقسام المركز البحثي' : 'ARCHIVE SECTIONS'}
            </h3>
            <div className="space-y-1">
              {sectionsList.map(sec => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    id={`section-tab-${sec.id}`}
                    onClick={() => handleSectionSelect(sec.id)}
                    className={`w-full text-left p-3 rounded p-2.5 text-xs font-semibold transition-all flex items-center justify-between ${
                      lang === 'AR' ? 'text-right' : 'text-left'
                    } ${
                      isActive 
                        ? 'bg-emerald-950 border-r-4 border-amber-500 text-amber-400' 
                        : 'text-stone-300 hover:bg-stone-900/60 hover:text-stone-100'
                    }`}
                  >
                    <span>{lang === 'AR' ? sec.titleAR : sec.titleEN}</span>
                    {sec.id === 'museum' && (
                      <span className="text-[9px] font-medium bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded uppercase shrink-0 font-mono">
                        SOON
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Informative Info */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/20 to-emerald-900/10 border border-emerald-922/20 text-stone-400 space-y-2">
            <span className="text-[10px] font-semibold text-amber-500 select-none uppercase tracking-widest font-mono">
              {lang === 'AR' ? 'حالة التوقيع الرقمي' : 'SIGNATURE AUTHORITY'}
            </span>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-stone-300">{userDisplayName}</p>
              <p className="text-[10px] text-stone-500 font-mono">ROLE: {userRole} // OCI-RYD</p>
            </div>
          </div>
        </div>

        {/* Categories Manager Panel Toggle Overlay Drawer */}
        {showCategoryManager && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-stone-900 rounded-xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-5 bg-stone-950 border-b border-stone-800 flex justify-between items-center">
                <h4 className="text-sm font-bold font-serif text-amber-300">{currentText.categoryManagerTitle}</h4>
                <button 
                  onClick={() => setShowCategoryManager(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* List of current categories */}
                <div className="space-y-2.5">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-3 bg-stone-950 rounded border border-stone-850 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 font-mono text-[9px] rounded font-bold">{cat.code}</span>
                          <h5 className="text-xs font-bold text-stone-200">
                            {lang === 'AR' ? cat.nameAR : cat.nameEN}
                          </h5>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          {lang === 'AR' ? cat.descriptionAR : cat.descriptionEN}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-amber-400/80 font-mono bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          {cat.itemCount} {lang === 'AR' ? 'وثائق' : 'assets'}
                        </span>
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.code, cat.nameAR, cat.nameEN)}
                          className="p-1.5 rounded bg-red-950/30 border border-red-500/20 text-red-400 hover:bg-red-950 hover:text-red-300 transition"
                          title="Purge Category Scheme"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create category form */}
                <form onSubmit={handleCreateCategory} className="p-4 bg-stone-950/70 border border-stone-800 rounded space-y-3.5">
                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">{currentText.newCategoryTitle}</h5>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-stone-400">{currentText.categoryNameEN}</label>
                      <input 
                        type="text" 
                        value={newCategoryNameEN}
                        onChange={(e) => setNewCategoryNameEN(e.target.value)}
                        placeholder="e.g. Archeological Findings" 
                        className="w-full text-xs bg-stone-900 border border-stone-800 focus:border-amber-400/40 rounded p-2 text-stone-200 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-stone-400">{currentText.categoryNameAR}</label>
                      <input 
                        type="text" 
                        value={newCategoryNameAR}
                        onChange={(e) => setNewCategoryNameAR(e.target.value)}
                        placeholder="مثال: المكتشفات الأثرية" 
                        className="w-full text-xs bg-stone-900 border border-stone-800 focus:border-amber-400/40 rounded p-2 text-stone-200 outline-none text-right"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-stone-400">{currentText.categoryCode}</label>
                    <input 
                      type="text" 
                      value={newCategoryCodeInput}
                      onChange={(e) => setNewCategoryCodeInput(e.target.value)}
                      placeholder="CAT-ARC" 
                      className="w-full text-xs font-mono uppercase bg-stone-900 border border-stone-800 focus:border-amber-400/40 rounded p-2 text-amber-400 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-stone-400">{currentText.categoryDescEN}</label>
                      <textarea 
                        value={newCategoryDescEN}
                        onChange={(e) => setNewCategoryDescEN(e.target.value)}
                        rows={2}
                        className="w-full text-xs bg-stone-900 border border-stone-800 rounded p-2 text-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-stone-400">{currentText.categoryDescAR}</label>
                      <textarea 
                        value={newCategoryDescAR}
                        onChange={(e) => setNewCategoryDescAR(e.target.value)}
                        rows={2}
                        className="w-full text-xs bg-stone-900 border border-stone-800 rounded p-2 text-stone-300 focus:outline-none text-right"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-xs font-bold rounded transition cursor-pointer"
                  >
                    {currentText.addCategory}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Content Panel Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Main index, images, videos, reports & documents workspace */}
          {activeSection !== 'museum' && activeSection !== 'cases' && (
            <>
              {/* Search, Filter, Indices Tools bar */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 shadow space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                  <input 
                    id="search-input-field"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={currentText.searchPlace}
                    className="w-full text-xs bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-lg p-3 pl-10 text-stone-200 outline-none transition"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-stone-400 hover:text-stone-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Extra Filter Options */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider">{currentText.categoryFilter}</label>
                    <div className="relative">
                      <ListFilter className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-500" />
                      <select
                        id="category-code-filter"
                        value={selectedCategoryCode}
                        onChange={(e) => setSelectedCategoryCode(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded p-2 pl-9 text-xs focus:outline-none"
                      >
                        <option value="all">{currentText.all}</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.code}>
                            [{cat.code}] {lang === 'AR' ? cat.nameAR : cat.nameEN}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {activeSection === 'archive' && (
                    <div className="flex-1 space-y-1">
                      <label className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider">{currentText.typeFilter}</label>
                      <select
                        id="type-resource-filter"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded p-2 text-xs focus:outline-none"
                      >
                        <option value="all">{lang === 'AR' ? 'جميع التصنيفات الفنية' : 'All structural types'}</option>
                        <option value="document">{lang === 'AR' ? 'وثائق ومستندات ورقية' : 'Diplomatic Documents'}</option>
                        <option value="image">{lang === 'AR' ? 'صور أرشيفية فوتوغرافية' : 'Photographic Imagery'}</option>
                        <option value="video">{lang === 'AR' ? 'وثائقيات وتسجيلات مرئية' : 'Spoken Chronicles'}</option>
                        <option value="report">{lang === 'AR' ? 'تقارير فنية ومسوحات' : 'Technical Surveys'}</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Total counter */}
              <div className="text-xs text-stone-400 px-1 font-mono">
                {currentText.totalFound} <span className="text-amber-400 font-bold">{filteredItems.length}</span>
              </div>

              {/* Item Records Table / Grid */}
              {filteredItems.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-stone-950/40 border border-stone-850">
                  <p className="text-sm text-stone-500">
                    {lang === 'AR' ? 'عفوًا، لم يتم العثور على أصول جارية تطابق معايير البحث والفرز.' : 'No archival matching criteria on search index matrices.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item, idx) => (
                    <div 
                      key={item.id}
                      id={`archive-item-card-${item.code}`}
                      className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                    >
                      {/* Left Block with photo avatar + title metadata details */}
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-800 bg-stone-900 relative group cursor-pointer" onClick={() => setActiveItemDetail(item)}>
                          <img 
                            src={item.imageUrl} 
                            alt={item.titleEN}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            referrerPolicy="no-referrer"
                          />
                          {/* Type overlay icon */}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-amber-400">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-amber-400 text-[10px] font-bold font-mono tracking-wide border border-emerald-900/40">
                              {item.code}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 text-[9px] font-mono font-semibold uppercase">
                              {item.type}
                            </span>
                          </div>
                          
                          <h4 
                            onClick={() => setActiveItemDetail(item)}
                            className="text-sm font-bold text-stone-100 font-serif cursor-pointer hover:text-amber-400 transition"
                          >
                            {lang === 'AR' ? item.titleAR : item.titleEN}
                          </h4>

                          <p className="text-xs text-stone-400 line-clamp-1 max-w-xl">
                            {lang === 'AR' ? item.descriptionAR : item.descriptionEN}
                          </p>

                          <div className="flex flex-wrap gap-2 text-[10px] text-stone-500 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {item.dateCreated}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {lang === 'AR' ? item.ownerAR : item.ownerEN}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action blocks: Reorder buttons, Metadata modifications, purges */}
                      <div className="flex items-center justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-stone-900">
                        {/* Quick tags */}
                        <div className="hidden xl:flex flex-wrap gap-1 max-w-[150px]">
                          {(lang === 'AR' ? item.tagsAR : item.tagsEN).slice(0, 2).map((tag, tIdx) => (
                            <span key={tIdx} className="px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 text-[9px]">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Reordering indicators */}
                        <div className="flex flex-col gap-1 text-stone-500" title={currentText.reorderTip}>
                          <button 
                            onClick={() => handleReorder(idx, 'up')}
                            disabled={idx === 0}
                            className={`p-1 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-stone-500 transition`}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleReorder(idx, 'down')}
                            disabled={idx === filteredItems.length - 1}
                            className={`p-1 hover:text-amber-400 disabled:opacity-30 enabled:hover:text-stone-500 transition`}
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Direct Metadata actions */}
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 hover:bg-emerald-950 transition rounded-lg"
                          title="Edit register data values"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id, item.code, item.titleEN, item.titleAR)}
                          className="p-1.5 text-xs text-red-400 bg-red-950/20 border border-red-500/20 hover:bg-red-950 transition rounded-lg"
                          title="Purge completely"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Case Studies section template inside Workspace */}
          {activeSection === 'cases' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-950/10 border border-emerald-900/30 rounded-xl">
                <h3 className="text-base font-bold font-serif text-amber-400">{lang === 'AR' ? 'مركز دراسات الحفظ وحماية الذاكرة المؤسسية' : 'Case Studies Center'}</h3>
                <p className="text-xs text-stone-400 mt-1">{lang === 'AR' ? 'أبحاث ودراسات مرجعية وممارسات الترميم الرقمي بالشرق الأوسط.' : 'Reference historical preservation projects and restoration summaries.'}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Custom list of case studies from static state */}
                {INITIAL_CASE_STUDIES.map(st => (
                  <div key={st.id} className="bg-stone-950 rounded-xl overflow-hidden border border-stone-800 hover:border-amber-500/20 transition-all flex flex-col justify-between">
                    <div className="h-44 overflow-hidden relative">
                      <img src={st.imageUrl} alt={st.titleEN} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-emerald-950 text-emerald-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-emerald-900/30">
                        {st.category}
                      </span>
                    </div>
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-stone-500 tracking-wider">CLIENT: {lang === 'AR' ? st.clientAR : st.clientEN} // {st.year}</span>
                        <h4 className="text-sm font-bold font-serif text-stone-100">{lang === 'AR' ? st.titleAR : st.titleEN}</h4>
                        <p className="text-xs text-stone-400 leading-relaxed">{lang === 'AR' ? st.summaryAR : st.summaryEN}</p>
                      </div>

                      <div className="space-y-1.5 pt-3 border-t border-stone-900">
                        <span className="text-[10px] font-bold text-amber-500 font-mono block uppercase">{lang === 'AR' ? 'المكتسبات المحققة:' : 'Milestones Locked:'}</span>
                        <ul className="text-xs text-stone-400 list-disc list-inside space-y-1">
                          {(lang === 'AR' ? st.outcomesAR : st.outcomesEN).map((out, oIdx) => (
                            <li key={oIdx}>{out}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Museum coming soon section */}
          {activeSection === 'museum' && (
            <div className="p-10 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-5">
              <div className="inline-flex p-4 rounded-full bg-emerald-950/80 text-amber-400 border border-amber-500/20">
                <Compass className="w-10 h-10 animate-spin-slow" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  {currentText.museumComingTitle}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {currentText.museumComingDesc}
                </p>
              </div>

              <div className="p-4 max-w-md mx-auto bg-emerald-950/30 border border-emerald-500/10 text-emerald-300 rounded-lg text-xs font-mono">
                {currentText.comingSoon}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Upload/Creation Overlay Drawer Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-stone-900 rounded-xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-stone-950 border-b border-stone-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-500" />
                <h4 className="text-sm font-bold font-serif text-amber-400">{currentText.uploadTitle}</h4>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Simulated high density file drag and drop zone */}
              <div className="p-6 border-2 border-dashed border-stone-800 hover:border-amber-500/20 bg-stone-950 rounded-lg text-center space-y-2">
                <div className="mx-auto w-10 h-10 rounded-full bg-emerald-950 flex items-center justify-center text-amber-400">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs text-stone-300 px-4 leading-relaxed font-semibold">
                  {currentText.dragDropLabel}
                </p>
                <p className="text-[10px] text-stone-500 font-mono">
                  {currentText.dragTip}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Title (English)</label>
                  <input 
                    type="text" 
                    value={newTitleEN}
                    onChange={(e) => setNewTitleEN(e.target.value)}
                    placeholder="e.g. Al-Darah Royal Decree Scroll"
                    className="w-full text-xs bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 text-stone-200 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">العنوان التعريفي (العربية)</label>
                  <input 
                    type="text" 
                    value={newTitleAR}
                    onChange={(e) => setNewTitleAR(e.target.value)}
                    placeholder="مثال: رسوم المرسوم الملكي القديم"
                    className="w-full text-xs bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 text-stone-200 outline-none text-right"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Resource Type</label>
                  <select 
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded p-2.5 focus:outline-none"
                  >
                    <option value="document">Diplomatic Document (PDF/A)</option>
                    <option value="image">Historical Photograph (TIFF)</option>
                    <option value="video">Spoken Record (FLAC/MP4)</option>
                    <option value="report">Geographical Survey (Raw GIS)</option>
                    <option value="relic">Relic Artifact Mockup</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Category Assumed</label>
                  <select 
                    value={newCategoryCode}
                    onChange={(e) => setNewCategoryCode(e.target.value)}
                    className="w-full text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded p-2.5 focus:outline-none"
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.code}>
                        [{cat.code}] {lang === 'AR' ? cat.nameAR : cat.nameEN}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Hijri/Gregorian date epoch</label>
                  <input 
                    type="text" 
                    value={newDateCreated}
                    onChange={(e) => setNewDateCreated(e.target.value)}
                    placeholder="e.g. 1342 H / 1923 G"
                    className="w-full text-xs bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 text-stone-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Owner Custodian (English / Arabic)</label>
                  <input 
                    type="text" 
                    value={newOwnerEN}
                    onChange={(e) => { setNewOwnerEN(e.target.value); setNewOwnerAR(e.target.value); }}
                    placeholder="e.g. King Faisal Archival Center"
                    className="w-full text-xs bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 text-stone-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Creation Coordinates (English)</label>
                  <input 
                    type="text" 
                    value={newLocationEN}
                    onChange={(e) => setNewLocationEN(e.target.value)}
                    placeholder="e.g. Diriyah Old Palace Quarter"
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">إحداثيات جغرافية المنشأ (العربية)</label>
                  <input 
                    type="text" 
                    value={newLocationAR}
                    onChange={(e) => setNewLocationAR(e.target.value)}
                    placeholder="مثال: واحة أثيليات الأحساء"
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Historical Context Narrative (English)</label>
                  <textarea 
                    value={newDescriptionEN}
                    onChange={(e) => setNewDescriptionEN(e.target.value)}
                    rows={2}
                    placeholder="Provide full description of context..."
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">الوصف التاريخي وسياق النشأة (العربية)</label>
                  <textarea 
                    value={newDescriptionAR}
                    onChange={(e) => setNewDescriptionAR(e.target.value)}
                    rows={2}
                    placeholder="تقديم أطروحة الوصف ومكان العثور..."
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none text-right"
                  />
                </div>
              </div>

              {/* Keyword bindings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">Keyword Index tags (comma separated - EN)</label>
                  <input 
                    type="text" 
                    value={newTagsEN}
                    onChange={(e) => setNewTagsEN(e.target.value)}
                    placeholder="e.g. Manuscript, Old Scroll, Wax Seal"
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400">علامات الفهرسة والمفاتيح (مفصولة بفاصلة - عربي)</label>
                  <input 
                    type="text" 
                    value={newTagsAR}
                    onChange={(e) => setNewTagsAR(e.target.value)}
                    placeholder="مثال: مخطوطة فلك، ختم شمع، رق قديم"
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none text-right"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-stone-850 text-stone-400 hover:text-stone-200 text-xs rounded transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-xs font-bold text-stone-100 border border-amber-500/20 rounded cursor-pointer"
                >
                  Confirm Upload Entry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Edit Details Overlay Drawer Modal */}
      {showEditModal && selectedItemForEdit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-stone-900 rounded-xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 bg-stone-950 border-b border-stone-800 flex justify-between items-center">
              <h4 className="text-sm font-bold font-serif text-amber-400">{currentText.editTitle}</h4>
              <button onClick={() => { setShowEditModal(false); setSelectedItemForEdit(null); }} className="text-stone-400 hover:text-stone-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">Title (English)</label>
                  <input 
                    type="text" 
                    value={selectedItemForEdit.titleEN}
                    onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, titleEN: e.target.value })}
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">العنوان التعريفي (العربية)</label>
                  <input 
                    type="text" 
                    value={selectedItemForEdit.titleAR}
                    onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, titleAR: e.target.value })}
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">Location Coordinate (EN)</label>
                  <input 
                    type="text" 
                    value={selectedItemForEdit.locationEN}
                    onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, locationEN: e.target.value })}
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">المكان التاريخي (العربي)</label>
                  <input 
                    type="text" 
                    value={selectedItemForEdit.locationAR}
                    onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, locationAR: e.target.value })}
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">Historical Origin Date Epoch</label>
                  <input 
                    type="text" 
                    value={selectedItemForEdit.dateCreated}
                    onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, dateCreated: e.target.value })}
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">Legal Custodian / Owner</label>
                  <input 
                    type="text" 
                    value={selectedItemForEdit.ownerEN}
                    onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, ownerEN: e.target.value, ownerAR: e.target.value })}
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-stone-400">Narrative Description (English)</label>
                <textarea 
                  value={selectedItemForEdit.descriptionEN}
                  onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, descriptionEN: e.target.value })}
                  rows={3}
                  className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-stone-400">الوصف التفصيلي (العربية)</label>
                <textarea 
                  value={selectedItemForEdit.descriptionAR}
                  onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, descriptionAR: e.target.value })}
                  rows={3}
                  className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-300 text-right"
                />
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setShowEditModal(false); setSelectedItemForEdit(null); }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-stone-200 text-xs rounded transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 hover:text-stone-300 text-xs font-bold rounded transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide-out Sidebar for Detailed Archival Metadata Reading Drawer */}
      {activeItemDetail && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-stone-950 border-l border-amber-500/20 shadow-2xl flex flex-col justify-between" style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
          
          <div className="p-5 bg-stone-900 border-b border-stone-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500 animate-spin-slow" />
              <h4 className="text-sm font-bold font-serif text-amber-400">{currentText.detailsTitle}</h4>
            </div>
            <button 
              onClick={() => setActiveItemDetail(null)}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            <div className="rounded-lg overflow-hidden border border-stone-800 bg-stone-900 h-64 relative">
              <img 
                src={activeItemDetail.imageUrl} 
                alt={activeItemDetail.titleEN} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 bg-stone-950/90 text-amber-400 text-[10px] font-mono border border-amber-500/20 px-2 py-0.5 rounded">
                CODE: {activeItemDetail.code}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider font-mono">
                  {lang === 'AR' ? 'المسمى والبطاقة المقيدة' : 'Archival Designation title'}
                </span>
                <h3 className="text-lg font-bold text-stone-100 font-serif">
                  {lang === 'AR' ? activeItemDetail.titleAR : activeItemDetail.titleEN}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stone-900 text-xs">
                <div>
                  <span className="text-stone-500 font-bold uppercase font-mono block text-[9px]">{currentText.dateLabel}</span>
                  <span className="text-stone-300 font-serif">{activeItemDetail.dateCreated}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-bold uppercase font-mono block text-[9px]">{currentText.locationLabel}</span>
                  <span className="text-stone-300 font-serif">{lang === 'AR' ? activeItemDetail.locationAR : activeItemDetail.locationEN}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-900">
                <span className="text-stone-500 font-bold uppercase font-mono block text-[9px]">{currentText.ownerLabel}</span>
                <span className="text-xs text-stone-200">{lang === 'AR' ? activeItemDetail.ownerAR : activeItemDetail.ownerEN}</span>
              </div>

              <div className="pt-3 border-t border-stone-900">
                <span className="text-stone-500 font-bold uppercase font-mono block text-[9px]">{currentText.descriptionLabel}</span>
                <p className="text-xs text-stone-400 leading-relaxed mt-1">
                  {lang === 'AR' ? activeItemDetail.descriptionAR : activeItemDetail.descriptionEN}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-900 space-y-1.5">
                <span className="text-stone-500 font-bold uppercase font-mono block text-[9px]">{currentText.tagsLabel}</span>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'AR' ? activeItemDetail.tagsAR : activeItemDetail.tagsEN).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-stone-900 text-amber-500/85 text-[10px] font-mono rounded border border-stone-850">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {activeItemDetail.fileSize && (
                <div className="pt-3 border-t border-stone-900 p-2.5 bg-stone-900/60 rounded border border-stone-900 text-[11px] space-y-1 text-stone-400">
                  <div className="flex justify-between">
                    <span>{lang === 'AR' ? 'حجم الملف الرقمي السليم:' : 'Preservation File Size:'}</span>
                    <span className="font-mono text-stone-200">{activeItemDetail.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'AR' ? 'صيغة تخزين المعيار:' : 'Secure Storage Format:'}</span>
                    <span className="font-mono text-emerald-400 font-semibold">{activeItemDetail.format}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-stone-900 border-t border-stone-850">
            <button
              onClick={() => setActiveItemDetail(null)}
              className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 text-amber-400 text-xs font-bold rounded transition text-center"
            >
              {currentText.close}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
