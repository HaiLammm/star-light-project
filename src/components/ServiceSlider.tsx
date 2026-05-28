import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface ServiceSlide {
  slug: string;
  label: string;
  href: string;
  description: string;
  startingPrice: number;
  imageSrc: string;
  imageAlt: string;
}

type Accent = 'water' | 'electricity';

interface Props {
  slides: ServiceSlide[];
  heading: string;
  subheading: string;
  eyebrow: string;
  accent: Accent;
  anchorId?: string;
  aboveFold?: boolean;
}

const ACCENT = {
  water: { color: 'var(--color-water)', tint: 'var(--color-water-tint)', pill: '水道' },
  electricity: { color: 'var(--color-electric-deep)', tint: 'var(--color-electric-tint)', pill: '電気' },
} as const;

export default function ServiceSlider({ slides, heading, subheading, eyebrow, accent, anchorId, aboveFold = false }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;
  const loopSlides = useMemo(() => [...slides, ...slides, ...slides], [slides]);
  const a = ACCENT[accent];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    duration: 30,
    dragFree: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap() % count);
  }, [emblaApi, count]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => emblaApi?.scrollNext(), 3000);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null; }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    return stopAutoplay;
  }, [emblaApi, startAutoplay, stopAutoplay]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    const currentMod = current % count;
    const diff = index - currentMod;
    emblaApi.scrollTo(current + diff);
  }, [emblaApi, count]);

  return (
    <section id={anchorId} className="py-14 md:py-20">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[0.08em]" style={{ color: a.color }}>
            <span className="w-7 h-[3px] rounded-sm" style={{ background: a.color }} />
            {eyebrow}
          </span>
          <h2 className="text-[23px] md:text-[30px] font-black text-navy tracking-wide mt-3">{heading}</h2>
          <p className="text-[13px] md:text-[15px] text-text-secondary mt-2 max-w-[680px] mx-auto" style={{ wordBreak: 'normal' }}>{subheading}</p>
        </div>

        <div className="flex justify-start md:justify-center gap-2.5 md:flex-wrap mb-8 overflow-x-auto md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {slides.map((slide, index) => (
            <button
              key={slide.slug}
              onClick={() => scrollTo(index)}
              className="shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-[14px] font-bold transition-colors border-[1.5px]"
              style={
                selectedIndex === index
                  ? { background: a.color, borderColor: a.color, color: '#fff' }
                  : { background: '#fff', borderColor: a.color, color: a.color }
              }
            >
              {slide.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden max-w-[1160px] mx-auto"
        ref={emblaRef}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div className="flex items-stretch px-2">
          {loopSlides.map((slide, index) => (
            <div key={`${slide.slug}-${index}`} className="min-w-0 flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_25%] px-2.5 md:px-3">
              <a
                href={slide.href}
                className="group flex flex-col h-full bg-white border border-border-warm rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(27,42,74,0.08)] hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="relative h-[140px] md:h-[160px] overflow-hidden">
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    width="640"
                    height="640"
                    decoding="auto"
                    loading={aboveFold && index < count * 2 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className="absolute top-2.5 left-2.5 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: a.color }}
                  >
                    {a.pill}
                  </span>
                </div>
                <div className="flex flex-col flex-1 px-4 pt-4 pb-[18px]">
                  <h3 className="text-[15px] md:text-[17px] font-black text-navy leading-snug line-clamp-2 overflow-wrap-anywhere">
                    {slide.label}
                  </h3>
                  <p className="text-[12px] md:text-[13px] text-text-secondary leading-relaxed mt-1.5 mb-3.5 flex-1 line-clamp-2 overflow-wrap-anywhere">
                    {slide.description}
                  </p>
                  <p className="text-[13px] text-text-secondary mb-3">
                    <span className="font-[Roboto] text-[18px] md:text-[22px] font-black text-cta mr-0.5">
                      {slide.startingPrice.toLocaleString()}
                    </span>
                    円[税込]〜
                  </p>
                  <span
                    className="text-[13px] font-bold border-t border-border-warm pt-3 flex justify-between items-center"
                    style={{ color: a.color }}
                  >
                    詳しく見る<span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
