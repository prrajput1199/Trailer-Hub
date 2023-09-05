
const path = require('path');
// require('dotenv').config();

module.exports = {
  entry: './src/index.js', // Replace with your entry point file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Replace 'dist' with your desired output directory
  },
};

  config-overrides.js
  module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    // console.log(JSON.stringify(config.resolve.fallback))
     config.resolve.fallback = {
         crypto: false,
         util: false,
         stream: false,
         ...config.resolve.fallback
     };  
     return config
 }