import { about, differentiators } from '@/data/content';
import { Icon } from '@/components/ui/Icon';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Logo } from '@/components/ui/Logo';

/**
 * @description About + differentiators, on a light band.
 *
 * The narrative is a rewrite of the owner's original mission statement — same
 * intent, professional Spanish, nothing added. No founding year, tenure or
 * headcount appears anywhere, because none of those were confirmed.
 */
export function About() {
  return (
    <section id="nosotros" className="band-light section" aria-labelledby="nosotros-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading id="nosotros-title" overline={about.overline} title={about.title} />

            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-romo-muted-dark">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-5 border-t border-romo-border-light pt-7">
              <span className="bg-romo-black p-3">
                <Logo size="sm" withWordmark={false} plated={false} />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-romo-muted-dark">
                Transporte terrestre de carga
                <br />
                <span className="text-romo-red">Rutas nacionales</span>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="cut-frame overflow-hidden border border-romo-border-light bg-white p-1.5">
              <div className="cut-frame overflow-hidden">
                <ResponsiveImage
                  slug="romo-fleet-night-branding"
                  sizes="(max-width: 1023px) calc(100vw - 2.5rem), 540px"
                  className="w-full"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-romo-muted-dark">
              Unidades propias con el emblema de Romo&rsquo;s Transportes.
            </p>
          </Reveal>
        </div>

        <Reveal as="ul" stagger className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <li key={item.title}>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center border border-romo-border-light bg-white text-romo-red"
              >
                <Icon name={item.icon} className="h-[1.375rem] w-[1.375rem]" />
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-bold uppercase leading-tight tracking-tight text-romo-charcoal">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-romo-muted-dark">
                {item.description}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
