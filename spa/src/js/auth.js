import { apiService } from './api.js';
// No import CryptoJS, usar window.CryptoJS

export class AuthService {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    // Inicializar el servicio de autenticación
    init() {
        let savedUser = localStorage.getItem('currentUser');
        if (!savedUser) {
            savedUser = sessionStorage.getItem('currentUser');
        }
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
    async login(email, password, remember = false) {
        try {
            const user = await apiService.getUserByEmail(email);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            // Usar window.CryptoJS
            const passwordHash = window.CryptoJS.SHA256(password).toString();
            if (user.password !== passwordHash) {
                throw new Error('Contraseña incorrecta');
            }
            this.currentUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            };
            this.isAuthenticated = true;
            const userString = JSON.stringify(this.currentUser);
            if (remember) {
                localStorage.setItem('currentUser', userString);
                sessionStorage.removeItem('currentUser');
            } else {
                sessionStorage.setItem('currentUser', userString);
                localStorage.removeItem('currentUser');
            }
            return this.currentUser;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        return this.isAuthenticated && this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    isAdmin() {
        return this.hasRole('admin');
    }
}

export const authService = new AuthService(); 