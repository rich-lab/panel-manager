import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import mdPlugin, { Mode } from 'vite-plugin-markdown';
import markdownItPrism from 'markdown-it-prism';
import MarkdownIt from 'markdown-it';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    mdPlugin({
      mode: [Mode.HTML],
      markdownIt: MarkdownIt({ html: true }).use(markdownItPrism)
    })
  ],
});
