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
    const handler = () => {
      if (isOpen) close();
      else open();
    };
    trigger.addEventListener('click', handler);
    return () => trigger.removeEventListener('click', handler);
  }, [open, close, isOpen]);

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

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="ナビゲーションメニュー"
        id="mobile-menu"
        className="fixed inset-0 w-full h-full overflow-y-auto"
        style={{ background: 'rgba(0,0,0,0.85)', padding: '50px 20px 100px' }}
      >
        <nav>
          <ul>
            {navigation.map((item) => (
              <li key={item.href} className="py-[20px]" style={{ borderBottom: '1px dotted rgba(255,255,255,0.5)' }}>
                <a
                  href={item.href}
                  className="flex items-center gap-[7px] text-[14px] font-bold text-white min-h-[44px]"
                >
                  <span className="shrink-0 w-[8px] h-[8px] rounded-full bg-cta" />
                  {item.label}
                </a>
                {item.children && (
                  <ul className="grid grid-cols-2 gap-[10px] mt-[10px]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="flex items-center gap-[8px] text-[12px] text-white min-h-[44px]"
                        >
                          <span className="shrink-0 w-[6px] h-[2px] bg-cta" />
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {item.columns && (
                  <div className="mt-[12px] flex flex-col gap-[16px]">
                    {item.columns.map((col) => {
                      const accent = col.accent === 'electric' ? '#FBC02D' : '#0277BD';
                      return (
                        <div key={col.key}>
                          <a
                            href={col.href}
                            className="flex items-center gap-[8px] text-[13px] font-bold text-white min-h-[40px]"
                          >
                            <span className="shrink-0 w-[9px] h-[9px] rounded-full" style={{ background: accent }} />
                            {col.label}
                          </a>
                          <ul className="grid grid-cols-2 gap-[10px] mt-[6px] pl-[17px]">
                            {col.children.map((child) => (
                              <li key={child.href}>
                                <a
                                  href={child.href}
                                  className="flex items-center gap-[8px] text-[12px] text-white min-h-[40px]"
                                >
                                  <span className="shrink-0 w-[6px] h-[2px]" style={{ background: accent }} />
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
