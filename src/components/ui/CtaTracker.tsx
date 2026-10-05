'use client';

import { useEffect } from 'react';

/**
 * @description Emits a `romo:cta` DOM event whenever a `[data-cta]` control is
 * activated.
 *
 * Each click is also sent to Cloudflare Zaraz as `cta_click` when Zaraz is
 * enabled for the zone (see docs/medicion-y-buscadores.md). Nothing is loaded
 * by this code itself.
 *
 * A single delegated listener on `document` keeps each CTA a plain server-
 * rendered anchor — no per-button client JavaScript.
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>('[data-cta]');
      if (!trigger) return;

      const detail = {
        cta: trigger.dataset.cta ?? 'desconocido',
        place: trigger.dataset.ctaPlace ?? 'desconocido',
      };
      document.dispatchEvent(new CustomEvent('romo:cta', { detail }));
      // Cloudflare Zaraz, when enabled for the zone, injects `window.zaraz`;
      // otherwise this is a no-op. Zaraz forwards `cta_click` to whatever
      // tool is configured there (GA4, etc.) without code changes.
      (window as Window & { zaraz?: { track: (name: string, props: object) => void } }).zaraz?.track(
        'cta_click',
        detail,
      );
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
