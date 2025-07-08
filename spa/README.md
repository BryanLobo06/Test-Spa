# SPA de Usuarios con Login y Panel de Administración

> ⚠️ **Advertencia sobre contraseñas y hashes:**
>
> En este proyecto, las contraseñas de los usuarios se almacenan como hashes SHA256 usando la librería [crypto-js](https://www.npmjs.com/package/crypto-js). Cuando un usuario se registra o se edita, la contraseña se convierte a un hash antes de guardarse en la base de datos (`db.json`). Al iniciar sesión, la contraseña ingresada se hashea y se compara con el hash almacenado.
>
> **Limitaciones:**
> - SHA256 es un hash rápido y no es seguro para proteger contraseñas en producción.
> - No se utiliza salting ni algoritmos lentos como bcrypt, scrypt o Argon2.
> - json-server no es un backend real y no protege contra ataques.
>
> **Este sistema es solo para fines educativos y de demostración.**
> Para producción, usa un backend real, algoritmos de hash seguros y almacenamiento protegido.

---

## ⚠️ Importante sobre los IDs en db.json

- **Los IDs de los usuarios en `db.json` deben ser números, únicos y secuenciales** (por ejemplo: 1, 2, 3, ...).
- **No uses strings como ID** (por ejemplo: "1" o "abc"). json-server solo reconoce correctamente los IDs numéricos para rutas como `/users/1`.
- **No debe haber IDs duplicados ni saltos grandes**. Si editas manualmente el archivo, asegúrate de mantener la secuencia.
- **Si cambias los IDs o agregas usuarios manualmente, reinicia json-server** para que los cambios se reflejen correctamente.
- Si tienes problemas para editar o eliminar usuarios, revisa que los IDs sean correctos y reinicia el servidor.

---

## 📝 Resumen

- **Login seguro** (simulado) y persistencia de sesión
- **Panel de administración** para usuarios admin
- **CRUD de usuarios** (crear, leer, actualizar, eliminar)
- **Roles diferenciados**: admin y user
- **Diseño responsivo y profesional**
- **API REST simulada** con json-server
- **Código modular con ES Modules (import/export)**

---

## 📁 Estructura del Proyecto

```
spa/
├── public/
│   ├── index.html          # Página principal
│   └── favicon.ico         # Icono de la app
├── src/
│   ├── css/
│   │   └── styles.css      # Estilos globales
│   ├── js/
│   │   ├── api.js          # Servicio de API (export)
│   │   ├── auth.js         # Servicio de autenticación (export)
│   │   ├── app.js          # Lógica principal (export)
│   │   └── main.js         # Punto de entrada único (importa app.js)
│   ├── views/              # Fragmentos HTML (futuro)
│   └── assets/             # Recursos gráficos (opcional)
├── db/
│   └── db.json            # Base de datos simulada
├── package.json           # Configuración del proyecto
├── package-lock.json      # Versionado exacto de dependencias
└── README.md              # Documentación
```

---

## 🚀 Instalación y Ejecución

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd spa
   ```
2. **Instala las dependencias**
   ```bash
   npm install
   ```
3. **Inicia json-server (API REST)**
   ```bash
   npm start
   ```
   El backend estará en: [http://localhost:3000](http://localhost:3000)
4. **Sirve los archivos estáticos**
   ```bash
   npm run serve
   ```
   La app estará en: [http://localhost:8080](http://localhost:8080)
5. **(Opcional) Reinicia la base de datos**
   ```bash
   npm run reset-db
   ```

---

## 🖥️ Uso de la Aplicación

1. **Inicia sesión** con uno de los usuarios de prueba.
2. **Si eres admin**, accede al panel de administración:
   - Visualiza, agrega, edita y elimina usuarios
   - Cambia roles de usuario
3. **Si eres user**, accede a tu dashboard personal.
4. **Cierra sesión** con el botón correspondiente.

---

## 👤 Usuarios de Prueba y Roles

| Email                  | Contraseña  | Rol   |
|------------------------|-------------|-------|
| admin@example.com      | admin123    | admin |
| juan@example.com       | juan123     | user  |
| maria@example.com      | maria123    | user  |
| carlos@example.com     | carlos123   | user  |

- **Administrador (admin):**
  - Acceso total al panel de usuarios
  - CRUD completo y cambio de roles
- **Usuario (user):**
  - Solo ve su información y puede cerrar sesión

---

## 🔧 Scripts Disponibles

- `npm start`      → Inicia json-server (API REST en puerto 3000)
- `npm run serve`  → Sirve la carpeta `public/` en puerto 8080
- `npm run reset-db` → Restaura la base de datos a su estado original

---

## 🎨 Personalización

- **Colores y estilos:** Edita `src/css/styles.css`
- **Usuarios iniciales:** Edita `db/db.json`
- **Icono:** Cambia `public/favicon.ico` y la ruta en `index.html`
- **Agrega campos:** Modifica los formularios y la base de datos

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

## 🛡️ Recomendaciones y Buenas Prácticas

- **No uses este sistema en producción:** Las contraseñas están en texto plano y no hay seguridad real.
- **Para producción:**
  - Usa un backend real con autenticación segura (JWT, OAuth, etc.)
  - Hashea las contraseñas
  - Usa HTTPS
- **Personaliza los estilos** en `src/css/styles.css` para adaptar la app a tu marca.
- **Agrega más campos** a los usuarios editando `db/db.json` y los formularios.

---

## 📢 Créditos y Licencia

- Proyecto creado por [Brayan Balcazar].
- Licencia MIT.
- Puedes modificar y usar este código para fines educativos o personales. 