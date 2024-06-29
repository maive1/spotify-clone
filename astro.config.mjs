import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react()],
  output: 'server',
  vite: {
    ssr: {
      noExternal: ['path', 'fs', 'music-metadata'], // Asegúrate de que estos módulos no se resuelvan externamente en el servidor
    },
    resolve: {
      alias: {
        fs: false,
        path: false,
      },
    },
  },
});
