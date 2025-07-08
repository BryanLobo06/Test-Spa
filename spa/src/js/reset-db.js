const fs = require('fs');
const path = require('path');

// Función para reiniciar la base de datos
function resetDatabase() {
    const dbPath = path.join(__dirname, 'db', 'db.json');
    
    // Datos iniciales con IDs secuenciales
    const initialData = {
        "users": [
            {
                "id": 1,
                "name": "Admin Usuario",
                "email": "admin@example.com",
                "password": "admin123",
                "role": "admin"
            },
            {
                "id": 2,
                "name": "Juan Pérez",
                "email": "juan@example.com",
                "password": "juan123",
                "role": "user"
            },
            {
                "id": 3,
                "name": "María García",
                "email": "maria@example.com",
                "password": "maria123",
                "role": "user"
            },
            {
                "id": 4,
                "name": "Carlos López",
                "email": "carlos@example.com",
                "password": "carlos123",
                "role": "user"
            }
        ]
    };

    try {
        // Escribir los datos iniciales
        fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
        console.log('✅ Base de datos reiniciada correctamente');
        console.log('📊 Usuarios iniciales:');
        initialData.users.forEach(user => {
            console.log(`   ID: ${user.id} | ${user.name} (${user.role})`);
        });
    } catch (error) {
        console.error('❌ Error al reiniciar la base de datos:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    resetDatabase();
}

module.exports = { resetDatabase };