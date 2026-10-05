# Buscadores, perfil de Google y medición

Guía para los tres pasos que dependen de cuentas del propietario. El sitio ya
está preparado: sitemap, robots, canonical, datos estructurados y redirecciones
`http`/`www` → `https://romostransportes.com.mx` (verificadas el 2026-10-04).

## Datos de negocio (usar exactamente igual en todas partes)

| Campo | Valor |
| :-- | :-- |
| Nombre | Romo's Transportes |
| Categoría principal | Empresa de transporte por camión (*Trucking company*) |
| Categorías secundarias | Servicio de transporte de carga · Empresa de transportes |
| Teléfono principal | +52 33 4399 5054 |
| Teléfono adicional | +52 33 2383 8729 |
| WhatsApp | +52 33 1013 1863 |
| Correo | contacto.romotransportes@gmail.com |
| Sitio web | https://romostransportes.com.mx |
| Base | Guadalajara, Jalisco (Zona Metropolitana de Guadalajara) |
| Inicio de operaciones | 2010 |

No uses categorías de mudanzas, paquetería ni agente de carga (*freight
forwarder*): no describen el servicio.

## 1. Perfil de Negocio de Google

1. Entra a https://business.google.com con la cuenta de Google del negocio
   (sugerido: contacto.romotransportes@gmail.com).
2. **Agregar empresa** → nombre `Romo's Transportes` → categoría
   *Empresa de transporte por camión*.
3. **¿Quieres agregar una ubicación que los clientes puedan visitar?**
   - Si no reciben clientes en un domicilio, responde **No**. Así funciona como
     negocio de área de servicio y el domicilio no se publica (Google sí lo pide
     en privado para verificar).
4. **Áreas de servicio:** Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco,
   Jalisco, Sinaloa, Sonora, Baja California, Chihuahua, Coahuila, Nuevo León
   (máximo 20).
5. Teléfono principal y sitio web de la tabla.
6. **Verificación:** normalmente por video (mostrar unidades con el logotipo,
   herramientas de trabajo y algo que pruebe la ubicación). Tarda de días a
   semanas.
7. Ya verificado, completa:
   - **Descripción** (máx. 750 caracteres):
     > Romo's Transportes es una empresa transportista con base en Guadalajara,
     > Jalisco. Desde 2010 movemos carga comercial e industrial con unidades
     > propias: cajas secas de 48 y 53 pies y plataformas tipo plana de 40 pies
     > en adelante. Atendemos fletes spot y recurrentes, con rutas frecuentes
     > hacia el Pacífico (Tepic, Mazatlán, Culiacán, Sonora, Baja California)
     > y el Norte (Torreón, Chihuahua, Ciudad Juárez, Saltillo, Monterrey), y
     > cobertura nacional bajo cotización. Cotiza por WhatsApp, teléfono o
     > correo.
   - **Servicios:** Fletes en caja seca 48 y 53 pies · Transporte en
     plataforma · Carga pesada e industrial · Carga completa (FTL) · Servicio
     recurrente · Servicio spot.
   - **Fotos:** las mismas del sitio (unidades reales con logotipo). Logo:
     `public/brand/logo-romos-transportes-512.png`.
   - **Atributo de WhatsApp / mensajes:** agrega el número de WhatsApp.
   - **Horario:** sólo si ya está definido; no inventarlo.
8. Cuando el perfil esté publicado, comparte su URL: se agrega a `sameAs` en los
   datos estructurados del sitio.

## 2. Google Search Console y Bing

**Google Search Console**
1. https://search.google.com/search-console → **Agregar propiedad** →
   **Dominio** → `romostransportes.com.mx`.
2. Google muestra un registro **TXT**. En Cloudflare: **DNS → Records → Add
   record** → Type `TXT`, Name `@`, Content = el valor que dio Google → Save.
   (No toques los registros MX ni `_dc-mx`.)
3. Regresa a Search Console → **Verificar** (puede tardar unos minutos).
4. **Sitemaps** → escribe `sitemap.xml` → **Enviar**. Deben aparecer 4 URLs.
5. **Inspección de URLs** → pega `https://romostransportes.com.mx/` →
   **Solicitar indexación**. Repite con `/caja-seca-48-53-pies/` y
   `/plataforma-carga-pesada/`.

**Bing Webmaster Tools**
1. https://www.bing.com/webmasters → inicia sesión.
2. **Importar desde Google Search Console** → autoriza → selecciona el sitio.
   Esto importa la verificación y el sitemap; no hace falta otro registro DNS.

## 3. Medición (Cloudflare)

**Visitas (sin cookies, gratis)**
1. Cloudflare → **Analytics & Logs → Web Analytics** → **Add a site** →
   `romostransportes.com.mx`.
2. Elige **Automatic setup** (el sitio ya pasa por Cloudflare, no requiere
   código). Los datos aparecen en unos minutos.

**Clics en WhatsApp, correo y teléfono (conversiones)**

El sitio ya envía cada clic a Cloudflare Zaraz como evento `cta_click` con dos
datos: `cta` (whatsapp, correo, telefono, cotizar, …) y `place` (hero,
equipo-caja-seca, cta-final, formulario, …). Sólo falta activarlo:

1. Cloudflare → zona `romostransportes.com.mx` → **Zaraz** → **Start setup**.
2. **Tools Configuration → Add new tool** → **Google Analytics 4** → pega el
   *Measurement ID* (`G-…`) de una propiedad GA4 creada en
   https://analytics.google.com.
3. En la herramienta: **Add action** → Firing trigger: crea un trigger
   *Event Name* = `cta_click` → acción **Event** con nombre `cta_click`, y
   agrega los parámetros `cta` = `{{ client.cta }}` y `place` =
   `{{ client.place }}`.
4. En **Zaraz → Settings** activa **Cookie-less / privacy** si se quiere evitar
   cookies de GA4 (el aviso de privacidad dice "sin cookies"; si usas GA4 con
   cookies, actualiza ese texto).
5. En GA4 marca `cta_click` como **evento clave** (conversión).

Con eso puedes ver qué botón y qué sección generan más solicitudes.
