/**
 * @description Primary navigation. Single source for the header, the mobile
 * drawer and the footer so the three can never drift apart.
 */

export type NavItem = { href: string; label: string };

export const navItems: readonly NavItem[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#flota', label: 'Flota' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#seguridad', label: 'Seguridad' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

/** Anchor for every "solicitar cotización" call to action. */
export const QUOTE_ANCHOR = '#cotizar';
