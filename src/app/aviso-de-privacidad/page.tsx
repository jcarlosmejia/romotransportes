import type { Metadata } from 'next';
import Link from 'next/link';
import { company, contact } from '@/data/company';
import { Footer } from '@/components/footer/Footer';
import { Logo } from '@/components/ui/Logo';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description:
    "Cómo trata Romo's Transportes los datos que se capturan en el formulario de cotización de este sitio.",
  robots: { index: true, follow: true },
};

/**
 * @description Privacy notice.
 *
 * Scope note: this page documents only what is **verifiable from the site's own
 * code** — that the quote form runs entirely in the browser, that the site
 * stores nothing, sets no cookies and loads no third-party analytics or
 * tracking scripts. All of that is true of the build as shipped.
 *
 * It is deliberately NOT presented as a complete aviso de privacidad under the
 * LFPDPPP, because a compliant notice requires the responsable's legal name,
 * domicile, a privacy contact and the retention policy — none of which have
 * been confirmed. That gap is recorded in docs/content-verification.md and is
 * flagged as owner work, not something to invent here.
 */
export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-romo-border bg-romo-black">
        <div className="shell flex h-[4.5rem] items-center">
          <Link href="/" aria-label="Romo's Transportes — ir al inicio">
            <Logo size="md" priority />
          </Link>
        </div>
      </header>

      <main id="contenido" className="section">
        <div className="shell max-w-3xl">
          <p className="overline">Legal</p>
          <h1 className="display-2 mt-4 uppercase">Aviso de privacidad</h1>
          <div aria-hidden="true" className="mt-6 h-[3px] w-20 bg-romo-red" />

          <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-romo-muted">
            <section>
              <h2 className="text-lg font-bold uppercase tracking-tight text-romo-cream-light">
                Qué datos se capturan en este sitio
              </h2>
              <p className="mt-3">
                El formulario de cotización de este sitio solicita los datos necesarios para poder
                responder una solicitud de transporte: nombre, empresa, teléfono, correo electrónico,
                origen, destino, tipo de mercancía, peso aproximado, fecha estimada, tipo de unidad y
                los comentarios que usted decida agregar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase tracking-tight text-romo-cream-light">
                Cómo se procesan
              </h2>
              <p className="mt-3">
                Este sitio es un sitio estático. El formulario funciona por completo en su navegador:
                con los datos que usted escribe se arma un mensaje de texto y ese mensaje se entrega
                por el canal que usted elija al enviarlo. El sitio no guarda la información en ningún
                servidor propio, no la envía a terceros y no conserva copia de lo que usted escribe.
              </p>
              <p className="mt-3">
                A partir del momento en que usted envía el mensaje por su aplicación de mensajería o
                por correo, la información queda sujeta también a las condiciones de ese servicio de
                mensajería y a las prácticas de tratamiento de datos de {company.legalName}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase tracking-tight text-romo-cream-light">
                Cookies y herramientas de medición
              </h2>
              <p className="mt-3">
                Este sitio no instala cookies de seguimiento, no carga scripts de analítica ni de
                publicidad, y no incorpora recursos de terceros. Las tipografías se sirven desde el
                propio dominio del sitio, por lo que su visita no genera solicitudes a servidores
                externos.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase tracking-tight text-romo-cream-light">
                Finalidad del tratamiento
              </h2>
              <p className="mt-3">
                Los datos que usted proporcione se utilizan para atender su solicitud de cotización,
                definir el equipo adecuado para su carga y darle seguimiento comercial al servicio
                solicitado.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase tracking-tight text-romo-cream-light">
                Derechos ARCO y contacto
              </h2>
              <p className="mt-3">
                Usted puede solicitar el acceso, la rectificación, la cancelación o la oposición al
                tratamiento de sus datos personales.
                {contact.email
                  ? ' Para ejercer esos derechos escriba a '
                  : ' El canal designado para ejercer esos derechos se publicará en este aviso. '}
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="text-romo-cream underline">
                    {contact.email}
                  </a>
                ) : null}
                {contact.email ? '.' : null}
              </p>
            </section>

            {/* Honest statement of scope rather than a fabricated legal notice. */}
            <section className="border-l-2 border-romo-red bg-romo-charcoal p-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-romo-cream-light">
                Alcance de este aviso
              </h2>
              <p className="mt-3 text-sm">
                Este documento describe el tratamiento de datos que ocurre en este sitio web. Para
                constituir un aviso de privacidad integral conforme a la Ley Federal de Protección de
                Datos Personales en Posesión de los Particulares, debe complementarse con la
                denominación legal del responsable, su domicilio, el medio designado para ejercer
                derechos ARCO y el plazo de conservación de los datos. Esa información la debe
                proporcionar {company.legalName} antes de la publicación definitiva.
              </p>
            </section>
          </div>

          <p className="mt-12">
            <Link href="/" className="btn btn-secondary">
              Volver al inicio
            </Link>
          </p>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
