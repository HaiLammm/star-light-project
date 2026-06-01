interface HeroProps {
  image: string;
  imageSp?: string;
  alt?: string;
  phoneDisplay?: string;
  phoneHref?: string;
}

const BADGES = [
  { label: '見積り0円', color: 'var(--color-water)' },
  { label: '最短10分で到着', color: 'var(--color-electric-deep)' },
  { label: '相談無料', color: 'var(--color-cta)' },
  { label: '24時間365日', color: 'var(--color-navy)' },
];

export default function HeroCarousel({
  image,
  imageSp,
  alt = '設備プロの職人',
  phoneDisplay = '000000000000',
  phoneHref = 'tel:000000000000',
}: HeroProps) {
  return (
    <section className="pt-8 pb-2 md:pt-12 md:pb-3" aria-label="メインビジュアル">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-7 md:gap-12 items-center">
          {/* Text column */}
          <div className="md:order-1 order-2">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[0.08em] text-water before:content-[''] before:w-7 before:h-[3px] before:rounded-sm before:bg-water">
              電気・水道の修理プロ
            </span>
            <h2 className="text-[27px] md:text-[40px] leading-[1.5] md:leading-[1.45] font-black text-navy mt-3.5 mb-3 overflow-wrap-anywhere">
              水まわり・電気のトラブル、<br className="hidden md:block" />
              <span className="text-water">最短10分</span>でプロが駆けつけます。
            </h2>
            <p className="text-[15px] md:text-base text-text-secondary leading-[1.9] mb-6 overflow-wrap-anywhere">
              トイレのつまり、水漏れ、ブレーカー、給湯器まで。設備プロの有資格の職人が、年中無休・24時間スピード対応。まずはお気軽にご相談ください。
            </p>

            <ul className="grid grid-cols-2 gap-2.5 mb-6 md:flex md:flex-wrap">
              {BADGES.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center justify-center gap-2 bg-white border border-border-warm rounded-full px-2.5 py-2 text-[13px] font-bold text-navy shadow-[0_6px_24px_rgba(27,42,74,0.08)] md:px-4"
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: b.color }} />
                  {b.label}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-3.5 items-stretch">
              <a
                href={phoneHref}
                className="bg-cta hover:bg-cta-deep transition-colors text-white rounded-2xl px-6 py-3.5 w-full sm:w-auto sm:flex-none text-center sm:text-left shadow-[0_8px_20px_rgba(255,107,0,0.28)]"
              >
                <span className="block text-[11px] font-medium opacity-95">お電話でのご相談（通話無料）</span>
                <span className="block text-[26px] font-black leading-tight tracking-wide whitespace-nowrap">{phoneDisplay}</span>
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 bg-white border-2 border-navy text-navy font-bold rounded-2xl px-6 py-3.5 sm:py-3 w-full sm:w-auto text-[15px] hover:bg-navy hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px] shrink-0" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7.5 8.4 5.6a1 1 0 0 0 1.2 0L21 7.5" />
                </svg>
                メールで無料相談
              </a>
            </div>
          </div>

          {/* Media column */}
          <div className="relative md:order-2 order-1">
            <picture>
              {imageSp && <source media="(max-width: 767px)" srcSet={imageSp} />}
              <img
                src={image}
                alt={alt}
                width={900}
                height={840}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-[240px] md:h-[420px] object-cover rounded-3xl shadow-[0_6px_24px_rgba(27,42,74,0.08)]"
              />
            </picture>
            <div className="absolute -left-2 md:-left-3.5 bottom-5 md:bottom-6 bg-white rounded-2xl px-4 py-3 md:px-[18px] md:py-3 shadow-[0_6px_24px_rgba(27,42,74,0.12)] border-l-[5px] border-water">
              <b className="block text-navy font-black text-base md:text-[18px] leading-tight">満足保証</b>
              <small className="text-text-secondary text-[11px] md:text-[12px]">ご納得いただけなければ料金0円</small>
            </div>
          </div>
        </div>

        {/* Category selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[18px] mt-7 md:mt-9">
          <a
            href="#water"
            className="flex items-center gap-4 bg-white border border-border-warm rounded-2xl px-5 py-4 md:px-[22px] md:py-[18px] shadow-[0_6px_24px_rgba(27,42,74,0.08)] hover:-translate-y-0.5 transition-transform"
          >
            <span className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-2xl bg-water-tint flex items-center justify-center text-2xl shrink-0" aria-hidden="true">💧</span>
            <span className="min-w-0">
              <b className="block text-navy font-black text-base md:text-[18px]">水まわりの修理</b>
              <span className="text-[13px] text-text-secondary">トイレ・キッチン・お風呂・洗面所</span>
            </span>
            <span className="ml-auto font-black text-water" aria-hidden="true">→</span>
          </a>
          <a
            href="#electricity"
            className="flex items-center gap-4 bg-white border border-border-warm rounded-2xl px-5 py-4 md:px-[22px] md:py-[18px] shadow-[0_6px_24px_rgba(27,42,74,0.08)] hover:-translate-y-0.5 transition-transform"
          >
            <span className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-2xl bg-electric-tint flex items-center justify-center text-2xl shrink-0" aria-hidden="true">⚡</span>
            <span className="min-w-0">
              <b className="block text-navy font-black text-base md:text-[18px]">電気まわりの修理</b>
              <span className="text-[13px] text-text-secondary">ブレーカー・コンセント・照明・給湯器</span>
            </span>
            <span className="ml-auto font-black text-electric-deep" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
