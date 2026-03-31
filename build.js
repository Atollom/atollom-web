const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'script.js');
const outputPath = path.join(__dirname, 'script.obfuscated.js');

try {
  const sourceCode = fs.readFileSync(inputPath, 'utf8');

  // Configuración de "Nivel Dios" para la ofuscación
  const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1, // Flujo de control al máximo
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true, // El código se rompe si lo formatean
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5, // Rompe strings en pedacitos
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['base64', 'rc4'], // Cifrado de cadenas
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  });

  fs.writeFileSync(outputPath, obfuscationResult.getObfuscatedCode(), 'utf8');
  console.log('✅ Ofuscación nivel Dios completada: script.obfuscated.js');

} catch (err) {
  console.error('Error durante la ofuscación:', err);
}
