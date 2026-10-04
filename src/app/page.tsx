import { Header } from '@/components/navigation/Header';
import { Hero, HeroPreload } from '@/components/hero/Hero';
import { TrustStrip } from '@/components/trust/TrustStrip';
import { Services } from '@/components/services/Services';
import { Fleet } from '@/components/fleet/Fleet';
import { ImageBreak } from '@/components/layout/ImageBreak';
import { Safety } from '@/components/safety/Safety';
import { Coverage } from '@/components/coverage/Coverage';
import { Industries } from '@/components/industries/Industries';
import { Process } from '@/components/process/Process';
import { Gallery } from '@/components/gallery/Gallery';
import { About } from '@/components/about/About';
import { QuoteCta } from '@/components/contact/QuoteCta';
import { Faq } from '@/components/faq/Faq';
import { Contact } from '@/components/contact/Contact';
import { Footer } from '@/components/footer/Footer';
import { StickyCta } from '@/components/layout/StickyCta';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { StructuredData } from '@/components/layout/StructuredData';

/**
 * @description Romo's Transportes landing page.
 *
 * SECTION RHYTHM
 * --------------
 * Bands deliberately alternate between the dark brand surface and the warm
 * cream "light band" so the page never reads as one uninterrupted black scroll,
 * and two photographic breaks split the longer text runs:
 *
 *   hero (dark) → confianza → equipo: caja seca vs plataforma (dark)
 *   → servicios spot/recurrente (light) → industrias (charcoal)
 *   → cobertura y mapa (light) → corte fotográfico → galería (dark)
 *   → nosotros / por qué Romo's (light) → seguridad (charcoal)
 *   → cómo cotizar (light) → contacto + formulario (dark) → preguntas (light)
 *   → CTA final (fotográfico) → footer
 *
 * Follows the owner brief (2026-10-04) — equipment right after the hero,
 * because "do they have my trailer?" is the buyer's first question — with two
 * neighbours swapped so light and dark bands keep alternating.
 */
export default function HomePage() {
  return (
    <>
      <HeroPreload />
      <StructuredData />

      <Header />

      <main id="contenido">
        <Hero />
        <TrustStrip />
        <Fleet />
        <Services />
        <Industries />
        <Coverage />

        <ImageBreak
          slug="romo-purple-flatbed-steel-pipes-warehouse"
          eyebrow="Operación real"
          title="Cargamos, sujetamos y movemos"
          caption="Maniobra de carga de tubería de acero sobre plataforma, en nave industrial."
        />

        <Gallery />
        <About />
        <Safety />
        <Process />
        <Contact />
        <Faq />
        <QuoteCta />
      </main>

      <Footer />
      <StickyCta />
      <WhatsAppFloat />
    </>
  );
}
