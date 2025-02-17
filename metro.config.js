// /**
//  * Metro configuration for React Native
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */



// // module.exports = {
// //     transformer: {
// //         getTransformOptions: async () => ({
// //             transform: {
// //                 experimentalImportSupport: false,
// //                 inlineRequires: false
// //             }
// //         }),
// //         assetRegistryPath: path.resolve(__dirname, "node_modules", "react-native", "Libraries", "Image", "AssetRegistry"), // Specify asset registry path
// //     },
// //     resolver: {
// //         extraNodeModules: new Proxy(extraNodeModules, {
// //             get: (target, name) =>
// //                 name in target
// //                     ? target[name]
// //                     : path.join(process.cwd(), "node_modules", name)
// //         }),
// //         assetExts: assetExts.filter(ext => ext !== 'svg'),
// //         sourceExts: [...sourceExts, 'svg'],
// //         assetExts: ['png', 'jpg', 'jpeg', 'svg', 'gif', 'ttf', 'otf'], // Include assets and fonts
// //         sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'] // Source extensions
// //     },
// //     watchFolders,
// //     resetCache: true
// // };

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path")
const extraNodeModules = {
  "@screens": path.resolve(__dirname, "screens"),
  "@options": path.resolve(__dirname, "options")
}
const watchFolders = [
  path.resolve(__dirname, "screens"),
  path.resolve(__dirname, "options")
]
// module.exports = {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false
//       }
//     })
//   },
//   resolver: {
//     extraNodeModules: new Proxy(extraNodeModules, {
//       get: (target, name) =>
//         //redirects dependencies referenced from extraNodeModules to local node_modules
//         name in target
//           ? target[name]
//           : path.join(process.cwd(), "node_modules", name)
//     }),
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg', 'png'],
//   },
//   watchFolders,
//   resetCache: true
// }


// const defaultConfig = getDefaultConfig(__dirname);
// const {
//   resolver: { sourceExts, assetExts },
// } = defaultConfig;

// module.exports = {
//   ...defaultConfig,
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
//   resolver: {
//     extraNodeModules: new Proxy(extraNodeModules, {
//       get: (target, name) =>
//         name in target ? target[name] : path.join(process.cwd(), "node_modules", name)
//     }),
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg', 'png'],
//   },
//   watchFolders,
//   resetCache: true
// };



/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        name in target ? target[name] : path.join(process.cwd(), "node_modules", name)
    }),
  },
  watchFolders,
  resetCache: true
};
module.exports = mergeConfig(defaultConfig, config);


// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const config = await getDefaultConfig();

//   config.transformer = {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   };

//   config.resolver = {
//     assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
//     sourceExts: [...config.resolver.sourceExts, 'svg'],
//   };

//   return config;
// })();
