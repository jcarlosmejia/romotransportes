import type { ReactNode } from 'react';

/**
 * @description Standard section header: tracked overline, display heading and
 * an optional lede. Keeps the heading rhythm identical across every band.
 * @param overline Small tracked label above the heading.
 * @param title The section heading text.
 * @param lede Optional supporting paragraph.
 * @param align Horizontal alignment. `center` is used sparingly.
 * @param level Heading level, so the document outline stays correct.
 * @param id Optional id for the heading element (used by aria-labelledby).
 */
export function SectionHeading({
  overline,
  title,
  lede,
  align = 'left',
  level = 2,
  id,
}: {
  overline: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  level?: 2 | 3;
  id?: string;
}) {
  const Tag = level === 2 ? 'h2' : 'h3';
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="overline">{overline}</p>
      <Tag
        id={id}
        className={`${level === 2 ? 'display-2' : 'display-3'} mt-3 uppercase`}
      >
        {title}
      </Tag>
      <div
        className={`mt-5 h-[3px] w-14 bg-romo-red ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
      {lede ? <p className={`lede mt-6 ${centered ? 'mx-auto' : ''}`}>{lede}</p> : null}
    </div>
  );
}
