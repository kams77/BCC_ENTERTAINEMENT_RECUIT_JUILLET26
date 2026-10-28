import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Donne à chaque build un identifiant unique dans le service worker : un nouveau
// déploiement remplace l'ancien cache hors ligne.
function serviceWorkerBuildId(): Plugin {
  let outDir = 'dist';
  return {
    name: 'service-worker-build-id',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const file = path.join(outDir, 'sw.js');
      if (fs.existsSync(file)) {
        const source = fs.readFileSync(file, 'utf8');
        // Cible la constante (avec ses guillemets), pas la mention dans le commentaire
        fs.writeFileSync(file, source.replace("'__BUILD_ID__'", `'${Date.now().toString(36)}'`));
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), serviceWorkerBuildId()],
    build: {
      // Liste de tous les fichiers générés, lue par le service worker pour le précache
      manifest: 'build-manifest.json',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
