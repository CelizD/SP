// src/utils/connectionTest.ts
export const testBackendConnection = async (): Promise<boolean> => {
  console.log('🔍 Probando conexión con backend...');
  
  try {
    // Intenta conectar al backend
    const response = await fetch('/api/', {  // Usa proxy
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend conectado:', data);
      return true;
    } else {
      console.log('⚠️ Backend respondió con estado:', response.status);
      
      // Intenta sin proxy como fallback
      try {
        const directResponse = await fetch('http://localhost:8000/api/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        console.log('ℹ️ Conexión directa:', directResponse.ok ? '✅' : '❌');
      } catch (directError) {
        console.log('❌ No se puede conectar directamente al backend');
      }
      
      return false;
    }
  } catch (error) {
    // `error` es `unknown` en TypeScript; normalizamos a un mensaje seguro
    const message = error instanceof Error ? error.message : String(error);
    console.log('❌ Error de conexión:', message);

    // Sugerencias para solucionar problemas (en español)
    console.log('\n🔧 Solución de problemas:');
    console.log('1. ¿El backend está corriendo? Ejecuta: python manage.py runserver');
    console.log('2. ¿La URL del backend es http://localhost:8000/api/? Verifica la configuración del proxy.');
    console.log('3. ¿Hay problemas de CORS? Comprueba los headers o configura un proxy en Vite.');
    console.log('4. Si usas Docker, asegúrate de exponer el puerto y que el contenedor esté arriba.');

    return false;
  }
};