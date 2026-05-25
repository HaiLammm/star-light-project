import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface HeroSlide {
  image: string;
  imageSp: string;
  alt: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    image: '/images/hero/hero-01.jpeg',
    imageSp: '/images/hero/hero-01.jpeg',
    alt: '緊急の電気トラブル 設備プロの電気工事士が年中無休・即対応',
  },
  {
    image: '/images/hero/hero-02.jpeg',
    imageSp: '/images/hero/hero-02.jpeg',
    alt: '水道修理のプロが即駆けつけます。水漏れ・つまりを設備プロの職人が24時間スピード解決',
  },
];

export default function HeroCarousel({ slides }: { slides?: HeroSlide[] } = {}) {
  const HERO_SLIDES = slides ?? DEFAULT_SLIDES;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isHovered = useRef(false);
  const isFocused = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: prefersReducedMotion ? 0 : 20,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.destroy();
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion || isHovered.current || isFocused.current) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi, prefersReducedMotion, selectedIndex]);

  const pauseFromHover = useCallback(() => {
    isHovered.current = true;
    setSelectedIndex((i) => i);
  }, []);

  const resumeFromHover = useCallback(() => {
    isHovered.current = false;
    if (!isFocused.current) setSelectedIndex((i) => i);
  }, []);

  const handleFocusIn = useCallback(() => {
    isFocused.current = true;
    setSelectedIndex((i) => i);
  }, []);

  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    const section = e.currentTarget;
    if (e.relatedTarget && section.contains(e.relatedTarget as Node)) return;
    isFocused.current = false;
    if (!isHovered.current) setSelectedIndex((i) => i);
  }, []);

  return (
    <div>
      <section
        aria-roledescription="carousel"
        aria-label="サービス紹介"
        className="relative py-4 md:py-[3.9rem] overflow-hidden"
        onMouseEnter={pauseFromHover}
        onMouseLeave={resumeFromHover}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="absolute inset-0 -z-10 transition-opacity duration-[1.5s]"
            style={{ opacity: selectedIndex === index ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover blur-[9rem] brightness-150 opacity-70"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}

        <div className="w-[94.7%] md:w-[87.8%] mx-auto overflow-hidden rounded-[3rem]" ref={emblaRef}>
          <div className="flex">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={index}
                className="min-w-0 flex-[0_0_100%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${HERO_SLIDES.length}: ${slide.alt}`}
              >
                <picture>
                  <source media="(max-width: 900px)" srcSet={slide.imageSp} width={1065} height={1113} />
                  <source media="(min-width: 901px)" srcSet={slide.image} width={2400} height={1016} />
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width={2400}
                    height={1016}
                    className="w-full h-auto object-cover block"
                    fetchPriority={index === 0 ? 'high' : undefined}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="auto"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-current={selectedIndex === index ? 'true' : undefined}
              aria-label={`スライド ${index + 1} を表示`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedIndex === index ? 'bg-[#fbc101]' : 'bg-[#e0e0e0]'
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 py-6 md:py-10">
        <picture>
          <source media="(max-width: 900px)" srcSet="/images/hero/kv-bottom-sp.svg" />
          <source media="(min-width: 901px)" srcSet="/images/hero/kv-bottom.svg" />
          <img
            src="/images/hero/kv-bottom.svg"
            alt=""
            className="w-full"
            aria-hidden="true"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
}
