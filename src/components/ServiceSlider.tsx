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

interface Props {
  slides: ServiceSlide[];
  heading: string;
  subheading: string;
  englishLabel: string;
  bgColor: string;
  aboveFold?: boolean;
}

export default function ServiceSlider({ slides, heading, subheading, englishLabel, bgColor, aboveFold = false }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;
  const loopSlides = useMemo(() => [...slides, ...slides, ...slides], [slides]);

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
    <section className={`relative overflow-hidden ${!aboveFold ? 'mt-[6.6rem] md:mt-[3rem]' : ''}`}>
      <div className="relative max-w-[1240px] mx-auto px-5 md:px-[20px]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1200px] rounded-[20px] md:rounded-[40px] -z-10"
          style={{ background: bgColor, aspectRatio: '1200/555' }}
        />
        <h2 className="relative flex flex-col items-center text-center text-xl md:text-[clamp(28px,3.4vw,42px)] font-bold text-[#1c1c1c] leading-tight">
          <span className="block w-[2px] h-8 md:h-[clamp(40px,5.6vw,70px)] bg-white" />
          {heading}
          <span className="absolute top-8 md:top-[clamp(10px,3.6vw,45px)] left-1/2 -translate-x-1/2 font-[Roboto] text-[56px] md:text-[clamp(100px,14.5vw,180px)] font-bold whitespace-nowrap -z-[1] pointer-events-none opacity-30 text-white">
            {englishLabel}
          </span>
        </h2>
        <p className="mt-2 md:mt-4 text-[11px] md:text-[clamp(11px,1.1vw,14px)] font-medium text-[#1c1c1c] text-center">{subheading}</p>
      </div>

      <div className="flex justify-center mt-2.5 md:mt-[30px]">
        <ul className="flex items-center justify-center flex-wrap bg-white rounded-[33px] px-6 md:px-[30px] py-[9px]">
          {slides.map((slide, index) => (
            <li key={slide.slug}>
              <button
                onClick={() => scrollTo(index)}
                className={`px-4 md:px-[16px] py-[5px] md:py-[9px] pb-[6px] md:pb-[12px] rounded-[8px] text-xs md:text-base font-medium transition-colors whitespace-nowrap ${
                  selectedIndex === index ? 'bg-[#f6f6f6] text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {slide.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="overflow-hidden mt-[10px] md:mt-[20px]"
        ref={emblaRef}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div className="flex items-start">
          {loopSlides.map((slide, index) => (
            <div
              key={`${slide.slug}-${index}`}
              className={`min-w-0 flex-[0_0_60%] md:flex-[0_0_24%] px-[14px] md:px-[22px] ${index % 2 === 1 ? 'md:mt-[80px]' : ''}`}
            >
              <a href={slide.href} className="group flex flex-col h-full">
                <figure className="w-full aspect-square overflow-hidden flex-shrink-0"
                  style={{ filter: 'drop-shadow(0 5px 0 #b2b2b2)', borderRadius: 'inherit' }}
                >
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    width="640"
                    height="640"
                    decoding="auto"
                    loading={aboveFold && index < count * 2 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover rounded-[40px] md:rounded-[60px]"
                  />
                </figure>
                <div className="px-[14px] md:px-[19px] mt-2 md:mt-[14px] overflow-hidden">
                  <h3 className="text-sm md:text-[clamp(16px,1.77vw,22px)] font-extrabold text-gray-900 leading-snug group-hover:text-[#ff4176] transition-colors duration-200 line-clamp-2 overflow-wrap-anywhere">
                    {slide.label}
                  </h3>
                  <p className="text-[9px] md:text-[clamp(10px,0.97vw,12px)] text-gray-600 mt-0.5 line-clamp-2 overflow-wrap-anywhere">{slide.description}</p>
                  <div className="mt-1 md:mt-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] md:text-[clamp(10px,0.97vw,12px)]">作業料金</span>
                      <span className="inline-block bg-black text-white text-[8px] md:text-[clamp(9px,0.97vw,12px)] font-medium px-2 md:px-[14px] py-px rounded-[3px] md:rounded-[5px]">
                        WEB割引
                      </span>
                    </div>
                    <p className="font-[Roboto] text-xl md:text-[clamp(24px,2.58vw,32px)] font-bold text-[#ff4176] flex items-center gap-0.5 md:gap-1 mt-0.5 flex-wrap">
                      {slide.startingPrice.toLocaleString()}
                      <span className="text-[9px] md:text-[clamp(10px,1.13vw,14px)] font-medium text-gray-900 translate-y-[2px]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                        円[税込]〜
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
