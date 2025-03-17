import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), alpinejs()],
});