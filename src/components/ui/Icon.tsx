import type { IconName } from '@/data/content';

/**
 * @description One consistent line-icon family, drawn inline.
 *
 * The stroke weight and rounded joins deliberately echo the line-art tractor
 * inside the Romo's badge. Kept inline rather than pulling an icon package:
 * nineteen 24px glyphs do not justify a dependency, and inlining keeps them
 * inside the CSS cascade (they inherit `currentColor`).
 * @param name Glyph to render.
 * @param className Additional classes; size is controlled by the caller.
 */
export function Icon({ name, className = 'h-6 w-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  // Tractor unit with box trailer — the logo's own subject.
  truck: (
    <>
      <path d="M2 16.5V8.5a1 1 0 0 1 1-1h9.5v9" />
      <path d="M12.5 10.5H16l2.8 3v3" />
      <path d="M2 16.5h1.2M9.2 16.5h3.1M16.2 16.5h1.1M21 16.5h1" />
      <circle cx="6" cy="17.6" r="1.9" />
      <circle cx="19.2" cy="17.6" r="1.9" />
      <path d="M4.6 7.5V6h2.2v1.5" />
    </>
  ),
  // Open deck with side stakes.
  flatbed: (
    <>
      <path d="M2 15h20" />
      <path d="M4.5 15V9.8M9 15V9.8M13.5 15V9.8M18 15V9.8" />
      <path d="M2.8 15v2.2h18.4V15" />
      <circle cx="6.4" cy="18.6" r="1.6" />
      <circle cx="10.4" cy="18.6" r="1.6" />
      <circle cx="17.6" cy="18.6" r="1.6" />
    </>
  ),
  // Enclosed trailer, rear doors.
  dryvan: (
    <>
      <rect x="2.5" y="6.5" width="19" height="9.5" rx="1" />
      <path d="M12 6.5V16" />
      <path d="M9.4 11.2h1.4M13.2 11.2h1.4" />
      <circle cx="7" cy="18.6" r="1.6" />
      <circle cx="17" cy="18.6" r="1.6" />
    </>
  ),
  // Route between two points.
  route: (
    <>
      <circle cx="5.2" cy="5.6" r="2.4" />
      <circle cx="18.8" cy="18.4" r="2.4" />
      <path d="M5.2 8v4.2a3.4 3.4 0 0 0 3.4 3.4h6.8" strokeDasharray="0.1 3.2" />
      <path d="M16.4 18.4h-1.2" />
    </>
  ),
  map: (
    <>
      <path d="M3 6.4 8.7 4.5l6.6 2.1L21 4.7v12.9l-5.7 1.9-6.6-2.1L3 19.3z" />
      <path d="M8.7 4.5v13.1M15.3 6.6v13" />
    </>
  ),
  // Hard hat: PPE, distinct from the `shield` used for cargo insurance.
  helmet: (
    <>
      <path d="M4.9 15.2v-2.1a7.1 7.1 0 0 1 14.2 0v2.1" />
      <path d="M9.4 6.1V4.4a1 1 0 0 1 1-1h3.2a1 1 0 0 1 1 1v1.7" />
      <path d="M2.9 15.2h18.2a.9.9 0 0 1 .9.9v1a.9.9 0 0 1-.9.9H2.9a.9.9 0 0 1-.9-.9v-1a.9.9 0 0 1 .9-.9z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 4.8 5.8v5.5c0 4.2 2.9 7.5 7.2 9.5 4.3-2 7.2-5.3 7.2-9.5V5.8z" />
      <path d="M9.1 11.9 11.4 14l3.8-4" />
    </>
  ),
  headset: (
    <>
      <path d="M4.3 14.5v-2.4a7.7 7.7 0 0 1 15.4 0v2.4" />
      <path d="M4.3 13.2h1.4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4.3a1.4 1.4 0 0 1-1.4-1.4v-2.2a1.4 1.4 0 0 1 1.4-1.4" />
      <path d="M19.7 13.2h-1.4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1.4a1.4 1.4 0 0 0 1.4-1.4v-2.2a1.4 1.4 0 0 0-1.4-1.4" />
      <path d="M17.3 18.2v.6a2.2 2.2 0 0 1-2.2 2.2H12.7" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4.6H7.4a1.4 1.4 0 0 0-1.4 1.4v13.2a1.4 1.4 0 0 0 1.4 1.4h9.2a1.4 1.4 0 0 0 1.4-1.4V6a1.4 1.4 0 0 0-1.4-1.4H15" />
      <rect x="9" y="3" width="6" height="3.2" rx="0.9" />
      <path d="M8.9 11h6.2M8.9 14.4h6.2M8.9 17.4h3.6" />
    </>
  ),
  // Tie-down strap over a load.
  straps: (
    <>
      <path d="M3 13.6h18" />
      <path d="M6.6 13.6V8.4h10.8v5.2" />
      <path d="M9.4 8.4v5.2M14.6 8.4v5.2" />
      <path d="M4.6 16.2h14.8" />
      <path d="M8 16.2v2.4M16 16.2v2.4" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.6 6.3a3.9 3.9 0 0 1 5.3 5.1l-8.4 8.4a2.1 2.1 0 0 1-3-3l8.4-8.4a3.9 3.9 0 0 1-2.3-2.1z" />
      <path d="M6.9 16.9 4 14" />
    </>
  ),
  radio: (
    <>
      <circle cx="12" cy="12" r="2.1" />
      <path d="M8.1 8.1a5.5 5.5 0 0 0 0 7.8M15.9 15.9a5.5 5.5 0 0 0 0-7.8" />
      <path d="M5.4 5.4a9.3 9.3 0 0 0 0 13.2M18.6 18.6a9.3 9.3 0 0 0 0-13.2" />
    </>
  ),
  box: (
    <>
      <path d="M3.6 8.2 12 4.3l8.4 3.9v7.6L12 19.7l-8.4-3.9z" />
      <path d="M3.6 8.2 12 12l8.4-3.8M12 12v7.7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4V12l3.2 2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M8.4 12.2 11 14.8l4.7-5.2" />
    </>
  ),
  quote: (
    <>
      <path d="M14.6 3.4H6.8a1.4 1.4 0 0 0-1.4 1.4v14.4a1.4 1.4 0 0 0 1.4 1.4h10.4a1.4 1.4 0 0 0 1.4-1.4V7.6z" />
      <path d="M14.6 3.4v4.2h4" />
      <path d="M8.6 12.4h6.8M8.6 15.8h4.4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.3 11.6a8.3 8.3 0 0 1-12.2 7.3L3.7 20.3l1.4-4.4A8.3 8.3 0 1 1 20.3 11.6z" />
      <path d="M9.1 8.6c-.3.6-.3 1.6.4 2.6a8 8 0 0 0 3.3 3.3c1 .7 2 .7 2.6.4l.5-1.1-2-.9-.7.7a6 6 0 0 1-2.3-2.3l.7-.7-.9-2z" />
    </>
  ),
  phone: (
    <path d="M6.3 3.6h2.6l1.5 3.8-1.9 1.4a10.6 10.6 0 0 0 5.3 5.3l1.4-1.9 3.8 1.5v2.6a2 2 0 0 1-2.2 2A15.3 15.3 0 0 1 4.3 5.8a2 2 0 0 1 2-2.2z" />
  ),
  mail: (
    <>
      <rect x="2.9" y="5.4" width="18.2" height="13.2" rx="1.6" />
      <path d="M3.4 6.6 12 13l8.6-6.4" />
    </>
  ),
  arrow: <path d="M4.5 12h14.2M13.4 6.8 18.7 12l-5.3 5.2" />,
};
