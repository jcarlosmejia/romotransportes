'use client';

import { useEffect } from 'react';

/**
 * @description Emits a `romo:cta` DOM event whenever a `[data-cta]` control is
 * activated.
 *
 * No analytics provider is configured yet (nothing third-party is loaded, by
 * design). This gives the structure to connect one later without touching every
 * button: attach a listener for `romo:cta` and forward
 * `detail.cta` / `detail.place` to whatever tool is chosen.
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

      document.dispatchEvent(
        new CustomEvent('romo:cta', {
          detail: {
            cta: trigger.dataset.cta ?? 'desconocido',
            place: trigger.dataset.ctaPlace ?? 'desconocido',
          },
        }),
      );
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
