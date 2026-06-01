// URL base para las consultas relativas al servidor local
const API_URL = '/api';

// Estado global de la aplicacion que almacena la sesion activa
const state = {
  token: localStorage.getItem('token') || null, // Guarda el ID de usuario (nuestro token simplificado)
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null // Datos de perfil del usuario
};

/**
 * Controla el flujo de vistas de la aplicacion (SPA - Single Page Application)
 * Oculta todos los contenedores y despliega unicamente el seleccionado.
 * @param {string} viewName - El nombre de la vista a desplegar ('login', 'dashboard', 'admin')
 */
function showView(viewName) {
  // Ocultar todas las secciones con la clase 'view'
  document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
  
  // Mostrar la vista especificada por ID
  document.getElementById(`view-${viewName}`).classList.remove('hidden');
  
  // Mostrar u ocultar la barra de navegacion superior dependiendo de si hay sesion activa
  const nav = document.getElementById('main-nav');
  if (state.token) {
    nav.classList.remove('hidden');
  } else {
    nav.classList.add('hidden');
  }
}

/**
 * Formulario de Autenticacion / Inicio de Sesion
 * Captura las credenciales y las envia al endpoint de login.
 * Nota de estudio: Revisar como el servidor procesa el usuario en backend/routes.js
 */
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById('login-error');
  errorEl.classList.add('hidden'); // Ocultar mensajes de error previos

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Guardar los datos de sesion en el estado y en el almacenamiento local (localStorage)
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirigir al dashboard e inicializar el panel
    cargarPanelInventario();
  } catch (err) {
    // Desplegar el error devuelto por el servidor
    errorEl.textContent = `Error: ${err.message}`;
    errorEl.classList.remove('hidden');
  }
});

/**
 * Cierre de Sesion
 * Limpia los registros guardados en el navegador y regresa al Login
 */
document.getElementById('nav-logout').addEventListener('click', () => {
  localStorage.clear();
  state.token = null;
  state.user = null;
  showView('login');
});

/**
 * Carga e inicializacion de la interfaz del Panel de Inventario
 * Realiza una consulta al servidor pidiendo los activos de un usuario especifico.
 * @param {number} userId - El ID del usuario cuyo inventario deseamos cargar (IDOR evaluable aquí)
 */
async function cargarPanelInventario(userId = state.user.id) {
  showView('dashboard');
  
  // Pre-llenar informacion del usuario en la parte superior
  document.getElementById('user-display-name').textContent = state.user.username;
  document.getElementById('user-display-role').textContent = state.user.role;
  document.getElementById('idor-user-select').value = userId;

  const listEl = document.getElementById('inventory-list');
  listEl.innerHTML = '<div class="subtitle">Actualizando activos del sistema...</div>';

  try {
    // Ojo: Se envia el token/ID en la cabecera 'Authorization'
    const res = await fetch(`${API_URL}/inventory?user_id=${userId}`, {
      headers: { 'Authorization': state.token }
    });
    const items = await res.json();
    
    listEl.innerHTML = '';

    if (items.length === 0) {
      listEl.innerHTML = '<div class="subtitle">No hay activos registrados en este panel.</div>';
      return;
    }

    // Dibujar cada tarjeta de inventario de forma dinamica en la interfaz
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'inventory-card glass';
      
      // NOTA DIDACTICA PARA EXAMEN:
      // Analizar como se realiza la renderizacion de item.name (segura) vs item.description (innerHTML - vulnerable)
      card.innerHTML = `
        <div class="item-header">
          <div>
            <h3>${escapeHTML(item.name)}</h3>
            <span class="badge">Cantidad: ${item.quantity}</span>
          </div>
          <span class="price-tag">$${item.price}</span>
        </div>
        <div class="item-desc">${item.description}</div>
        <div class="item-footer">
          <div>Propietario: <strong>${escapeHTML(item.owner || 'N/A')}</strong></div>
          <button class="btn btn-danger btn-sm" onclick="eliminarArticulo(${item.id})">Eliminar (IDOR)</button>
        </div>
      `;
      listEl.appendChild(card);
    });
  } catch (err) {
    listEl.innerHTML = `<div class="error-msg">Error al cargar inventario: ${err.message}</div>`;
  }
}

/**
 * Escapes HTML para proteger campos de texto comunes y evitar renderizados erroneos
 */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * Controlador de Busquedas de Inventario
 * Realiza una consulta con filtro q de texto. 
 * Ojo: Estudiar el procesamiento de este query en la base de datos MySQL (backend/routes.js)
 */
document.getElementById('btn-search').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value;
  const listEl = document.getElementById('inventory-list');
  listEl.innerHTML = '<div class="subtitle">Realizando busqueda indexada...</div>';

  try {
    const res = await fetch(`${API_URL}/inventory/search?q=${encodeURIComponent(query)}`);
    const items = await res.json();
    
    listEl.innerHTML = '';
    if (items.length === 0) {
      listEl.innerHTML = '<div class="subtitle">No se encontraron resultados de busqueda.</div>';
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'inventory-card glass';
      // Mismo comportamiento de renderizacion evaluable
      card.innerHTML = `
        <div class="item-header">
          <div>
            <h3>${escapeHTML(item.name)}</h3>
            <span class="badge">Cantidad: ${item.quantity}</span>
          </div>
          <span class="price-tag">$${item.price}</span>
        </div>
        <div class="item-desc">${item.description}</div>
        <div class="item-footer">
          <div>Propietario: <strong>${escapeHTML(item.owner || 'N/A')}</strong></div>
          <button class="btn btn-danger btn-sm" onclick="eliminarArticulo(${item.id})">Eliminar (IDOR)</button>
        </div>
      `;
      listEl.appendChild(card);
    });
  } catch (err) {
    listEl.innerHTML = `<div class="error-msg">Error en busqueda: ${err.message}</div>`;
  }
});

// Selector de carga para simular o evaluar consultas de otros IDs de usuario (Taller IDOR)
document.getElementById('btn-load-idor').addEventListener('click', () => {
  cargarPanelInventario(document.getElementById('idor-user-select').value);
});

/**
 * Registro de Nuevo Activo
 * Envia los datos al servidor para guardarlos en la base de datos
 */
document.getElementById('add-item-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('item-name').value;
  const description = document.getElementById('item-desc').value;
  const quantity = document.getElementById('item-qty').value;
  const price = document.getElementById('item-price').value;

  try {
    const res = await fetch(`${API_URL}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      body: JSON.stringify({ name, description, quantity, price })
    });
    
    if (res.ok) {
      // Limpiar formulario y cerrar modal
      document.getElementById('add-item-form').reset();
      document.getElementById('add-item-modal').classList.add('hidden');
      
      // Recargar la lista de activos
      cargarPanelInventario();
    } else {
      const data = await res.json();
      alert(`Error al registrar activo: ${data.error}`);
    }
  } catch (err) {
    alert(`Error de conexion: ${err.message}`);
  }
});

/**
 * Eliminacion de Activos del Sistema
 * @param {number} id - El ID del activo a eliminar
 */
async function eliminarArticulo(id) {
  if (!confirm(`¿Confirmar eliminacion de activo #${id}?`)) return;
  
  try {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': state.token }
    });
    const data = await res.json();
    alert(data.message);
    cargarPanelInventario();
  } catch (err) {
    alert(`Error al procesar eliminacion: ${err.message}`);
  }
}

/**
 * Carga e inicializacion del Panel de Administracion Corporativo
 * Extrae informacion sensible para visualizacion general del panel.
 */
async function cargarPanelAdmin() {
  showView('admin');
  const tbody = document.getElementById('admin-users-list');
  tbody.innerHTML = '<tr><td colspan="4" class="subtitle">Accediendo a registros globales de usuarios...</td></tr>';

  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: { 'Authorization': state.token }
    });
    const users = await res.json();
    
    tbody.innerHTML = '';
    users.forEach(u => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${u.id}</td>
        <td><strong>${escapeHTML(u.username)}</strong></td>
        <td><code class="badge badge-danger">${escapeHTML(u.password)}</code></td>
        <td><span class="badge">${escapeHTML(u.role)}</span></td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="error-msg">Acceso denegado: ${err.message}</td></tr>`;
  }
}

// Controladores para mostrar/ocultar ventanas flotantes (Modales)
document.getElementById('btn-show-add-modal').addEventListener('click', () => {
  document.getElementById('add-item-modal').classList.remove('hidden');
});
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('add-item-modal').classList.add('hidden');
});

// Enlace de menus de navegacion superior
document.getElementById('nav-dashboard').addEventListener('click', () => cargarPanelInventario());
document.getElementById('nav-admin').addEventListener('click', cargarPanelAdmin);

// Bootstrap Inicial al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  if (state.token) {
    cargarPanelInventario();
  } else {
    showView('login');
  }
});
