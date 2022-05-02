/**
 * NOTE: recyclerlistview cause deploy error:
 *
 *  	> Build error occurred
 *	  /vercel/path0/node_modules/react-native/index.js:14
 *	  import typeof AccessibilityInfo from './Libraries/Components/AccessibilityInfo/AccessibilityInfo';
 *	  ^^^^^^
 *
 *	  SyntaxError: Cannot use import statement outside a module
 *	      at wrapSafe (internal/modules/cjs/loader.js:1001:16)
 *	      at Module._compile (internal/modules/cjs/loader.js:1049:27)
 *	      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
 *	      at Module.load (internal/modules/cjs/loader.js:950:32)
 *	      at Function.Module._load (internal/modules/cjs/loader.js:790: *	      at Module.require (internal/modules/cjs/loader.js:974:19)
 *	      at require (internal/modules/cjs/helpers.js:101:18)
 *	      at Object.<anonymous> (/vercel/path0/node_modules/recyclerlistview/dist/reactnative/platform/reactnative/scrollcomponent/ScrollComponent.js:28:22)
 *	      at Module._compile (internal/modules/cjs/loader.js:1085:14)
 *	      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10) {
 *	    type: 'SyntaxError'
 *	  }
 *	  error Command failed with exit code 1.
 *	  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
 *	  error Command failed with exit code 1.
 *	  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
 *	  Error: Command "yarn run build" exited with 1
 */

export { View as MainTestScreen } from "react-native";
