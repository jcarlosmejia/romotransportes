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
 *   hero (dark) → trust (charcoal) → servicios (light) → flota (dark)
 *   → corte fotográfico → seguridad (charcoal) → cobertura (light)
 *   → industrias (charcoal) → proceso (light) → galería (dark)
 *   → nosotros (light) → CTA de cotización (fotográfico) → preguntas (light)
 *   → contacto (dark) → footer
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
        <Services />
        <Fleet />

        <ImageBreak
          slug="romo-purple-flatbed-steel-pipes-warehouse"
          eyebrow="Operación real"
          title="Cargamos, sujetamos y movemos"
          caption="Maniobra de carga de tubería de acero sobre plataforma, en nave industrial."
        />

        <Safety />
        <Coverage />
        <Industries />
        <Process />
        <Gallery />
        <About />
        <QuoteCta />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <StickyCta />
      <WhatsAppFloat />
    </>
  );
}
