/**
 * @description The Romo's Transportes lockup.
 *
 * The badge is the supplied logo, cropped to its own outline and never
 * stretched, rotated or recoloured (its natural aspect ratio is ~1.21:1, see
 * `scripts/build-images.mjs`). Because the supplied artwork is a photograph of
 * the badge, the wordmark inside it stops being legible below roughly 64px, so
 * at header and footer sizes the badge is paired with the company name set in
 * the brand typefaces. That is a horizontal lockup of the real mark plus real
 * type — no monogram is invented and the badge itself is never redrawn.
 *
 * PRESENTATION NOTE
 * -----------------
 * The supplied file is a photograph, so it carries its own near-black
 * background plus a vignette. Against the site's flat `--romo-black` that edge
 * is faintly visible, and left bare it reads as a pasted-on thumbnail. Rather
 * than retouch the artwork, the badge is seated on a deliberate brand plate —
 * flat brand black, a hairline border and a clipped corner echoing the badge's
 * own stepped outline — so the rectangle becomes a design decision instead of
 * an artifact. Supplying a vector or transparent-PNG original would let this
 * plate be dropped; that request is recorded in docs/content-verification.md.
 *
 * @param size Badge height preset.
 * @param withWordmark Render the typographic name beside the badge.
 * @param priority Eager-load the badge (used in the header, which is above the fold).
 * @param plated Seat the badge on the brand plate. Disable only where the badge
 *   already sits on its own dark panel.
 * @param className Extra classes for the wrapper.
 */
export function Logo({
  size = 'md',
  withWordmark = true,
  priority = false,
  plated = true,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  withWordmark?: boolean;
  priority?: boolean;
  plated?: boolean;
  className?: string;
}) {
  const badge = {
    sm: { h: 34, w: 41, src: 128 },
    md: { h: 44, w: 53, src: 128 },
    lg: { h: 96, w: 116, src: 256 },
  }[size];

  const wordmarkSize = {
    sm: 'text-[0.9375rem]',
    md: 'text-[1.0625rem]',
    lg: 'text-[1.5rem]',
  }[size];

  const subSize = {
    sm: 'text-[0.5rem]',
    md: 'text-[0.5625rem]',
    lg: 'text-[0.75rem]',
  }[size];

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={
          plated
            ? 'cut-corner shrink-0 border border-romo-border/70 bg-romo-black p-[3px]'
            : 'shrink-0'
        }
        style={plated ? { ['--cut' as string]: '0.4rem' } : undefined}
      >
        <picture>
          <source type="image/avif" srcSet={`/brand/logo-romos-transportes-${badge.src}.avif`} />
          <source type="image/webp" srcSet={`/brand/logo-romos-transportes-${badge.src}.webp`} />
          <img
            src={`/brand/logo-romos-transportes-${badge.src}.png`}
            width={badge.w}
            height={badge.h}
            style={{ width: badge.w, height: badge.h }}
            alt="Romo's Transportes"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="shrink-0"
          />
        </picture>
      </span>

      {withWordmark ? (
        <span className="hidden leading-none sm:block">
          <span
            className={`block font-[family-name:var(--font-display)] uppercase tracking-tight text-romo-cream-light ${wordmarkSize}`}
          >
            Romo&rsquo;s
          </span>
          <span
            className={`mt-[0.1875rem] block font-semibold uppercase tracking-[0.3em] text-romo-muted ${subSize}`}
          >
            Transportes
          </span>
        </span>
      ) : null}
    </span>
  );
}
