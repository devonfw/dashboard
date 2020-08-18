import { devDependencies } from '../package.json';

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            electron: devDependencies.electron.replace(/^\^|~/, ''),
          },
        },
      },
    ],
  ],

  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ],
};
