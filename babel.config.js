/*
 * @Author: your name
 * @Date: 2020-10-31 08:56:24
 * @LastEditTime: 2020-11-08 16:44:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\babel.config.js
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/pages': './src/pages',
          '@/components': './src/components',
          '@/models': './src/models',
          '@/assets': './src/assets',
          '@/router': './src/router',
          '@/config': './src/config',
          '@/service': './src/service',
        }
      }
    ]
  ]
};
