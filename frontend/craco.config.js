const path = require('path');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@interfaces': path.resolve(__dirname, 'src/types'),
    },
    configure: (webpackConfig) => {
      webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => !(plugin instanceof ForkTsCheckerWebpackPlugin)
      );

      webpackConfig.plugins.push(
          new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
              memoryLimit: 8192,
            },
          })
      );

      return webpackConfig;
    },
  },
};
