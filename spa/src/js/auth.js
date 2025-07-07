// Clase para manejar la autenticación
class AuthService {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    // Inicializar el servicio de autenticación
    init() {
        // Verificar si hay una sesión guardada
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Error al cargar la sesión:', error);
                this.logout();
            }
        }
    }

    // Método para hacer login
    async login(email, password) {
        try {
            // Buscar usuario por email
            const user = await apiService.getUserByEmail(email);
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Verificar contraseña (en un proyecto real, esto debería estar hasheado)
            if (user.password !== password) {
                throw new Error('Contraseña incorrecta');
            }

            // Guardar sesión
            this.currentUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            };
            
            this.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            return this.currentUser;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    // Método para hacer logout
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('currentUser');
    }

    // Verificar si el usuario está autenticado
    isLoggedIn() {
        return this.isAuthenticated && this.currentUser !== null;
    }

    // Obtener el usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Verificar si el usuario tiene un rol específico
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    // Verificar si el usuario es administrador
    isAdmin() {
        return this.hasRole('admin');
    }
}

// Instancia global del servicio de autenticación
const authService = new AuthService(); 