// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// Dominio de producción: fuente única para canonical, Open Graph, sitemap, robots y JSON-LD.
// PENDIENTE: confirmar el dominio definitivo con la clienta (docs/seo.md).
const SITE_URL = process.env.SITE_URL ?? 'https://anter-house.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react()],
  vite: {
    // Three se importa de forma diferida; pre-optimizarlo evita el "504 Outdated Optimize Dep" en dev.
    optimizeDeps: {
      include: ['three', 'three/examples/jsm/environments/RoomEnvironment.js'],
    },
  },
});
