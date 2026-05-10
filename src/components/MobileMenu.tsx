import { useState, useEffect, useRef, useCallback } from 'react';
import type { NavigationItem, PhoneConfig } from '../utils/siteConfig';

interface MobileMenuProps {
  navigation: NavigationItem[];
  phone: PhoneConfig;
}

export default function MobileMenu({ navigation, phone }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    const trigger = document.getElementById('mobile-menu-trigger');
    trigger?.setAttribute('aria-expanded', 'true');
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const trigger = document.getElementById('mobile-menu-trigger');
    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.focus();
  }, []);

  useEffect(() => {
    const trigger = document.getElementById('mobile-menu-trigger');
    if (!trigger) return;
    const handler = () => open();
    trigger.addEventListener('click', handler);
    return () => trigger.removeEventListener('click', handler);
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      firstFocusable?.focus();
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const transitionClass = prefersReducedMotion.current ? '' : 'transition-transform duration-300 ease-out';

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="ナビゲーションメニュー"
        id="mobile-menu"
        className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-white overflow-y-auto ${transitionClass}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <span className="text-lg font-bold text-navy">メニュー</span>
          <button
            type="button"
            onClick={close}
            aria-label="メニューを閉じる"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-text-primary hover:text-orange min-h-[44px] flex items-center"
                >
                  {item.icon && (
                    <svg className="w-5 h-5 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d={item.icon} />
                    </svg>
                  )}
                  {item.label}
                </a>
                {item.children && (
                  <ul className="ml-7 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="block px-3 py-2 text-sm text-text-secondary hover:text-orange min-h-[44px] flex items-center"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border-light">
          <a
            href={phone.href}
            aria-label={phone.ariaLabel}
            className="flex items-center justify-center gap-2 bg-orange text-white font-bold text-lg py-3 rounded-lg min-h-[44px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-xs">通話無料</span>
            {phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
