'use client';

import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * @description Previous/next controls for the mobile gallery scroller.
 *
 * Deliberately decoupled from the gallery markup: it locates the scroller by id
 * rather than wrapping it, so the nine photographs and their `<picture>`
 * elements stay server-rendered instead of being serialised into this client
 * boundary's RSC payload.
 *
 * The buttons only exist for pointer/keyboard convenience — the scroller is a
 * native overflow container, so swiping and arrow-key scrolling work with or
 * without this component. They are hidden from assistive technology when the
 * grid layout takes over at `md`, where there is nothing to scroll.
 *
 * @param targetId Id of the scroll container to drive.
 */
export function GalleryControls({ targetId }: { targetId: string }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = document.getElementById(targetId);
    if (!node) return;
    setAtStart(node.scrollLeft <= 4);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 4);
  }, [targetId]);

  useEffect(() => {
    const node = document.getElementById(targetId);
    if (!node) return;

    // Deferred rather than called inline: setState in an effect body triggers a
    // cascading render. The initial `atStart`/`atEnd` defaults are already
    // correct for a fresh scroller, so this only matters when the browser
    // restores a previous scroll position on reload.
    const frame = requestAnimationFrame(sync);

    node.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, targetId]);

  const nudge = (direction: 1 | -1) => {
    const node = document.getElementById(targetId);
    if (!node) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollBy({
      left: direction * Math.round(node.clientWidth * 0.82),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="flex gap-2 md:hidden">
      <button
        id="galeria-anterior"
        type="button"
        onClick={() => nudge(-1)}
        disabled={atStart}
        aria-controls={targetId}
        className="btn btn-ghost min-h-[2.75rem] w-[2.75rem] !px-0"
      >
        <span className="sr-only">Ver fotografías anteriores</span>
        <Icon name="arrow" className="h-5 w-5 rotate-180" />
      </button>
      <button
        id="galeria-siguiente"
        type="button"
        onClick={() => nudge(1)}
        disabled={atEnd}
        aria-controls={targetId}
        className="btn btn-ghost min-h-[2.75rem] w-[2.75rem] !px-0"
      >
        <span className="sr-only">Ver más fotografías</span>
        <Icon name="arrow" className="h-5 w-5" />
      </button>
    </div>
  );
}
