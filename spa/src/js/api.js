// Configuración de la API
const API_BASE_URL = 'http://localhost:3000';

// Clase para manejar las llamadas a la API
class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Método genérico para hacer peticiones HTTP
    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            };

            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en la petición API:', error);
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('No se puede conectar con el servidor. Verifica que json-server esté ejecutándose.');
            }
            throw error;
        }
    }

    // Obtener todos los usuarios
    async getUsers() {
        return this.request('/users');
    }

    // Obtener un usuario por ID
    async getUserById(id) {
        return this.request(`/users/${id}`);
    }

    // Buscar usuario por email
    async getUserByEmail(email) {
        try {
            const users = await this.getUsers();
            return users.find(user => user.email === email);
        } catch (error) {
            console.error('Error al buscar usuario por email:', error);
            throw new Error('Error de conexión con el servidor');
        }
    }

    // Crear un nuevo usuario
    async createUser(userData) {
        try {
            // Obtener todos los usuarios para calcular el siguiente ID
            const users = await this.getUsers();
            
            // Encontrar el ID más alto y agregar 1
            // Asegurar que los IDs sean números
            const userIds = users.map(user => parseInt(user.id) || 0);
            const maxId = userIds.length > 0 ? Math.max(...userIds) : 0;
            const nextId = maxId + 1;
            
            // Agregar el ID al userData
            const userWithId = {
                id: nextId,
                ...userData
            };
            
            console.log(`Creando usuario con ID: ${nextId}`);
            
            return this.request('/users', {
                method: 'POST',
                body: JSON.stringify(userWithId)
            });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    // Actualizar un usuario
    async updateUser(id, userData) {
        return this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    // Eliminar un usuario
    async deleteUser(id) {
        return this.request(`/users/${id}`, {
            method: 'DELETE'
        });
    }

    // Verificar y corregir secuencia de IDs
    async fixUserIds() {
        try {
            const users = await this.getUsers();
            let needsUpdate = false;
            
            // Verificar si los IDs son secuenciales
            for (let i = 0; i < users.length; i++) {
                const expectedId = i + 1;
                const actualId = parseInt(users[i].id);
                
                if (actualId !== expectedId) {
                    console.log(`ID incorrecto: esperado ${expectedId}, actual ${actualId}`);
                    needsUpdate = true;
                    break;
                }
            }
            
            if (needsUpdate) {
                console.log('Corrigiendo secuencia de IDs...');
                // Aquí podrías implementar la lógica para reordenar los IDs
                // Por ahora solo mostramos un mensaje
                console.warn('Se detectaron IDs no secuenciales. Considera reiniciar json-server.');
            }
            
            return users;
        } catch (error) {
            console.error('Error al verificar IDs:', error);
            throw error;
        }
    }
}

// Instancia global de la API
const apiService = new ApiService(); 