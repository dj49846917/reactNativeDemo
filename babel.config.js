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
          '@/assets': './src/assets'
        }
      }
    ]
  ]
};
