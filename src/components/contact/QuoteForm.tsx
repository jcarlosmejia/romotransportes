'use client';

import { useId, useRef, useState } from 'react';
import { contact } from '@/data/company';
import {
  buildQuoteMessage,
  emptyQuote,
  quoteMailtoLink,
  requiredFields,
  unidadOptions,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from '@/lib/quote';
import { Icon } from '@/components/ui/Icon';

type FieldKey = keyof QuoteFields;

const REQUIRED = new Set<string>(requiredFields);

type FieldSpec = {
  name: FieldKey;
  label: string;
  type?: 'text' | 'tel' | 'email' | 'date';
  placeholder?: string;
  autoComplete?: string;
  /** Column span on the two-column desktop grid. */
  wide?: boolean;
  hint?: string;
};

const FIELDS: readonly FieldSpec[] = [
  { name: 'nombre', label: 'Nombre', autoComplete: 'name', placeholder: 'Nombre y apellido' },
  { name: 'empresa', label: 'Empresa', autoComplete: 'organization', placeholder: 'Opcional' },
  { name: 'telefono', label: 'Teléfono', type: 'tel', autoComplete: 'tel', placeholder: '10 dígitos' },
  { name: 'email', label: 'Correo', type: 'email', autoComplete: 'email', placeholder: 'Opcional' },
  { name: 'origen', label: 'Origen', placeholder: 'Ciudad y estado' },
  { name: 'destino', label: 'Destino', placeholder: 'Ciudad y estado' },
  {
    name: 'mercancia',
    label: 'Tipo de mercancía',
    placeholder: 'Ej. estructura metálica, producto paletizado',
    wide: true,
  },
  { name: 'peso', label: 'Peso aproximado', placeholder: 'Ej. 18 toneladas' },
  { name: 'fecha', label: 'Fecha estimada', type: 'date' },
];

/**
 * @description Quote request form.
 *
 * DELIVERY MODEL (static site, no backend)
 * ----------------------------------------
 * This form delivers by **e-mail only**. On submit it validates the input,
 * formats a readable Spanish message and opens the visitor's mail client via
 * `mailto:` addressed to the confirmed mailbox.
 *
 * WhatsApp is deliberately NOT a submit option here. It has exactly one entry
 * point site-wide — the floating button (`layout/WhatsAppFloat.tsx`) — which
 * opens WhatsApp in a single click with no form to fill. Offering a second,
 * multi-step WhatsApp route from inside the form would undo that.
 *
 * If no mailbox were configured, the request is copied to the clipboard instead
 * so nothing the visitor typed is lost, and the form says so plainly. No fake
 * "message sent" confirmation is ever shown.
 *
 * Keeping delivery client-side is what lets the site stay a pure static export:
 * no backend, no form provider, no third-party script. Swapping in a Cloudflare
 * Pages Function later means changing only `onSubmit` — see README.
 *
 * ACCESSIBILITY
 * -------------
 * Native labels, `aria-required`, `aria-invalid` and `aria-describedby` per
 * field; on a failed submit an error summary with `role="alert"` receives focus
 * and links to each offending field. Validation runs on submit and then
 * re-validates a field on blur once it has been touched, so the user is not
 * interrupted mid-typing.
 */
export function QuoteForm() {
  const [fields, setFields] = useState<QuoteFields>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'email' | 'copied' | 'copy-failed'>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;
  const hintId = (name: string) => `${uid}-${name}-hint`;

  const update = (name: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    setStatus('idle');
    if (touched[name]) {
      setErrors(validateQuote({ ...fields, [name]: value }));
    }
  };

  const onBlur = (name: FieldKey) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateQuote(fields));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateQuote(fields);
    setErrors(found);
    setTouched(Object.fromEntries(FIELDS.map((f) => [f.name, true])));

    if (Object.keys(found).length > 0) {
      setStatus('idle');
      // Announce the summary, then let the user jump to the first problem.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    if (contact.email) {
      window.location.href = quoteMailtoLink(contact.email, fields);
      setStatus('email');
      return;
    }

    // No mailbox configured: preserve the visitor's work rather than lose it.
    try {
      await navigator.clipboard.writeText(buildQuoteMessage(fields));
      setStatus('copied');
    } catch {
      setStatus('copy-failed');
    }
  }

  const errorKeys = Object.keys(errors) as FieldKey[];
  const showSummary = errorKeys.length > 0 && Object.values(touched).some(Boolean);

  return (
    <form ref={formRef} id="formulario-cotizacion" onSubmit={onSubmit} noValidate>
      {/* Error summary. `tabIndex={-1}` so focus can be moved here on submit. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={showSummary ? 'alert' : undefined}
        aria-live="assertive"
        className={showSummary ? 'mb-6 border-l-2 border-[var(--error)] bg-romo-charcoal p-4' : 'sr-only'}
      >
        {showSummary ? (
          <>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--error)]">
              Revisa {errorKeys.length === 1 ? 'este dato' : `estos ${errorKeys.length} datos`}
            </p>
            <ul className="mt-2 space-y-1">
              {errorKeys.map((key) => (
                <li key={key} className="text-sm">
                  <a href={`#${fieldId(key)}`} className="underline decoration-dotted">
                    {errors[key]}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {FIELDS.map((spec) => {
          const isRequired = REQUIRED.has(spec.name);
          const error = errors[spec.name];
          const invalid = Boolean(error && touched[spec.name]);

          return (
            <div key={spec.name} className={spec.wide ? 'sm:col-span-2' : undefined}>
              <label htmlFor={fieldId(spec.name)} className="field-label">
                {spec.label}
                {isRequired ? (
                  <span aria-hidden="true" className="ml-1 text-romo-red">
                    *
                  </span>
                ) : null}
              </label>
              <input
                id={fieldId(spec.name)}
                name={spec.name}
                type={spec.type ?? 'text'}
                value={fields[spec.name]}
                onChange={(e) => update(spec.name, e.target.value)}
                onBlur={() => onBlur(spec.name)}
                placeholder={spec.placeholder}
                autoComplete={spec.autoComplete}
                inputMode={spec.type === 'tel' ? 'tel' : undefined}
                required={isRequired}
                aria-required={isRequired}
                aria-invalid={invalid || undefined}
                aria-describedby={
                  [invalid ? errorId(spec.name) : null, spec.hint ? hintId(spec.name) : null]
                    .filter(Boolean)
                    .join(' ') || undefined
                }
                className="field-input"
              />
              {spec.hint ? (
                <p id={hintId(spec.name)} className="mt-1 text-xs text-romo-muted">
                  {spec.hint}
                </p>
              ) : null}
              {invalid ? (
                <p id={errorId(spec.name)} className="field-error">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <div>
          <label htmlFor={fieldId('unidad')} className="field-label">
            Tipo de unidad
          </label>
          <select
            id={fieldId('unidad')}
            name="unidad"
            value={fields.unidad}
            onChange={(e) => update('unidad', e.target.value)}
            className="field-input"
          >
            {unidadOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId('mensaje')} className="field-label">
            Detalles adicionales
          </label>
          <textarea
            id={fieldId('mensaje')}
            name="mensaje"
            value={fields.mensaje}
            onChange={(e) => update('mensaje', e.target.value)}
            placeholder="Dimensiones, maniobra de carga, horarios, o cualquier dato que debamos considerar."
            className="field-input"
            rows={4}
          />
        </div>
      </div>

      <p className="mt-5 text-xs text-romo-muted">
        <span aria-hidden="true" className="text-romo-red">
          *
        </span>{' '}
        Datos necesarios para poder cotizar. El resto es opcional.
      </p>

      {/* One action. E-mail is this form's only destination — WhatsApp lives in
          the floating button, one click away, with no form to fill. */}
      <div className="mt-7">
        <button
          id="enviar-cotizacion"
          type="submit"
          data-cta={contact.email ? 'enviar-correo' : 'copiar-solicitud'}
          data-cta-place="formulario"
          className="btn btn-primary w-full"
        >
          <Icon name={contact.email ? 'mail' : 'quote'} className="h-[1.125rem] w-[1.125rem]" />
          {contact.email ? 'Enviar por correo' : 'Generar solicitud'}
        </button>
      </div>

      {/* Post-submit status. Never claims a message was delivered to an inbox
          that does not exist. */}
      <div aria-live="polite" className="mt-4">
        {status === 'email' ? (
          <p className="flex items-start gap-2.5 border-l-2 border-[var(--success)] bg-romo-charcoal p-3.5 text-sm">
            <Icon name="check" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-[var(--success)]" />
            <span>
              Abrimos tu programa de correo con la solicitud lista para enviar. Si no se abrió,
              escríbenos directamente a{' '}
              <a href={`mailto:${contact.email}`} className="text-romo-cream underline">
                {contact.email}
              </a>
              .
            </span>
          </p>
        ) : null}

        {status === 'copied' ? (
          <p className="flex items-start gap-2.5 border-l-2 border-romo-red bg-romo-charcoal p-3.5 text-sm">
            <Icon name="check" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-romo-red" />
            <span>
              Copiamos tu solicitud al portapapeles. El canal de contacto de Romo&rsquo;s Transportes
              aún no está publicado en este sitio; pégala en el mensaje que envíes a la empresa.
            </span>
          </p>
        ) : null}

        {status === 'copy-failed' ? (
          <div className="border-l-2 border-[var(--error)] bg-romo-charcoal p-3.5 text-sm">
            <p>No pudimos copiar automáticamente. Copia el texto de aquí abajo:</p>
            <textarea
              readOnly
              value={buildQuoteMessage(fields)}
              rows={12}
              aria-label="Solicitud de cotización generada"
              className="field-input mt-3 font-mono text-xs"
            />
          </div>
        ) : null}
      </div>
    </form>
  );
}
