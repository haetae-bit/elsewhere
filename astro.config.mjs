import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs()],
  redirects: {
    "/archive/all": "/archive/all/1",
  },
});