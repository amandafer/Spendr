import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

withDevtools();
AppRegistry.registerComponent(appName, () => App);

function withDevtools() {
  withReactotron();
  withHttpMocking();
}

function withReactotron() {
  if (!__DEV__) {
    return;
  }

  require("./ReactotronConfig");
  console.log("Reactotron Configured");
}

async function withHttpMocking() {
  if (!__DEV__) {
    return;
  }

  /**
   * Using require instead of import to avoid known issue with MSW
   * https://github.com/mswjs/mswjs.io/issues/389
   */
  await require("./msw.polyfills");
  const { server } = await require("./src/mocks/server");
  server.listen();
  console.log("MSW Configured");
}