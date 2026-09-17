'use client';

import { useEffect, useState } from 'react';
import { QUOTE_ANCHOR } from '@/data/navigation';
import { Icon } from '@/components/ui/Icon';

/**
 * @description Sticky contact bar, mobile only.
 *
 * Restrained on purpose, because the brief's "don't be spammy" constraint is a
 * real one:
 *   • Mobile only — the desktop header carries the quote CTA permanently.
 *   • Hidden until the hero has scrolled away, so it never covers the hero CTA.
 *   • Hides itself again while the contact section is on screen, so it can
 *     never sit on top of the form it is pointing at.
 *   • Carries the quote CTA only. WhatsApp is the separate floating button,
 *     which is offset to sit above this bar rather than overlap it.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

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
      {/* Quote CTA only. WhatsApp is the floating button, which sits above this
          bar — see `.whatsapp-float` in globals.css. The right padding keeps the
          bar's content clear of it. */}
      <div className="flex gap-2.5 py-3 pl-[var(--shell-x)] pr-[5.25rem]">
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
      </div>
    </div>
  );
}
