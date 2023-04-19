const { writeFileSync } = require('node:fs');


const cjsModule = require('../cjs/index.js');
const cjsExports = Object.keys(cjsModule);

const esmModuleContent = `import cjsModule from './cjs/index.js';
export const { ${cjsExports.join(', ')} } = cjsModule;
`;

writeFileSync('./index.mjs', esmModuleContent);
require('node:child_process').execSync('npx prettier ./index.mjs');