module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@/components': ['./src/components'],
            '@/components/*': ['./src/components/*'],
            '@/common': ['./src/common'],
            '@/common/*': ['./src/common/*'],
            '@/types': ['./src/types'],
            '@/types/*': ['./src/types/*'],
            '@/services': ['./src/services'],
            '@/services/*': ['./src/services/*'],
            '@/utils': ['./src/utils'],
            '@/utils/*': ['./src/utils/*'],
            '@/helpers': ['./src/helpers'],
            '@/helpers/*': ['./src/helpers/*'],
            '@/hooks': ['./src/hooks'],
            '@/hooks/*': ['./src/hooks/*'],
            '@/assets': ['./src/assets'],
            '@/assets/*': ['./src/assets/*'],
            '@/constants': ['./src/constants'],
            '@/constants/*': ['./src/constants.ts/*'],
            '@/screens': ['./src/screens'],
            '@/screens/*': ['./src/screens/*'],
            '@/store/*': ['./src/store/*'],
            '@/store': ['./src/store'],
            '@/navigation/*': ['./src/navigation/*'],
            '@/navigation': ['./src/navigation'],
            '@/theme': ['./src/theme'],
            '@/theme/*': ['./src/theme/*'],
          },
        },
      ],
    ],
  }
}
