import { defineManifest } from '@crxjs/vite-plugin';
import { version } from '../package.json';

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${
    env.mode === 'development' ? '[Dev] ' : ''
  }カレンダーに自動で予定を追加して危機感煽ってくるヤツ`,
  description: 'カレンダーに自動で予定を追加して危機感煽ってくるヤツ です。',
  version,
  background: {
    service_worker: 'entrypoints/background.ts',
  },
  content_scripts: [
    {
      matches: ['https://tact.ac.thers.ac.jp/*'],
      js: ['entrypoints/tact_content.tsx'],
    },
  ],
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'entrypoints/options.html',
    open_in_tab: true,
  },
  action: {
    default_popup: 'entrypoints/popup.html',
    default_icon: {
      '16': 'images/extension_16.png',
      '32': 'images/extension_32.png',
      '48': 'images/extension_48.png',
      '128': 'images/extension_128.png',
    },
  },
  icons: {
    '16': 'images/extension_16.png',
    '32': 'images/extension_32.png',
    '48': 'images/extension_48.png',
    '128': 'images/extension_128.png',
  },
  permissions: ['storage', 'tabs'],
}));

export default manifest;
