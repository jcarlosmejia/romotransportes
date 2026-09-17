'use client';

import { useEffect } from 'react';

/**
 * @description Reveals every `[data-reveal]` block as it scrolls into view.
 *
 * One observer for the whole page, mounted once. This is what lets `Reveal`
 * stay a server component — see the note in `Reveal.tsx` for why that matters
 * (it kept ~120 KB of RSC payload out of the built HTML).
 *
 * Fails safe: if `IntersectionObserver` is missing, every block is revealed
 * immediately rather than left hidden.
 */
export function RevealObserver() {
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (blocks.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      for (const block of blocks) block.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the block is fully on screen, so the motion reads
      // as content settling into place rather than popping in late.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    for (const block of blocks) observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return null;
}
