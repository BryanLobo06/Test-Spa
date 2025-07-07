// Clase principal de la aplicación SPA
class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.init();
    }

    // Inicializar la aplicación
    init() {
        this.render();
        this.setupEventListeners();
    }

    // Renderizar el contenido principal
    render() {
        if (authService.isLoggedIn()) {
            if (authService.isAdmin()) {
                this.renderAdminPanel();
            } else {
                this.renderDashboard();
            }
        } else {
            this.renderLogin();
        }
    }

    // Renderizar el formulario de login
    renderLogin() {
        this.appElement.innerHTML = `
            <div class="login-container">
                <h1>Iniciar Sesión</h1>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn">Iniciar Sesión</button>
                </form>
                <div id="errorMessage" class="error-message" style="display: none;"></div>
            </div>
        `;
    }

    // Renderizar el dashboard
    renderDashboard() {
        const user = authService.getCurrentUser();
        this.appElement.innerHTML = `
            <div class="dashboard">
                <h1>¡Bienvenido, ${user.name}!</h1>
                <p>Has iniciado sesión correctamente.</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Rol:</strong> ${user.role}</p>
                <button class="logout-btn" id="logoutBtn">Cerrar Sesión</button>
            </div>
        `;
    }

    // Renderizar el panel de administración
    async renderAdminPanel() {
        const user = authService.getCurrentUser();
        this.appElement.innerHTML = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h1>Panel de Administración</h1>
                    <p>Bienvenido, ${user.name} (Admin)</p>
                    <button class="logout-btn" id="logoutBtn">Cerrar Sesión</button>
                </div>
                
                <div class="admin-content">
                    <div class="users-section">
                        <div class="section-header">
                            <h2>Gestión de Usuarios</h2>
                            <button class="btn btn-primary" id="addUserBtn">Agregar Usuario</button>
                        </div>
                        
                        <div class="users-table-container">
                            <table class="users-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTableBody">
                                    <tr>
                                        <td colspan="5" class="loading-text">Cargando usuarios...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Cargar usuarios
        await this.loadUsers();
    }

    // Cargar y mostrar usuarios
    async loadUsers() {
        try {
            // Verificar secuencia de IDs antes de cargar
            await apiService.fixUserIds();
            const users = await apiService.getUsers();
            this.renderUsersTable(users);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            this.showError('Error al cargar usuarios: ' + error.message);
        }
    }

    // Renderizar tabla de usuarios
    renderUsersTable(users) {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) {
            console.error('No se encontró el elemento usersTableBody');
            return;
        }
        
        tbody.innerHTML = users.map(user => `
            <tr data-user-id="${user.id}">
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role || 'user'}</td>
                <td>
                    <button class="btn btn-small btn-edit" data-user-id="${user.id}">Editar</button>
                    <button class="btn btn-small btn-delete" data-user-id="${user.id}">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }

    // Configurar event listeners
    setupEventListeners() {
        // Event listener para el formulario de login
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'loginForm') {
                e.preventDefault();
                this.handleLogin();
            }
        });

        // Event listener para el botón de logout
        document.addEventListener('click', (e) => {
            if (e.target.id === 'logoutBtn') {
                this.handleLogout();
            }
        });

        // Event listeners para el panel de administración
        document.addEventListener('click', (e) => {
            if (e.target.id === 'addUserBtn') {
                this.showAddUserModal();
            } else if (e.target.classList.contains('btn-edit')) {
                const userId = e.target.dataset.userId;
                this.showEditUserModal(userId);
            } else if (e.target.classList.contains('btn-delete')) {
                const userId = e.target.dataset.userId;
                console.log('Eliminando usuario ID:', userId);
                this.confirmDeleteUser(userId);
            }
        });
    }

    // Mostrar modal para agregar usuario
    showAddUserModal() {
        this.showUserModal('add');
    }

    // Mostrar modal para editar usuario
    async showEditUserModal(userId) {
        try {
            const user = await apiService.getUserById(userId);
            this.showUserModal('edit', user);
        } catch (error) {
            this.showError('Error al cargar usuario: ' + error.message);
        }
    }

    // Mostrar modal de usuario
    showUserModal(mode, user = null) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${mode === 'add' ? 'Agregar Usuario' : 'Editar Usuario'}</h3>
                    <button class="modal-close" id="closeModal">&times;</button>
                </div>
                <form id="userForm">
                    <div class="form-group">
                        <label for="userName">Nombre:</label>
                        <input type="text" id="userName" name="name" value="${user ? user.name : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="userEmail">Email:</label>
                        <input type="email" id="userEmail" name="email" value="${user ? user.email : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="userPassword">Contraseña:</label>
                        <input type="password" id="userPassword" name="password" ${mode === 'add' ? 'required' : 'placeholder="Dejar vacío para mantener la actual"'} ${mode === 'add' ? '' : ''}>
                    </div>
                    <div class="form-group">
                        <label for="userRole">Rol:</label>
                        <select id="userRole" name="role" required>
                            <option value="user" ${user && user.role === 'user' ? 'selected' : ''}>Usuario</option>
                            <option value="admin" ${user && user.role === 'admin' ? 'selected' : ''}>Administrador</option>
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancelBtn">Cancelar</button>
                        <button type="submit" class="btn btn-primary">${mode === 'add' ? 'Agregar' : 'Actualizar'}</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners del modal
        modal.querySelector('#closeModal').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('#cancelBtn').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('#userForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserForm(mode, user ? user.id : null, modal);
        });
    }

    // Cerrar modal
    closeModal(modal) {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }

    // Manejar formulario de usuario
    async handleUserForm(mode, userId, modal) {
        const formData = new FormData(modal.querySelector('#userForm'));
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role')
        };

        const password = formData.get('password');
        if (password) {
            userData.password = password;
        }

        try {
            if (mode === 'add') {
                await apiService.createUser(userData);
                this.showSuccess('Usuario agregado correctamente');
            } else {
                await apiService.updateUser(userId, userData);
                this.showSuccess('Usuario actualizado correctamente');
            }

            this.closeModal(modal);
            await this.loadUsers();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    // Confirmar eliminación de usuario
    confirmDeleteUser(userId) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            this.deleteUser(userId);
        }
    }

    // Eliminar usuario
    async deleteUser(userId) {
        try {
            await apiService.deleteUser(userId);
            this.showSuccess('Usuario eliminado correctamente');
            await this.loadUsers();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            this.showError('Error al eliminar usuario: ' + error.message);
        }
    }

    // Manejar el login
    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        const submitBtn = document.querySelector('#loginForm button');
        
        // Evitar múltiples envíos
        if (submitBtn.disabled) {
            return;
        }
        
        const originalText = submitBtn.textContent;

        try {
            // Mostrar loading
            submitBtn.textContent = 'Iniciando sesión...';
            submitBtn.disabled = true;

            // Ocultar mensaje de error previo
            errorMessage.style.display = 'none';

            // Intentar login
            await authService.login(email, password);
            
            // Renderizar dashboard
            this.render();
            
        } catch (error) {
            // Mostrar mensaje de error
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
            
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Manejar el logout
    handleLogout() {
        authService.logout();
        this.render();
    }

    // Mostrar mensaje de error
    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }

    // Mostrar mensaje de éxito
    showSuccess(message) {
        // Crear mensaje de éxito temporal
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 5000);
    }

    // Ocultar mensaje de error
    hideError() {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 