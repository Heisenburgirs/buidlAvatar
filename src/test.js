// testRequireContext.js
const req = require.context('./assets/ears', false, /\.(png|jpe?g|svg)$/);
console.log(req.keys());