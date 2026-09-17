'use client';

import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/navigation';
import { QuoteButton, WhatsAppButton } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';

/**
 * @description Sticky site header with a full-screen mobile drawer.
 *
 * Accessibility behaviour implemented here: the toggle owns
 * `aria-expanded`/`aria-controls`, the open drawer traps Tab within itself,
 * Escape closes it and returns focus to the toggle, and background scroll is
 * locked while it is open. The desktop nav highlights the section currently in
 * view via `aria-current`.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('#inicio');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Solidify the header background once the hero starts scrolling away. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track which section is in view so the nav can mark it current. */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (inView?.target.id) setActive(`#${inView.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* Lock background scroll while the drawer is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Escape to close, and keep Tab inside the drawer while it is open. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  /* Move focus into the drawer when it opens. */
  useEffect(() => {
    if (!open) return;
    drawerRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
  }, [open]);

  return (
    <header
      id="site-header"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-romo-border bg-romo-black/95 backdrop-blur-sm'
          : 'border-transparent bg-gradient-to-b from-romo-black/80 to-transparent'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a
          id="header-logo-link"
          href="#inicio"
          className="shrink-0 rounded-sm"
          aria-label="Romo's Transportes — ir al inicio"
        >
          <Logo size="md" priority />
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  id={`nav-desktop-${item.href.slice(1)}`}
                  href={item.href}
                  aria-current={active === item.href ? 'true' : undefined}
                  className={`relative block rounded-sm px-3 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-romo-red after:transition-transform hover:text-romo-cream-light hover:after:scale-x-100 aria-[current]:text-romo-cream-light aria-[current]:after:scale-x-100 ${
                    active === item.href ? 'text-romo-cream-light' : 'text-romo-muted'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton
            place="header"
            label="WhatsApp"
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
          />
          <QuoteButton place="header" label="Cotizar" size="sm" className="hidden sm:inline-flex" />

          <button
            ref={toggleRef}
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="btn btn-ghost min-h-[2.75rem] w-[2.75rem] shrink-0 !px-0 lg:hidden"
          >
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer. Kept in the DOM but inert when closed so the toggle's
          aria-controls target always resolves. */}
      <div
        ref={drawerRef}
        id="mobile-menu"
        hidden={!open}
        className="border-t border-romo-border bg-romo-black lg:hidden"
      >
        <nav aria-label="Navegación principal (móvil)" className="shell py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-romo-border/60 last:border-b-0">
                <a
                  id={`nav-mobile-${item.href.slice(1)}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.href ? 'true' : undefined}
                  className="flex min-h-[3.25rem] items-center justify-between gap-3 py-1 text-base font-semibold uppercase tracking-[0.08em] text-romo-cream-light aria-[current]:text-romo-red"
                >
                  {item.label}
                  <Icon name="arrow" className="h-4 w-4 text-romo-muted" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5">
            <QuoteButton place="menu-movil" className="w-full" />
            <WhatsAppButton place="menu-movil" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
