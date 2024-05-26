// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify the Webpack config here

    // Example: Add an alias
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    // Example: Add a plugin
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(buildId),
    }));

    return config;
  },
};
