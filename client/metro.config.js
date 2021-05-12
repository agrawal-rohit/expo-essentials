const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './app/config/mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
  // Whatever was previously specified
});