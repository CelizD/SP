// check-config.js
const fs = require('fs');
const path = require('path');

console.log('=== Verificando configuración del frontend ===\n');

// Verificar archivo .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✓ Archivo .env encontrado');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('REACT_APP_API_URL')) {
    console.log('✓ REACT_APP_API_URL configurado');
  } else {
    console.log('✗ REACT_APP_API_URL no encontrado en .env');
  }
} else {
  console.log('✗ Archivo .env no encontrado');
}

// Verificar package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`✓ React version: ${packageJson.dependencies.react || 'No encontrada'}`);
  
  // Verificar scripts
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log('✓ Script start disponible');
  }
}

console.log('\n=== Instrucciones de uso ===');
console.log('1. Asegúrate que el backend esté corriendo en http://localhost:8000');
console.log('2. Ejecuta: npm start');
console.log('3. Si hay problemas de CORS, instala el plugin de Chrome: "Allow CORS"');