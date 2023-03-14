import { legacyPlugin } from '@web/dev-server-legacy';

export default {
  /* ... */
  testRunnerHtml: testFramework => `<html><head><style>:root {
    --light-blue-custom: #acdde7;
    --light-green-custom: #9ad5ca;
    --light-purple-custom: #adb9e3;
    --hover-purple-custom: #ba99d6;
    --dark-purple-custom: #a379c9;
    --pink-custom: rgb(183, 68, 184);
}
body {
  min-width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--light-blue-custom);
  margin: 0;
  font-family: 'Poppins', sans-serif;
  /* max-height: 100vh; */
  /* overflow-y: hidden; */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
leader-dashboard {
  width: 50%;
  justify-content: center;
}
</style></head><body><script type="module" src="${testFramework}"></script></body></html>`,
  plugins: [
    // make sure this plugin is always last
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        // Inject lit's polyfill-support module into test files, which is required
        // for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),
  ],
};