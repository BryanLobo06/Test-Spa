# SPA con Sistema de Login y Panel de Administración

Una aplicación de página única (SPA) con sistema de autenticación y panel de administración, desarrollada con HTML, CSS, JavaScript y json-server.

---

## 🚀 Características

- **Login y logout** con persistencia de sesión (localStorage)
- **Panel de administración** exclusivo para usuarios admin
- **CRUD completo de usuarios** (Crear, Leer, Actualizar, Eliminar)
- **Roles diferenciados**: admin y user
- **Mensajes de éxito y error** claros y visibles
- **Diseño responsivo y moderno**
- **API REST simulada** con json-server
- **Estructura profesional y modular**

---

## 📁 Estructura del Proyecto

```
spa/
├── public/
│   ├── index.html          # Página principal
│   └── favicon.ico         # Icono de la app
├── src/
│   ├── css/
│   │   └── styles.css      # Estilos de la aplicación
│   ├── js/
│   │   ├── api.js          # Servicio de API
│   │   ├── auth.js         # Servicio de autenticación
│   │   └── app.js          # Lógica principal de la SPA
│   ├── views/              # Fragmentos HTML (futuro)
│   └── assets/             # Recursos gráficos (opcional)
├── db/
│   └── db.json            # Base de datos simulada
├── package.json           # Configuración del proyecto
├── package-lock.json      # Versionado exacto de dependencias
└── README.md              # Documentación completa
```

---

## 🛠️ Instalación y Ejecución

1. **Clona o descarga el proyecto**
   ```bash
   git clone https://github.com/BryanLobo06/Test-Spa.git
   cd spa
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia json-server (backend simulado)**
   ```bash
   npm start
   ```
   El servidor estará disponible en: [http://localhost:3000](http://localhost:3000)

4. **En otra terminal, sirve los archivos estáticos**
   ```bash
   npm run serve
   ```
   La aplicación estará disponible en: [http://localhost:8080](http://localhost:8080)

5. **(Opcional) Reinicia la base de datos a su estado original**
   ```bash
   npm run reset-db
   ```

---

## 👤 Usuarios de Prueba y Roles

| Email                  | Contraseña  | Rol   |
|------------------------|-------------|-------|
| admin@example.com      | admin123    | admin |
| juan@example.com       | juan123     | user  |
| maria@example.com      | maria123    | user  |
| carlos@example.com     | carlos123   | user  |

### Funcionalidades por Rol

- **Administrador (admin):**
  - Acceso al panel de administración
  - Ver, agregar, editar y eliminar usuarios
  - Cambiar roles de usuarios
- **Usuario (user):**
  - Acceso al dashboard básico
  - Ver información personal
  - Cerrar sesión

---

## 🖥️ Uso de la Aplicación

1. **Inicia sesión** con uno de los usuarios de prueba.
2. **Si eres admin**, accede al panel de administración:
   - Visualiza la tabla de usuarios
   - Agrega, edita o elimina usuarios
   - Los IDs de usuarios se muestran en la tabla (no se reordenan automáticamente tras eliminar)
3. **Si eres user**, accede a tu dashboard personal.
4. **Cierra sesión** con el botón correspondiente.

---

## 🔧 Scripts Disponibles

- `npm start`      → Inicia json-server (API REST en puerto 3000)
- `npm run serve`  → Sirve la carpeta `public/` en puerto 8080
- `npm run reset-db` → Restaura la base de datos a su estado original

---

## 🐛 Solución de Problemas

- **No se muestra el favicon:**
  - Asegúrate de tener `favicon.ico` en la carpeta `public/` y que la ruta en el HTML sea correcta.
  - Limpia la caché del navegador (Ctrl+F5).
- **No se reordenan los IDs tras eliminar:**
  - json-server no soporta reordenar IDs automáticamente. Si necesitas IDs secuenciales, edita manualmente `db/db.json` o usa el script de reset.
- **Error de CORS o conexión:**
  - Verifica que json-server esté corriendo en el puerto 3000.
  - Usa el navegador en modo incógnito o limpia la caché.
- **No se ven los cambios en los estilos:**
  - Limpia la caché del navegador o recarga forzadamente (Ctrl+F5).

---

## 📢 Créditos y Licencia

- Proyecto creado por [Brayan Balcazar].
- Licencia MIT.
- Puedes modificar y usar este código para fines educativos o personales. 
