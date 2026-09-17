'use client';

import { useEffect, useState } from 'react';
import { hasWhatsApp, whatsappLink } from '@/data/company';
import { QUOTE_ANCHOR } from '@/data/navigation';
import { quickWhatsAppMessage } from '@/lib/quote';
import { Icon } from '@/components/ui/Icon';

/**
 * @description Sticky contact bar, mobile only.
 *
 * Restrained on purpose, because the brief's "don't be spammy" constraint is a
 * real one:
 *   • Mobile only — the desktop header already carries both CTAs permanently.
 *   • Hidden until the hero has scrolled away, so it never covers the hero CTAs.
 *   • Hides itself again while the contact section is on screen, so it can
 *     never sit on top of the form it is pointing at.
 *   • There is no separate floating bubble anywhere on the page; this bar is the
 *     only persistent mobile CTA.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const href = whatsappLink(quickWhatsAppMessage);

  useEffect(() => {
    /* Show once the hero is behind us. */
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [nearForm, setNearForm] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const target = document.querySelector('#contacto');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => setNearForm(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.12 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const show = visible && !nearForm;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-romo-border bg-romo-black/97 backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex gap-2.5 px-[var(--shell-x)] py-3">
        <a
          href={QUOTE_ANCHOR}
          data-cta="cotizar"
          data-cta-place="sticky-movil"
          tabIndex={show ? undefined : -1}
          className="btn btn-primary flex-1"
        >
          <Icon name="quote" className="h-[1.125rem] w-[1.125rem]" />
          Cotizar
        </a>

        {hasWhatsApp && href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-cta-place="sticky-movil"
            tabIndex={show ? undefined : -1}
            className="btn btn-secondary w-[3.25rem] shrink-0 !px-0"
          >
            <span className="sr-only">Cotizar por WhatsApp (se abre en una ventana nueva)</span>
            <Icon name="whatsapp" className="h-5 w-5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
