import type { ElementType, ReactNode } from 'react';

/**
 * @description Marks a block to fade in when it scrolls into view.
 *
 * This is a **server** component on purpose. An earlier version was a client
 * component holding its own `IntersectionObserver`, which turned every section
 * of the page into a client boundary: React had to serialise all of that server
 * content into the inlined RSC payload, and the built `index.html` grew to
 * 259 KB. Emitting a plain `data-reveal` attribute here and letting a single
 * observer (`RevealObserver`, mounted once in the layout) watch for it keeps the
 * whole page server-rendered.
 *
 * The transition itself lives in `globals.css` and is gated twice: on
 * `prefers-reduced-motion: no-preference`, and on the `data-motion` attribute
 * that only appears when scripting is available. Content is therefore never
 * hidden behind an animation that cannot run.
 *
 * @param as Element to render. Defaults to `div`.
 * @param stagger When true, children fade in sequentially rather than as a block.
 * @param className Extra classes for the wrapper.
 * @param children Content to reveal.
 * @param rest Remaining props are spread onto the rendered element.
 */
export function Reveal({
  as: Tag = 'div',
  stagger = false,
  className = '',
  children,
  ...rest
}: {
  as?: ElementType;
  stagger?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const classes = [stagger ? 'reveal-stagger' : 'reveal', className].filter(Boolean).join(' ');

  return (
    <Tag data-reveal="" className={classes} {...rest}>
      {children}
    </Tag>
  );
}
