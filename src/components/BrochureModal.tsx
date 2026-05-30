import React from 'react';
import { X, Download, FileText, Globe, Shield, Database, Award, Info } from 'lucide-react';
import { Language } from '../types';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function BrochureModal({ isOpen, onClose, lang }: BrochureModalProps) {
  if (!isOpen) return null;

  const text = {
    EN: {
      title: 'Irth Platform Profile & Technical Brochure',
      subtitle: 'PRESERVING KNOWLEDGE & LEGACY — ENTERPRISE DIGITAL ARCHIVING',
      tagline: 'A Private, Premium Digital Archive for Sovereign Entities, Families, and Institutions',
      downloadBtn: 'Download PDF Brochure',
      disclaimer: 'This is an interactive preview of the official Irth platform profile compliant with Saudi PDPL and NCA guidelines.',
      close: 'Close',
      overview: 'Executive Overview',
      overviewDesc: 'Irth (Arabic for "heritage" or "legacy") is a highly secure, private digital archiving and document management portal designed specifically for the unique preservation needs of Middle Eastern sovereign entities, elite family offices, and leading legacy institutions. Built upon secure foundations, Irth ensures that physical manuscripts, historical media, legal scrolls, and oral testimonies are digitized, categorized, and protected for centuries to come.',
      featuresTitle: 'Core Capabilities',
      features: [
        {
          title: 'High-Fidelity Virtual Preservation',
          desc: 'Archiving under museum-grade standards. Fully supports high-resolution raw imagery, geographic coordinates mapping, and uncompressed multimedia registers.',
          icon: ArchiveIcon
        },
        {
          title: 'Saudi PDPL & NCA Compliance',
          desc: 'Provisioned on Oracle Cloud Infrastructure (OCI) Riyadh Region. Deep data residency guarantees ensuring sensitive assets never leave the boundaries of the Kingdom.',
          icon: ShieldIcon
        },
        {
          title: 'Advanced Arabic Indexing',
          desc: 'Multi-tiered metadata structures including Hijri/Gregorian date twin alignment, tribal lineage linkages, and calligraphic text search indexes.',
          icon: GlobeIcon
        },
        {
          title: 'Row-Level Security (RLS)',
          desc: 'Built with multi-tenant architecture from the ground up, guaranteeing absolute isolation of client-specific records through advanced PostgreSQL security attributes.',
          icon: DatabaseIcon
        }
      ],
      pricingTitle: 'Enterprise Deployment models',
      pricing: [
        { name: 'Elite Family Vault', size: 'Up to 500 GB Storage', details: 'Perfect for ancestral collections, oral audio libraries, and legal title deed registries.' },
        { name: 'Sovereign Institutional Archive', size: 'Up to 5 TB Storage', details: 'Tailored for government directorates, ministries, and high-value restoration catalogs.' }
      ],
      successMsg: 'Interactive PDF profile downloaded successfully (simulated).'
    },
    AR: {
      title: 'وثيقة التعريف الفنية لمنصة إرث',
      subtitle: 'حفظ المعرفة والإرث — أرشفة رقمية متكاملة لقطاع الأعمال والأسر العريقة',
      tagline: 'منصة أرشفة رقمية خاصة وفائقة الأمان للمؤسسات، العائلات العريقة، والجهات السيادية',
      downloadBtn: 'تحميل الوثيقة التعريفية PDF',
      disclaimer: 'هذا استعراض تفاعلي لملف منصة إرث الرسمي المتوافق مع نظام حماية البيانات الشخصية السعودي (PDPL) والضوابط الأساسية للأمن السيبراني (NCA).',
      close: 'إغلاق',
      overview: 'ملخص تنفيذي',
      overviewDesc: 'تُعد منصة "إرث" نظامًا تقنيًا خاصًا ومغلقًا لأرشفة الوثائق والملتيميديا، صُمم خصيصًا لتلبية احتياجات الحفظ التاريخي للمؤسسات العريقة والمكاتب العائلية رفيعة المستوى في منطقة الخليج العربي. تضمن منصة إرث رقمنة وفهرسة وحماية الأوراق والمخطوطات النادرة، والوسائط التاريخية، والشهادات السمعية، ونقلها بأمان جيلًا بعد جيل.',
      featuresTitle: 'القدرات الأساسية للمنصة',
      features: [
        {
          title: 'حفظ رقمي فائق الدقة والاستدامة',
          desc: 'أرشفة تتبع المعايير المتحفية العالمية. دعم كامل لصور المستندات فائقة الدقة، والمسوحات الجغرافية، والملفات الصوتية التاريخية غير المضغوطة.',
          icon: ArchiveIcon
        },
        {
          title: 'التوافق التام مع ضوابط الأمن السيبراني ونظام حماية البيانات',
          desc: 'تستضيف المنصة خوادمها بالكامل في سحابة أوراكل (OCI) بالرياض لصمان بقاء البيانات داخل حدود المملكة العربية السعودية وتوافقها مع اللوائح الوطنية.',
          icon: ShieldIcon
        },
        {
          title: 'فهرسة عربية وهجرية متقدمة',
          desc: 'محرك فهرسة يدعم ربط التاريخ الهجري بالميلادي، وبناء شبكة علاقات الأنساب، وفهرسة المصطلحات التاريخية والكلمات القديمة والخطوط اليدوية.',
          icon: GlobeIcon
        },
        {
          title: 'أمان عزل البيانات التام',
          desc: 'بنية هندسية متعددة المستأجرين تفصل بيانات وسجلات كل عائلة أو جهة بشكل قطعي على مستوى قاعدة البيانات لضمان السرية المطلقة.',
          icon: DatabaseIcon
        }
      ],
      pricingTitle: 'نماذج الاشتراك والتأسيس',
      pricing: [
        { name: 'باقة الخزانة العائلية العريقة', size: 'سعة تخزينية حتى ٥٠٠ جيجابايت', details: 'تناسب أرشفة المجموعات الأسرية، التاريخ الشفهي، والملكيات العقارية والوصايا.' },
        { name: 'باقة الأرشيف المؤسسي السيادي', size: 'سعة تخزينية حتى ٥ تيرابايت', details: 'مخصصة للوزارات، المتاحف الخاصة، والجهات الحكومية التي تمتلك مراسلات ووثائق تاريخية ضخمة.' }
      ],
      successMsg: 'تم بدء تحميل الملف التعريفي بنجاح (محاكاة).'
    }
  };

  const handleDownload = () => {
    alert(text[lang].successMsg);
  };

  const currentText = text[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        id="brochure-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-stone-900 text-stone-100 rounded-xl border border-amber-500/30 shadow-2xl flex flex-col"
        style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}
      >
        {/* Header decoration */}
        <div className="h-2 bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-900" />

        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between p-6 border-b border-stone-855">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-500" />
            <div>
              <h2 className="text-xl font-bold font-serif tracking-tight text-amber-400">{currentText.title}</h2>
              <p className="text-xs text-stone-400">{currentText.subtitle}</p>
            </div>
          </div>
          <button 
            id="close-brochure-btn"
            onClick={onClose}
            className="p-2 transition rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Tagline */}
          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-center">
            <p className="text-lg font-serif italic text-amber-300">
              "{currentText.tagline}"
            </p>
          </div>

          {/* Overview */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold font-serif text-emerald-400 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-500" />
              {currentText.overview}
            </h3>
            <p className="text-sm leading-relaxed text-stone-300">
              {currentText.overviewDesc}
            </p>
          </section>

          {/* Features Grid */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold font-serif text-emerald-400 border-b border-stone-800 pb-2">
              {currentText.featuresTitle}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {currentText.features.map((feat, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-500/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-amber-400 shrink-0">
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-stone-100 font-serif">{feat.title}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deployment Plans */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold font-serif text-emerald-400 border-b border-stone-800 pb-2">
              {currentText.pricingTitle}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {currentText.pricing.map((plan, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-amber-400 font-serif">{plan.name}</h4>
                    <p className="text-xs text-stone-400 mt-1">{plan.details}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-800/30 flex justify-between items-center text-xs font-mono">
                    <span className="text-stone-400">{lang === 'AR' ? 'السعة المخزنة:' : 'Storage Allocation:'}</span>
                    <span className="text-emerald-400 font-bold">{plan.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer section */}
          <div className="p-4 rounded bg-stone-950/80 border border-stone-800 text-stone-400 text-xs flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-500/70 shrink-0" />
            <p>{currentText.disclaimer}</p>
          </div>
        </div>

        {/* Footer Area with download button */}
        <div className="p-6 bg-stone-950 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-500 font-mono">
            IRTH-SPEC-v1.2 // RLS PROTECTED // GCC ARCHIVING
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              id="download-brochure-submit"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-stone-100 rounded-lg text-sm font-semibold shadow-md transition-all border border-amber-500/20 w-full sm:w-auto"
            >
              <Download className="w-4 h-4 text-amber-400" />
              {currentText.downloadBtn}
            </button>
            <button
              id="close-brochure-modal-footer"
              onClick={onClose}
              className="px-5 py-3 tracking-wide bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 rounded-lg text-sm font-medium transition"
            >
              {currentText.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon helper wrapper components for clean JSX referencing
function ArchiveIcon(props: any) {
  return <FileText {...props} />;
}
function ShieldIcon(props: any) {
  return <Shield {...props} />;
}
function GlobeIcon(props: any) {
  return <Globe {...props} />;
}
function DatabaseIcon(props: any) {
  return <Database {...props} />;
}
